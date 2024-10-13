import * as readline from 'node:readline/promises';
import * as fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { readFilebyStream } from './helpers/readFileByStream.js';
import { createFile } from './helpers/createFile.js';
let currentPath = os.userInfo().homedir
const userNameArg = process.argv.find((arg) => arg.startsWith('--username='))
let username = null
if(userNameArg){
    username = userNameArg.slice(11)
    console.log(`Welcome to the File Manager, ${username}!`)
} else{
    console.log('Username not provided. Please run the program with --username=your_name.')
}

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
    else if (trimmedLine.startsWith('cd ')){
        const newPath = trimmedLine.split(' ')[1]
        if(!newPath){
            console.log('Error: No path provided')
        } else{
            try{
                const newPathResolved = path.resolve(currentPath, newPath)
                process.chdir(newPathResolved)
                currentPath = newPathResolved
            }catch(err){
                console.log(`Error: ${err.message}`)
            }
        }
    }
    else if(trimmedLine === 'up'){
        try{
            const parentPath = path.resolve(currentPath, '..');
            process.chdir(parentPath); 
            currentPath = parentPath;
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
    } else if(trimmedLine.startsWith('cat ')){
        const filePath = trimmedLine.split(' ')[1]
        readFilebyStream(filePath)

    } else if(trimmedLine.startsWith('add ')){
        const filePath = trimmedLine.split(' ')[1]
        createFile(filePath)

    } else{
        console.log('Invalid input')
    }
    console.log(`You are currently in `,currentPath)
})
console.log(`You are currently in `,currentPath)