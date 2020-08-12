const { spawn } = require('child_process');

module.exports = function(services) {
    services.forEach(service => {
        const child = spawn('functions-framework', ['--target', 'handler', 
        '--port', service.port], {cwd: service.path});
        child.stdout.setEncoding('utf8');
        child.stdout.on('data', chunk => console.log(chunk));
        child.stderr.on('data', chunk => console.log(chunk));
        child.on('close', code => console.log(`child exited with code ${code}`));
    });
}