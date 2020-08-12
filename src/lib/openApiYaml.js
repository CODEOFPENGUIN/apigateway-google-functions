const yaml = require('yaml');
const fs = require('fs');

module.exports = function(options) {
    const ymlFile = fs.readFileSync(options.yaml, 'utf8');
    const serverlessYaml = yaml.parseDocument(ymlFile);
    const pathJson = serverlessYaml.toJSON()['paths'];
    const services = [];
    let startPort = options.startFunctionsPort;
    for(path in pathJson) {
        for(method in pathJson[path]) {
            const endPoint = pathJson[path][method];

            services.push({
                route: path,
                method: method,
                path: options.tagetSrc + '/' + endPoint[options.endPointKey],
                port: startPort++
            });
        }
    }

    return services;
}
