import fs from 'node:fs/promises'

export const createFile = async(fileName) => {
  try {
    const fileHandle = await fs.open(fileName, 'wx');
    console.log('File created!');
    await fileHandle.close(); 
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log('File already exists.');
    } else {
      console.error('Error creating file:', err);
    }
  }
}


