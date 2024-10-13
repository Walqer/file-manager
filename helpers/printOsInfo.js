import os from  'node:os'
export const printOSInfo = async (command) => {
    switch (command) {
        case 'os --EOL':
            console.log('Default EOL:', JSON.stringify(os.EOL));
            break;
        case 'os --cpus':
            const cpus = os.cpus();
            console.log('CPUs Info:');
            console.log(`Total CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: Model - ${cpu.model}, Clock Rate - ${(cpu.speed / 1000).toFixed(2)} GHz`);
            });
            break;
        case 'os --homedir':
            console.log('Home Directory:', os.homedir());
            break;
        case 'os --username':
            console.log('Current System User Name:', os.userInfo().username);
            break;
        case 'os --architecture':
            console.log('CPU Architecture:', os.arch());
            break;
        default:
            console.log('Invalid command. Please try again.');
            break;
    }
};