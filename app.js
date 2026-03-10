import express from 'express';
import { logger } from './middlewares/logger.js';
import path from 'path';                                                            // googled: recommendation for absolute paths
import { fileURLToPath } from 'url';
import fs from 'fs';                                                                // to be able to check for files in 'public'


const app = express();
const PORT = 3000;

// figured with AI help to implement __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// --- PRE ROUTE MIDDLEWARE --- 

app.use(logger)
app.use(express.static(path.join(__dirname, 'public')));                            // googled: absolute path, instead of relative Pfad

//brauche ich erste bei forms 
/* 
app.use(express.urlencoded({extended: true}))
*/



// --- ROUTING ---

// static route: redirect Homepaige with /home (must come before dynamic route)
app.get('/home', (req, res) => {
    res.redirect('/')
})

// static route: redirect Homepaige with /404 
app.get('/404', (req, res) => {
    res.redirect('/')
})


//dynmaic route to all subpages
app.get('/:slug', (req, res) => {
    const pageName = req.params.slug;                                               // specific value for the placeholder
    const filePath = path.join(__dirname, 'public', `${pageName}.html`);          

    if (fs.existsSync(filePath)) {                                                  // Checks if that file exists
        res.sendFile(filePath);
    } else {
            res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
        }
});

// static route to default Homepaige 
// (I know I don't need this and it doesn't technically work because of line 19 but I didn't know what i coud use as another static route, so i put it anywasy and will delete later)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))                      // Again: rather use absolute path them relative
});


// --- SERVER ON ---

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`)
})




