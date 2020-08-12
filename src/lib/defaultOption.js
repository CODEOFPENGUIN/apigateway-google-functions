const proxyPort = 8880;
const startFunctionsPort = 3000;
const endPointKey = 'operationId';
const tagetSrcDefault = 'dist';
const yamlPath = './serverless.yml';

module.exports = {
    proxyPort: proxyPort,
    startFunctionsPort: startFunctionsPort,
    endPointKey: endPointKey,
    tagetSrc: tagetSrcDefault,
    yaml: yamlPath,
    isHelp: false,
};