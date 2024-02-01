const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2Fpa2lyYW4xMjMyMiIsImEiOiJjbHI2dzJyaXgwam42MmtwZ2M0MHNqMWpqIn0.nCr5JSYMYwSOHl0rSWZ9Aw';
    request({url, json:true}, (error, {body}) => {
      if(error){
        callback('Unable to connect to location services!', undefined)
      } else if(body.features.length === 0){
        callback('Unable to find the given address', undefined)
      } else {
      callback(undefined, {
        latitude:body.features[0].center[1], 
        longitude:body.features[0].center[0],
        location:body.features[0].place_name
      })   
      }
    })
  }

module.exports={geocode:geocode}