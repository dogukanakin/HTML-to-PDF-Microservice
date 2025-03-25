# HTML to PDF Microservice

A Node.js microservice that converts HTML to PDF, built with TypeScript, Express, and Puppeteer.

## Features

- Convert HTML content to PDF
- Convert web pages to PDF by URL
- Customize PDF output (format, margins, etc.)
- RESTful API

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd HTMLtoPDF-Microservice

# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start
```

## Development

```bash
# Run in development mode with hot reloading
npm run dev
```

## API Usage

### Convert HTML to PDF

**Endpoint:** `POST /api/convert`

**Request Body:**

```json
{
  "html": "<html><body><h1>Hello World</h1></body></html>",
  "filename": "output.pdf",
  "format": "A4",
  "landscape": false,
  "printBackground": true,
  "margin": {
    "top": "1cm",
    "right": "1cm",
    "bottom": "1cm",
    "left": "1cm"
  }
}
```

Or using a URL:

```json
{
  "url": "https://example.com",
  "filename": "output.pdf",
  "format": "A4"
}
```

**Response:** PDF file as a download

## Docker Support

```bash
# Build the Docker image
docker build -t html-to-pdf-microservice .

# Run the container
docker run -p 3000:3000 html-to-pdf-microservice
``` 




