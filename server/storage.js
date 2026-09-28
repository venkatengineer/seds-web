import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';

/**
 * STORAGE ABSTRACTION LAYER
 * 
 * Supports local disk storage by default with pluggable adapters
 * for AWS S3, Cloudinary, Supabase, or Firebase Storage.
 */

const UPLOAD_DIR = path.resolve(process.cwd(), 'data/uploads/ppt');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

class LocalStorageProvider {
  constructor(uploadDir) {
    this.uploadDir = uploadDir;
  }

  async save(fileBuffer, originalName, mimeType) {
    const ext = path.extname(originalName).toLowerCase();
    const cleanExt = (ext === '.ppt' || ext === '.pptx') ? ext : '.pptx';
    const randomHash = crypto.randomBytes(8).toString('hex');
    const filename = `orbital26_ppt_${Date.now()}_${randomHash}${cleanExt}`;
    const destination = path.join(this.uploadDir, filename);

    await fs.promises.writeFile(destination, fileBuffer);

    return {
      storageType: 'local',
      key: filename,
      filename: filename,
      originalName: originalName,
      mimeType: mimeType,
      size: fileBuffer.length,
      url: `/uploads/ppt/${filename}`,
      uploadedAt: new Date().toISOString(),
    };
  }

  getFilePath(key) {
    const safeKey = path.basename(key);
    return path.join(this.uploadDir, safeKey);
  }

  async delete(key) {
    const filePath = this.getFilePath(key);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }
    return false;
  }
}

// Storage Manager configured via environment or settings
class StorageManager {
  constructor() {
    this.provider = new LocalStorageProvider(UPLOAD_DIR);
  }

  setProvider(provider) {
    this.provider = provider;
  }

  async saveFile(fileBuffer, originalName, mimeType) {
    return this.provider.save(fileBuffer, originalName, mimeType);
  }

  getFilePath(key) {
    return this.provider.getFilePath(key);
  }

  async deleteFile(key) {
    return this.provider.delete(key);
  }
}

export const storage = new StorageManager();
