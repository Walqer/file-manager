import {createReadStream,promises as fs} from 'node:fs'
export const readFilebyStream = async (pathToFile,encoding = 'utf-8') => {
    try{
        await fs.access(pathToFile);
        const readableStream = createReadStream(pathToFile, {encoding})
        let data = "";
        readableStream.on('data',(chunk) => {
            data+= chunk
        })
        readableStream.on('end', () => {
            console.log(data)
        })
    } catch(err){
        if (err.code === 'ENOENT') {
            console.log(`File ${pathToFile} does not exist.`);
        } else if (err.code === 'EACCES') {
            console.log(`Permission denied to access file ${filePath}.`);
        }else {
        console.log(`Error: ${err.message}`)
    }
    }
   
};