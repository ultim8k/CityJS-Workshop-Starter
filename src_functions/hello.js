exports.handler = function (event, context, callback) {
    const greeter = 'hello CityJS';

    console.log(greeter);

    const response = {
        statusCode: 200,
        body: greeter
    };

    callback(null, response);
}