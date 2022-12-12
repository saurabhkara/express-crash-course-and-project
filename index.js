const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

const mainRoute = require('./router/route');
const productRoute = require('./router/product');
const apiMiddleware = require('./middlewares/apikeys');
const ErrorHandler = require('./errors/ErrorHandler');


app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json());

//normal form submittion url encoded middleware used
// app.use(express.urlencoded({extended: false}));



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
app.use('/',productRoute);


app.use((req,res,next)=>{
   return res.json({message:'Page not found 404'});
})

app.use((err, req, res, next)=>{
    // next();
    // res.json({message : 'All fields are required'});

    if(err instanceof ErrorHandler){
        res.status(err.status).json({
            error:{
                message: err.msg,
                status:err.status
            }
        })
    }else{
        res.status(500).json({
            error:{
                message:err.msg,
                status:err.status
            }
        })
    }
})



app.listen(PORT,()=>{
    console.log(`listing on port ${PORT}`);
});