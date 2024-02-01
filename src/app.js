const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// app is the kind of root for the web application and we call a function express(). we set all the necessary
// things to the app
const app = express()

// Define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))
// app.get('',(req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name:'sai',
//         age:35
//     }, {
//         name:'sravya',
//         age:31
//     },])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        headerContent:'Home Page',
        title:'Weather',
        name:'Sai',
        footer:'Created By Sai'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        headerContent:'About Page',
        name:'Sai', 
        about:'About',
        footer:'Created By Sai'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        headerContent:'Help Page',
        message:'This is a help page',
        footer:'Created By Sai'
    })
})
app.get('/weather', (req,res) => {

    if(!req.query.address){
        return res.send({
            error:'Address should be provided'
        })
    }
    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        } else {
            forecast.forecast(latitude, longitude, (error, weatherData) => {
                if(error){
                    return res.send({
                        error
                    })
                } else {
                    res.send({
                        address:req.query.address,
                        location,
                        weather:weatherData
                    })
                }
            })
        }
    })
    // res.send({
    //     location:'Jacksonville',
    //     temperature:'50',
    //     address:req.query.address
    // })
})

app.get('/products', (req, res) => {
    console.log(req.query.search)
    console.log(req.query.rating)
    if(!req.query.search){
        return res.send({
            error:'You must provide a search query'
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        headerContent:'Help Page',
        errorMessage:'Help Article not found',
        footer:'Created By Sai'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        headerContent:'Error Page',
        errorMessage:'Page not found',
        footer:'Created By Sai'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})