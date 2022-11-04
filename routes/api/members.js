const express = require('express'); //bring in express so we can use the router
const router = express.Router(); //so when we handle the requests, we'll use router now and not app. example app.get = router.get
const members = require('../../Members');//.. means to go outside

//gets all members
router.get('/', (req, res) => {
    res.json(members)//return as json, no need to stringify it because the res.json will take care of it
});// this can also be router.get('/api/members', (req, res) => res.json(members))

//get single member
router.get('/:id', (req, res) => {// shorten the path because?not quite sure yet
    // use sum method to state that there is no member with that ID
    const found = members.some(member=> member.id=== parseInt(req.params.id)); //will return true or false 
    if (found) {
        //res.send(req.params.id); // reques.params.(you can get any paramater)
        res.json(members.filter(member => member.id === parseInt(req.params.id)));//filter out based upon condition
    //                                 ^this came from the object array from Members.js. Its one of the key value pairs. it's a number and not a string
    //                                                     ^^This turns the id into a string. We will wrap it in parse int because both have to be the same type. parse it out to be a number?
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router; 