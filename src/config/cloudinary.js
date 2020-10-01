import cloudinary from 'cloudinary';
import { CLOUDINARY_CONFIG } from '../common/constants';

cloudinary.v2.config(CLOUDINARY_CONFIG);

export const imageService = cloudinary.v2;
