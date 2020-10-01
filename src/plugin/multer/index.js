import { MulterError } from 'multer';
import { BAD_REQUEST } from 'http-status';
import multerUploader from '../../config/multer';

export const UploadPlugin = (req, res, next) => {
    multerUploader(req, res, err => {
        if (err instanceof MulterError) {
            return res.status(BAD_REQUEST).json({
                status: BAD_REQUEST,
                message: err.message,
            });
        }
        return next();
    });
};
