import { promises as fs,createReadStream,createWriteStream} from 'fs';
import { constants } from 'fs/promises';
import path from 'path';

 const copyFileByStream = async (source, destination) => {
    return new Promise((resolve, reject) => {
        const readStream = createReadStream(source);
        const writeStream = createWriteStream(destination);

        readStream.on('error', reject);
        writeStream.on('error', reject);
        writeStream.on('close', resolve);

        readStream.pipe(writeStream);
    });
};

export const copyFile = async (source, destination) => {
    const sourceFile = path.resolve(source);  
    const destinationFile = path.resolve(destination);
    try {
        await fs.access(sourceFile,fs.constants.R_OK);
        await fs.access(destinationFile,fs.constants.F_OK);
        throw new Error('FS operation failed: Destination file already exists');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await copyFileByStream(sourceFile, destinationFile);
            console.log('File successfully copied to', destinationFile);
        } else {
            console.error(err.message);
        }
    }

}