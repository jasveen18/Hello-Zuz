const express = require('express');
const router = express.Router();
const User = require('../model/schema');
const Conversation = require('../model/convoSchema');
const Messages = require('../model/messageSchema');

//adding users in database
router.post('/add', async(req,res) => {
    try{
        let exist = await User.findOne({ googleId: req.body.googleId });

        if(exist) {
            res.status(200).json('user already exists');
            return;
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json('user saved successfully');

    } catch(err){
        res.status(500).json(err);
    }
      
});

//getting users from database 
router.get('/users', async(req,res) => {
    try{
        const user = await User.find({});
        res.status(200).json(user);

    } catch(err){
        res.status(500).json(err);
    }

});

//adding conversation in database
router.post('/conversation/add', async(req,res) => {
    let senderId = req.body.senderId;
    let receiverId = req.body.receiverId;
    try{

        let exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]}});

        if(exist){
            res.status(200).json('conversation already exist');
            return;
        }

        const newConvo = new Conversation({
            members: [senderId, receiverId]
        });

        await newConvo.save();
        res.status(200).json('new conversation added');
 
    } catch(err){
        res.status(500).json(err);
    }

});


router.post('/conversation/get', async(req,res) => {
    let senderId = req.body.sender;
    let receiverId = req.body.receiver;
    try{
        const conversation = await Conversation.findOne({ members: { $all: [senderId, receiverId]}});
        res.status(200).json(conversation);
    } catch(err){
        res.status(500).json(err);
    }

});


router.post('/messages/add', async(req,res) => {
    const newMessage = new Messages(req.body);
    console.log(req.body, newMessage);

    try{
        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId, {message: req.body.text});
        res.status(200).json('Message saved successfully');
    } catch(err){
        res.status(500).json(err);
    }

});

router.get('/messages/get/:id', async(req,res) => {
    try{
        const messages = await Messages.find({ conversationId: req.params.id});
        res.status(200).json(messages);
    } catch(err){
        res.status(500).json(err);
    }

});



module.exports = router;