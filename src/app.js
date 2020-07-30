const { spawn } = require('child_process');
const http = require('http');
const httpProxy = require('http-proxy');
const yaml = require('yaml');
const fs = require('fs');
const urlMatchRoute = require('./lib/route');
const defaultOption = require('./lib/defaultOption');

exports.server = function() {
  const services = [
  ];

  process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if(val.startsWith('--port=')){
      port = val.split('=')[1];
      // console.log(port)
    }
  });
  let startPort = defaultOption.startFunctionsPort;
  const ymlFile = fs.readFileSync('./serverless.yml', 'utf8');
  const serverlessYaml = yaml.parseDocument(ymlFile);
  const pathJson = serverlessYaml.toJSON()['paths'];
  
  for(path in pathJson) {
    for(method in pathJson[path]) {
      const endPoint = pathJson[path][method];

      services.push({
        route: path,
        method: method,
        path: 'dist/' + endPoint['operationId'],
        port: startPort++
      });
    }
  }
  console.log('start')
  // Start `serverless offline` for each service
  services.forEach(service => {
    const child = spawn('functions-framework', ['--target', 'handler', 
    '--port', service.port], {cwd: service.path});
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', chunk => console.log(chunk));
    child.stderr.on('data', chunk => console.log(chunk));
    child.on('close', code => console.log(`child exited with code ${code}`));
  });

  // Start a proxy server on port 8080 forwarding based on url path
  const proxy = httpProxy.createProxyServer({});
  const server = http.createServer(function(req, res) {
    const service = services.find(per => urlMatchRoute(req.url, per.route, req.method, per.method));
    // Case 1: matching service FOUND => forward request to the service
    if (service) {
      proxy.web(req, res, {target:`http://localhost:${service.port}`});
    }
    // Case 2: matching service NOT found => display available routes
    else {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(`Url path "${req.url}" does not match routes defined in services\n\n`);
      res.write(`Available routes are:\n`);
      services.map(service => res.write(`- ${service.route}\n`));
      res.end();
    }
  });
  server.listen(defaultOption.proxyPort);
}