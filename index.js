//stockmarket 
const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

const otherStuff = "Hello, this is other stuff";

app.use(bodyParser.urlencoded({extended:false}));

function call_api(finishedAPI, ticker){
//pk_7591542e038a4da6a82b0443971c9529
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_7591542e038a4da6a82b0443971c9529', {json: true}, (err, res, body) => {
  if (err) {return consloe.log(err);}
  if (res.statusCode==200){
  //  console.log(body);
    finishedAPI(body);
  }
});
};

//set handlebars Middleware 
app.engine('handlebars', exphbs.engine({ extname: 'handlebars', defaultLayout: "main"}));
//app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

//Main page GET
app.get('/', (req, res) => {
    call_api(function(doneAPI){
        res.render('home',{
        //stuff: otherStuff
        stuff: doneAPI
        });
    },"fb");    
});

//Main page POST
app.post('/', (req, res) => {
    call_api(function(doneAPI){
        //posted_stuff = req.body.stock_ticker;
        //console.log(ticker);
        res.render('home',{
        //stuff: otherStuff
        stuff: doneAPI

        });
    }, req.body.stock_ticker);    
});

//About page
app.get('/about.html', (req, res) => {
    res.render('about');
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));
