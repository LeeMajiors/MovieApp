
const express = require('express');
const router = express.Router();
const fs = require('fs');

//define routes
router.get('/users',(req,res)=>{
    fs.readFile('movies.json','utf-8',(err,data)=>{
    res.end(data)
    }) 
    
        
});

router.get('/users/:id',(req, res)=> {
    const userId = req.params.id;
    res.send(`details of user ${userId}`);
});

router.post('/users',(req, res)=> {
    res.send('create a new user');
});

router.put('/user/:id',(req, res)=> {
    const userId = req.params.id;
    res.send(`update user ${userId}`)
});

router.delete('/user/:id',(req, res)=>{
    const userId = req.params.id;
    res.send(`Delete user ${userId}`);
});

module.exports = router;