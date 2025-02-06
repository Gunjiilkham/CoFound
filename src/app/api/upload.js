import { NextResponse } from 'next/server';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Change to Route Handler format
export async function POST(req) {
  const form = new formidable.IncomingForm();
  const uploadDir = path.join(process.cwd(), 'uploads');
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  // Convert to Promise-based parsing
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form:', err);
        return resolve(NextResponse.json(
          { error: 'Error uploading file' },
          { status: 500 }
        ));
      }

      const uploadedFile = files.pdf;
      if (!uploadedFile) {
        return resolve(NextResponse.json(
          { error: 'No file uploaded' },
          { status: 400 }
        ));
      }

      const tempFilePath = uploadedFile.filepath;
      const permanentFilePath = path.join(uploadDir, uploadedFile.originalFilename);

      try {
        fs.renameSync(tempFilePath, permanentFilePath);
        resolve(NextResponse.json({
          message: 'File uploaded successfully!',
          filePath: permanentFilePath,
        }));
      } catch (renameError) {
        console.error('Error moving the file:', renameError);
        resolve(NextResponse.json(
          { error: 'Error saving the file' },
          { status: 500 }
        ));
      }
    });
  });
}
