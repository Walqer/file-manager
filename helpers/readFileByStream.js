import {createReadStream} from 'node:fs'
export const readFilebyStream = async (pathToFile,encoding = 'utf-8') => {
    try{
        const readableStream = createReadStream(pathToFile, {encoding})
        let data = "";
        readableStream.on('data',(chunk) => {
            data+= chunk
        })
        readableStream.on('end', () => {
            console.log(data)
        })
    } catch(err){
        console.log(`Error: ${err.message}`)
    }
   
};