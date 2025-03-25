import puppeteer, { PDFOptions } from 'puppeteer-core';
import { execSync } from 'child_process';

export interface ConversionOptions extends PDFOptions {
  url?: string;
  html?: string;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
}

export class PDFService {
  private async getChromePath(): Promise<string> {
    // MacOS'ta Chrome'un varsayılan konumu
    const defaultPaths = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium'
    ];

    for (const path of defaultPaths) {
      try {
        execSync(`test -f "${path}"`);
        return path;
      } catch (e) {
        continue;
      }
    }

    throw new Error('Chrome or Chromium not found. Please install Chrome/Chromium browser.');
  }

  async generateFromHTML(options: ConversionOptions): Promise<Buffer> {
    const chromePath = await this.getChromePath();
    
    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      if (options.url) {
        await page.goto(options.url, { 
          waitUntil: options.waitUntil || 'networkidle0' 
        });
      } else if (options.html) {
        await page.setContent(options.html, { 
          waitUntil: options.waitUntil || 'networkidle0' 
        });
      } else {
        throw new Error('Either URL or HTML content must be provided');
      }

      // Default PDF options
      const pdfOptions: PDFOptions = {
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1cm',
          right: '1cm',
          bottom: '1cm',
          left: '1cm'
        },
        ...options
      };

      // Remove non-PDF options
      delete (pdfOptions as any).url;
      delete (pdfOptions as any).html;
      delete (pdfOptions as any).waitUntil;

      const pdfBuffer = await page.pdf(pdfOptions);
      return pdfBuffer;
    } finally {
      await browser.close();
    }
  }
} 