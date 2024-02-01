const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=3f4d22e16b1632836000854c81e69313&query='+latitude +','+longitude+'&units=f'
    request({url, json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if (body.error){
            callback('Unable to find the location', undefined)
        } else {
            // console.log(body)
            callback(undefined,       body.current.weather_descriptions[0] +
                " conditions. " +
                "It is currently " +
                body.current.temperature +
                " degrees out" +
                ". It feels like " +
                body.current.feelslike+
                ". There is "+body.current.precip+"% chance of rain.")
        }
    })
}

module.exports={forecast:forecast}