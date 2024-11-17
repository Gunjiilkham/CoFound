import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  const uploadDir = path.join(process.cwd(), 'uploads');
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'File upload failed' });
    }

    const uploadedFile = files.pdf[0];
    const tempFilePath = uploadedFile.filepath;
    const permanentFilePath = path.join(uploadDir, uploadedFile.originalFilename);
    
    fs.renameSync(tempFilePath, permanentFilePath);

    res.status(200).json({
      message: 'File uploaded successfully!',
      filePath: permanentFilePath,
    });
  });
}
