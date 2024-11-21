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
      console.error('Error parsing the form:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }

    const uploadedFile = files.pdf;
    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const tempFilePath = uploadedFile.filepath;
    const permanentFilePath = path.join(uploadDir, uploadedFile.originalFilename);

    try {
      fs.renameSync(tempFilePath, permanentFilePath);
      res.status(200).json({
        message: 'File uploaded successfully!',
        filePath: permanentFilePath,
      });
    } catch (renameError) {
      console.error('Error moving the file:', renameError);
      res.status(500).json({ error: 'Error saving the file' });
    }
  });
}
