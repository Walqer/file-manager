import path from 'path';
import fs from 'fs/promises'; // Убедитесь, что импортируете fs/promises
import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';

export const decompress = async (filePath, destination) => {
    const pathToZipFile = path.resolve(process.cwd(), filePath); 
    const outputFile = path.resolve(process.cwd(), destination); 
    console.log(process.cwd())
    try {
        await fs.access(pathToZipFile); // Проверяем, существует ли zip файл
    } catch (error) {
        console.log(error)
        console.error(`Error: ${pathToZipFile} does not exist.`);
        return;
    }

    try {
        await fs.access(outputFile);
        console.error(`Error: ${outputFile} already exists. Choose a different name or delete the existing file.`);
        return;
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error('Error while checking destination file:', error.message);
            return;
        }
    }

    const inputFile = createReadStream(pathToZipFile);
    const output = createWriteStream(outputFile);
    const gzip = zlib.createGunzip();

    inputFile
        .pipe(gzip)
        .pipe(output)
        .on('finish', () => {
            console.log('File successfully uncompressed to', outputFile);
        })
        .on('error', (err) => {
            console.error('Error during decompression:', err.message);
        });
};
