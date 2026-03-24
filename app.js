import express from 'express';
import { logger } from './middlewares/logger.js';
import path from 'path';                                                            // googled: recommendation for absolute paths
import { fileURLToPath } from 'url';
import fs from 'fs';                                                                // to be able to check for files in 'public'

//Exercise LU
import data from './articles.json' with { type: 'json' };

const app = express();
const PORT = 3000;

// figured with AI help to implement __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// --- PRE ROUTE MIDDLEWARE --- 

app.use(logger)
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))                                       //to parse data from forms

//evtl. brauche ich nicht mehr
app.use(express.static(path.join(__dirname, 'public')));                            // googled: absolute path, instead of relative Pfad





// --- ROUTING ---

//Exercise LU
app.get('/LU', (req, res) => {
    console.log(data)
    res.send(data[0].title1)
})


// redirects
app.get('/home', (req, res) => {
    res.redirect('/')
})


app.get('/index', (req, res) => {
    res.redirect('/')
})

app.get('/404', (req, res) => {
    res.redirect('/')
})


// static route
app.get('/', (request, response) => {
    response.render('index')
})

app.get('/profile', (request, response) => {
    response.render('profile')
})

app.get('/articles', (request, response) => {
    const numberOfArticlesAvailable = 3
    response.render('articles', {numberOfArticlesAvailable: data}, )
})

app.get('/events', (request, response) => {
    response.render('events')
})

app.get('/about', (request, response) => {
    response.render('about')
})

app.get('/home', (request, response) => {
    response.render('404')
})


// contact form route
app.post('/profile', (request, response) => {
    console.log('Contact form submission: ', request.body)
    response.send('<h1>Thank You</h1><p>We will get back to you asap!</p>')
})


// catch-all route
app.use((req, res) => {
    res.status(404).render('404');
});



// --- SERVER ON ---

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})




