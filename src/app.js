const http = require('http');
const httpProxy = require('http-proxy');
const lib = require('./lib');

exports.server = function() {

  const options = lib.getOptions(process.argv);
  if(options.isHelp){
    lib.help();
  } else {
    const services = lib.openApiYaml(options);
  
    lib.spawnService(services);
  
    // Start a proxy server on port 8080 forwarding based on url path
    const proxy = httpProxy.createProxyServer({});
    const server = http.createServer(function(req, res) {
      const service = services.find(per => lib.urlMatchRoute(req.url, per.route, req.method, per.method));
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
    server.listen(options.proxyPort);
    console.log('Proxy Server Start port --' + options.proxyPort);
  }
}