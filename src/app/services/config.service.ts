import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly domain = 'https://portail.judoboucherville.com/';
  //private readonly domain = 'https://localhost:7170/';
  private readonly fileBaseUrl = 'https://database.judoboucherville.com/uploads/Files/';
  private readonly imageBaseUrl = 'https://database.judoboucherville.com/uploads/Images/';

  constructor() { }

  /**
   * Get the base domain URL
   */
  getDomain(): string {
    return this.domain;
  }

  /**
   * Get URL for image files
   */
  getImageUrl(fileName?: string): string {
    if (!fileName) return '';
    if (fileName.startsWith('http')) return fileName;
    if (fileName.startsWith('/assets')) return fileName;
    return `${this.imageBaseUrl}${fileName}`;
  }

  /**
   * Get URL for downloadable files (PDFs, documents, etc.)
   */
  getFileUrl(fileName?: string): string {
    if (!fileName) return '';
    if (fileName.startsWith('http')) return fileName;
    return `${this.fileBaseUrl}${fileName}`;
  }

  /**
   * Get URL for any file with custom path
   */
  getCustomUrl(path: string): string {
    if (path.startsWith('http')) return path;
    return `${this.domain}${path}`;
  }
}
