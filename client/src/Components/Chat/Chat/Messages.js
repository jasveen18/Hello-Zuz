import React,{useState, useContext, useEffect, useRef} from 'react';
import { Box, makeStyles } from '@material-ui/core';
import Footer from './Footer';
import { AccountContext } from '../../../Context/AccountInfo';
import { addMessages, getMessages } from '../../../Service/Api';
import Message from './Message';
import {io} from 'socket.io-client';

const useStyles = makeStyles({
    wrapper: {
        backgroundSize: '50%',
    },
    component: {
        height: '69.5vh',
        overflowY : 'scroll'
        
    }

});

const Messages = ({conversation, person}) => {

    const classes = useStyles();

    const {account, socket, newMessageFlag, setNewMessageFlag} = useContext(AccountContext);

    const [value, setValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [incomingMessage, setIncomingMessage] = useState();

    const scrollRef = useRef();

    useEffect(() => {
        
        socket.current.on('getMessage', data => {
            setIncomingMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, []);
    

    useEffect(() => {
        const getMessagesDetails = async () => {
            let response = await getMessages(conversation._id);
            //console.log(response.data);
            setMessages(response.data)
        }
        getMessagesDetails();
    },[conversation?._id, person?._id, newMessageFlag]);


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ transition: "smooth" })
    }, [messages]);


    useEffect(() => {
        incomingMessage && conversation?.members?.includes(incomingMessage.sender) && 
            setMessages((prev) => [...prev, incomingMessage]);
        
    }, [incomingMessage, conversation]);


    const receiverId = conversation?.members?.find(member => member !== account.googleId);

    const sendText = async (e) => {
        let code = e.keyCode || e.which;
        if(!value)
            return;
       
       if(code === 13){
           let message = {
               sender: account.googleId,
               conversationId: conversation._id,
               text: value
            }

            socket.current.emit('sendMessage', {
                senderId: account.googleId,
                receiverId,
                text: value
            })

           await addMessages(message);
           setValue('');
           setNewMessageFlag(prev => !prev)

       }
    };

    return (
        <>
           <Box className={classes.wrapper} >
               <Box className={classes.component} >
                  {
                      messages && messages.map((curr) => {
                          return(
                              <>
                                <Box ref={scrollRef}>
                                    <Message curr={curr} />
                                </Box>
                                
                              </>
                          )
                      })
                  }
               </Box>
               <Footer setValue={setValue} sendText={sendText} value={value} />
           </Box>
        </>
    )
};

export default Messages;
