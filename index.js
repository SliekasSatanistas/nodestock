//stockmarket 
const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

const otherStuff = "Hello, this is other stuff";

//set handlebars Middleware 
app.engine('handlebars', exphbs.engine({ extname: 'handlebars', defaultLayout: "main"}));
//app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home',{
        stuff: otherStuff
    });
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => console.log('Server is listening on port ' + PORT));
