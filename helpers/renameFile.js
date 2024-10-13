import { constants } from 'fs/promises';
import { promises as fs} from 'fs';
export const renameFile = async (oldName,newName) => {
    try {
        await fs.access(oldName, constants.F_OK)
    } catch (error) {
        if(error.code === 'ENOENT') {
            throw new Error('FS operation failed')
        }
    }
    try {
        await fs.access(newName, constants.F_OK)
        throw new Error('FS operation failed')
    } catch (error) {
        if(error.code === 'ENOENT') {
            await fs.rename(oldName,newName)
            console.log(`File ${oldName} renamed to ${newName}`)
        }
       
    }
    
};