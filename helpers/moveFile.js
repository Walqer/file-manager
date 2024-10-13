import { copyFile } from "./copyFile.js"
import { deleteFile } from "./deleteFile.js"
import { promises as fs } from 'fs';
export const moveFile = async (source, destination) => {
    try {
        await fs.access(source,fs.constants.R_OK)
    } catch (error) {
        if(error.code === 'ENOENT') {
            console.log(`File ${source} does not exist`)
            return
        }
    }
    try {
        await fs.access(destination,fs.constants.F_OK)
        console.log('FS operation failed: Destination file already exists')
         return
        
    } catch (error) {
        console.log(error)
        if(error.code === 'ENOENT') {
            await copyFile(source,destination)
            await deleteFile(source)
            console.log(`File ${source} moved to ${destination}`)
        }
       
    }
}