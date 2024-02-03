import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'public/schoolImages'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage }).single('image');

export default upload;
