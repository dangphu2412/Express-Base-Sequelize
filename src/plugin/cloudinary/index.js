// @ts-check
import { imageService } from '../../config/cloudinary';

export class CloudinaryPlugin {
  /**
   * @param {import("cloudinary").UploadApiOptions } options
   */
  constructor(options) {
    this.options = options;
    this.service = imageService;
  }

  uploadImg(path) {
    return this.service.uploader.upload(path, this.options);
  }

  // Improve future
  removeImg(path) {
    return this.service.uploader.destroy(path);
  }
}
