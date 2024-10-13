import crypto from 'crypto'
import { createReadStream} from 'fs';
import path from 'path'
export const calculateHash = async (filePath) => {
   const pathToFile = path.resolve(path.join(filePath));
   const fileStream = createReadStream(pathToFile);
   const hash = crypto.createHash('sha256');
   fileStream.on('data',(chunk) => {
    hash.update(chunk);
   })
   fileStream.on('end', () => {
    const result = hash.digest('hex');
    console.log(`SHA256 hash for file: ${result}`);
});
};