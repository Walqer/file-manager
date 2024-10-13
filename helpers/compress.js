import path from 'path'
import fs from 'fs'
import  zlib  from 'zlib'


export const compress = async (filePath,destination) => {
    const pathToFile = path.resolve(path.join(filePath));
    const pathToZipFile = path.resolve(destination);
    const inputFile = fs.createReadStream(pathToFile);
    const outputFile = fs.createWriteStream(pathToZipFile);
    const gzip = zlib.createGzip();
    inputFile.pipe(gzip).pipe(outputFile);
    outputFile.on('finish', () => {
        console.log('File successfully compressed to', pathToZipFile);
    })
};