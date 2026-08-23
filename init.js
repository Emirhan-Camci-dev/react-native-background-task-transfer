const { spawn } = require('child_process');

const child = spawn('npx', ['--yes', 'create-react-native-library@latest', 'react-native-background-file-transfer'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

child.stdout.on('data', (data) => {
  const str = data.toString();
  console.log(str);
  
  if (str.includes('What is the name of the npm package?')) {
    child.stdin.write('\n');
  } else if (str.includes('What is the description for the package?')) {
    child.stdin.write('Background upload and download sdk\n');
  } else if (str.includes('What is the name of package author?')) {
    child.stdin.write('Developer\n');
  } else if (str.includes('What is the email address for the package author?')) {
    child.stdin.write('dev@dev.com\n');
  } else if (str.includes('What is the URL for the package author?')) {
    child.stdin.write('https://dev.com\n');
  } else if (str.includes('What is the URL for the repository?')) {
    child.stdin.write('https://github.com/dev/dev\n');
  } else if (str.includes('What type of library do you want to develop?')) {
    // Select Native module
    child.stdin.write('\n'); 
  } else if (str.includes('Which languages do you want to use?')) {
    // Select Kotlin & Objective-C
    child.stdin.write('\n');
  } else if (str.includes('Ok to proceed?')) {
    child.stdin.write('y\n');
  }
});

child.stderr.on('data', (data) => {
  console.error(data.toString());
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});
