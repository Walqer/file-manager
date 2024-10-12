export const login = () => {
    const userNameArg = process.argv.find((arg) => arg.startsWith('--username='))
    let username = null
    if(userNameArg){
        username = userNameArg.slice(11)
        console.log(`Welcome to the File Manager, ${username}!`)
    } else{
        console.log('Username not provided. Please run the program with --username=your_name.')
    }
}