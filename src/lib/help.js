module.exports = function() {
    console.log(
        'Usage: ag-functions [OPTIONS]\n\n' +
        '  API Gateway For Google Functions\n\n' +
        'Example usage:\nag-functions --port=8888 --startPort=3000 --targetSrc=dist --yml=./serverless.yml\n' +
        'Options:\n' +
        '  --port         Port for API Gateway.\n' +
        '  --startPort    Port for each functions-framework.\n' +
        '  --targetSrc    Path for Google Functions source file path.\n' + 
        '  --yaml         Path for open API yaml file.\n'
        );
}