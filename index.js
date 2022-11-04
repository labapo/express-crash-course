//create simple express server

const express = require('express');
const path = require('path');
const logger = require('./middleware/logger'); //it's going to a differnt file outside the js file

const app = express();

//Create middleware function


//initialize middleware
//app.use(logger); 

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