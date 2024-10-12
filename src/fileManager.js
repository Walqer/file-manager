import * as readline from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import os from 'node:os';
import { changeDirectory } from './helpers/changeDirectory.js';
import { login } from './login.js'
export const startFileManager = async () => {
    const username = login()
    let currentPath = os.userInfo().homedir
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`)
})
rl.on('line', async (line) => {
    const trimmedLine = line.trim()
    if(trimmedLine === '.exit'){
        rl.close()
    }
    else if (trimmedLine.startsWith('cd')){
        const newPath = trimmedLine.split(' ')[1]
        if(!newPath){
            console.log('Error: No path provided')
        } else{
            try{
                changeDirectory(currentPath, newPath,currentPath)
            }catch(err){
                console.log(`Error: ${err.message}`)
            }
        }
    }
    else if(trimmedLine === 'up'){
        try{
            changeDirectory(currentPath,  '..',currentPath)
        } catch(err){
            console.log(`Error: ${err.message}`)
        }
        
    } else if(trimmedLine === 'ls'){
        try{
            const files = await fs.readdir(currentPath,{withFileTypes: true})
            const directoryList= []
            const fileList = []
            files.forEach((file) => {
                if(file.isDirectory()){
                    directoryList.push({
                        Name: file.name,
                        Type: 'directory',
                    })
                } else{
                    fileList.push({
                        Name: file.name,
                        Type: 'file',
                    })
                }
            })
            directoryList.sort((a, b) => a.Name.localeCompare(b.Name))
            fileList.sort((a, b) => a.Name.localeCompare(b.Name))
            const sortedTableData = [...directoryList,...fileList]
            console.table(sortedTableData)
        } catch(err){
            console.log(`Error: ${err.message}`)
        }
    } else{
        console.log('Invalid input')
    }
    console.log(`You are currently in `,currentPath)
})
console.log(`You are currently in `,currentPath)
}