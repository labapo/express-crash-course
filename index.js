//create simple express server

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger'); //it's going to a differnt file outside the js file
const members = require('./Members')

const app = express();


//initialize middleware
//app.use(logger); 

//handlebars Middleware
//1. set engine
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
//         ^setting the template to handlebars
//                         ^ passing through exphbs variable and the default layout is a layout called, "main"
//setting the view engine
app.set('view engine', 'handlebars');

//initialize middleware again for body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage Route
app.get('/', (req, res)=> res.render('index', {
    title: "Member App",
    members//passing in members so you can have a list of members on the page
}));

//set static folder - make public folder static so we can use it. Creates a static server/folder
app.use(express.static(path.join(__dirname, 'public')));
                    // ^folder that we want to save as a static folder

//Members API route
app.use('/api/members', require('./routes/api/members'));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html')); //current directory, load into a folder called public, and load a file called index.html
// });
//if we use the above way, we would have to put the name of each page for each sepeate route
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)); 