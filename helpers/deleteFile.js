
import { promises as fs} from 'fs';
import path from 'path';
export const deleteFile = async (filePath) => {
    const fileToRemove = path.resolve(filePath);
    try{
        await fs.unlink(fileToRemove);
        console.log(`File ${filePath} deleted`)
    }catch(error){
        if(error.code === 'ENOENT') {
            console.log('File does not exist')
        } else {
            console.error('Error deleting file:', error.message);
        }
    }
};
