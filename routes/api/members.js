const express = require('express'); //bring in express so we can use the router
const uuid = require('uuid')// ID generator 
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

//create member
router.post('/', (req, res)=> {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }
    if (!newMember.name || !newMember.email) {
        return res.status(400).json({msg: "Please include a name and email"});
    } 
    members.push(newMember);
    //res.json(members); //commenting out because this returns the json results.
    //when we are using this on a form, we don't want to show the json results. we need to redirect 
    //res.redirect('/'); //same page. Added the member and redirected to the same page
    res.json(members);//putting this back in for the API to work
});

//update member
router.put('/:id', (req, res) => {// shorten the path because?not quite sure yet
    // use sum method to state that there is no member with that ID
    const found = members.some(member=> member.id=== parseInt(req.params.id)); //will return true or false 
    if (found) {
       const updateMember = req.body; 
       //update the member if their id is this: 
       members.forEach(member => {
        if (member.id===parseInt(req.params.id)) {
            member.name = updateMember.name ? updateMember.name: member.name;
            member.email = updateMember.email ? updateMember.email: member.email;
            
            res.json({ msg: "Member updated", member });
        }
       });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

//Delete Member
router.delete('/:id', (req, res) => {// shorten the path because?not quite sure yet
    // use sum method to state that there is no member with that ID
    const found = members.some(member=> member.id=== parseInt(req.params.id)); //will return true or false 
    if (found) {
        //res.send(req.params.id); // reques.params.(you can get any paramater)
        res.json({ msg: "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))});//filter out based upon condition
    //                                 ^this came from the object array from Members.js. Its one of the key value pairs. it's a number and not a string
    //                                                     ^^This turns the id into a string. We will wrap it in parse int because both have to be the same type. parse it out to be a number?
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
    }
});

module.exports = router; 