const defaultOption = require('./defaultOption');

module.exports = function (params) {
    const port = '--port=';
    const functionsStartPort = '--startPort=';
    const targetSrc = '--targetSrc=';
    const yaml = '--yml=';
    const help = '--help'

    let options = defaultOption;

    params.forEach(function (val, index, array) {
        console.log(val);
        if(val === help) {
            options.isHelp = true;
            return false;
        } else {
            if(val.startsWith(port)){
                options.proxyPort = val.split('=')[1];
            }
            if(val.startsWith(functionsStartPort)){
                options.startFunctionsPort = val.split('=')[1];
            }
            if(val.startsWith(targetSrc)){
                options.tagetSrc = val.split('=')[1];
            }
            if(val.startsWith(yaml)){
                options.yaml = val.split('=')[1];
            }
        }
    });
    return options;
}
