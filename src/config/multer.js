// @ts-check
import multer from 'multer';

const UPLOAD_PATH = './src/upload';
const LIMIT_SIZE = 5 * 1024 * 1024;
const IMAGE_PER_UPLOAD = 5;
const mimeType = {
  jpeg: 'image/jpeg',
  png: 'image/png',
};

const storage = {
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, UPLOAD_PATH);
    },
    filename(req, file, callback) {
      callback(null, `${file.fieldname}-${Date.now()}.jpeg`);
    },
  }),
  limits: {
    fileSize: LIMIT_SIZE, // MAX = 5mb
  },
  /**
   * @param {any} req
   * @param {{ mimetype: string; }} file
   * @param {(arg0: { message: string; }, arg1: boolean) => any} callback
   */
  fileFilter(req, file, callback) {
    if (file.mimetype === mimeType.jpeg || file.mimetype === mimeType.png) {
      return callback(null, true);
  }
      return callback({ message: 'Unsupported file format' }, false);
  },
};

export default multer(storage).array('image', IMAGE_PER_UPLOAD);
