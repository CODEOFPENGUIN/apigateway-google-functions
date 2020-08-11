const defaultOption = require('./defaultOption');

exports.getOptions = function (params) {
    const port = '--port=';
    const functionsStartPort = '--startPort=';
    const targetSrc = '--targetSrc=';

    let options = defaultOption.defaultOption;

    params.forEach(function (val, index, array) {
        if(val.startsWith(port)){
            options.proxyPort = val.split('=')[1];
        }
        if(val.startsWith(functionsStartPort)){
            options.startFunctionsPort = val.split('=')[1];
        }
        if(val.startsWith(targetSrc)){
            options.tagetSrc = val.split('=')[1];
        }
    });
    return options;
}
