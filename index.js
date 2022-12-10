const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const mainRoute = require('./router/route');
const apiMiddleware = require('./middlewares/apikeys');


app.set('view engine','ejs');

app.use(express.static('public'));

// console.log(app.get('views'));
// console.log(app.get('view engine'));

// app.set('views', __dirname +'\template');
// console.log(app.get('views'));


// app.get('/',(req, res)=>{
//     console.log('home page');
//     res.sendFile(path.resolve(__dirname+'/index.html'));
// })

// app.get('/about',(req, res)=>{
//     res.sendFile(path.resolve(__dirname+'/about.html'));
// })


//Dynamic page rendering
// app.get('/',(req, res)=>{
//     res.render('index', {
//         title : 'Home Page'
//     });
// })

// app.get('/about',(req, res)=>{
//     res.render('about', {
//         title : 'About Page'
//     });
// })



//application level middleware
// app.use(apiMiddleware);


//using express router

app.use('/',mainRoute);


app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`);
});