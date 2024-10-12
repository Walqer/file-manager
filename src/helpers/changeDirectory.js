export async function changeDirectory(currentPath, newPath,state = null) {
    const newPathResolved = path.resolve(currentPath, newPath);
    await fs.access(newPathResolved);
    process.chdir(parentPath);
    if(state){
        state = newPathResolved
    }
}