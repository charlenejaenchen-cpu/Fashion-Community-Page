// --- DEPENDENCIES ---
import express, { response } from 'express';
import { logger } from './middlewares/logger.js';
import path from 'path';                                                            // googled: recommendation for absolute paths
import { fileURLToPath } from 'url';
     
// JSON Database
import data from './articles.json' with { type: 'json' };
import connectDB from './config/db.js';
import Article from './models/articles.js';


const app = express();
const PORT = 3000;


// figured with AI help to implement __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// --- CONFIGURATION ---
app.set('view engine', 'ejs');


// --- PRE ROUTE MIDDLEWARE --- 
app.use(logger);                                                                    // for the console log infos when a client send request
app.use(express.urlencoded({extended: true}));                                       //to parse data from forms
connectDB();

// nochmal belesen wofpr ich das brauche
app.use(express.static(path.join(__dirname, 'public')));                            // googled: absolute path, instead of relative Pfad


// --- ROUTING ---

// Exercise LU
app.get('/LU', (request, response) => {
    console.log(data)
    response.send(data[0].title1)
})


// redirects
app.get('/home', (request, response) => {
    response.redirect('/')
})


app.get('/index', (request, response) => {
    response.redirect('/')
})

app.get('/404', (request, response) => {
    response.redirect('/')
})


// static route
app.get('/', (request, response) => {
    response.render('index')
})

app.get('/profile', (request, response) => {
    response.render('profile')
})

app.get('/articles', async (request, response) => {
    const allArticles = await Article.find({})
    response.render('articles', { 
        allArticles: allArticles })
})

app.get('/my-articles', async (request, response) => {
    const allArticles = await Article.find({})
    response.render('articles/my-articles', { 
        allArticles: allArticles })
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


// dynamic route
app.get('/articles/:slug', async (request, response) => {
    const slug = request.params.slug;
    const article = await Article.find({slug: slug});
    console.log(article);
    // if (!article) return response.status(404).render('404');
    response.render('articles/article-detail', { article: article[0] });
});


// contact form route
app.post('/home', (request, response) => {
    const formData = request.body;
    console.log('Contact form submission: ', formData);
    response.send('<h1>Thank You</h1><p>We will get back to you asap!</p>')
    //response.redirect('home')
})

// article upload form
app.post('/profile', async (request, response) => {
    const formData = request.body;
    const slug = request.body.title.toLowerCase().replaceAll(' ', '-')

    const article = new Article({
        slug: slug,
        title: request.body.title,
        author: request.body.author,
        date: request.body.date,
        article: request.body.article,
    })

    await article.save()

    console.log('Contact form submission: ', formData);
    // response.send('<h1>Thank You</h1><p>Your article has been uploaded</p>')
    response.redirect('profile');
});

//my article update and delete
app.post('/articles/:slug/delete', async (request, response) => {
    const slug = request.params.slug;
    await Article.findOneAndDelete ({ slug: slug });
    console.log(slug);
    response.send('done');
});

app.post('/articles/:slug/update', async (request, response) => {
    const slug = request.params.slug;
    await Article.findOneAndUpdate ({ slug: slug }, {
        article: request.body.article,
        title: request.body.title
    });
    response.send("done");
}) 

// catch-all route
app.use((reqest, response) => {
    response.status(404).render('404');
});



// --- SERVER ON ---

app.listen(PORT, () => {
    console.log(`Started server on port ${PORT}`);
});




