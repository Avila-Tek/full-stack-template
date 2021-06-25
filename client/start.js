// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process');

function start() {
  exec('npm start', (err, stdout, stderr) => {
    if (err) {
      console.log(err);
      process.exit(0);
    }
  });
}

start();
