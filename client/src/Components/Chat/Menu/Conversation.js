import React,{useContext, useState, useEffect} from 'react';
import { makeStyles, Box, Typography } from '@material-ui/core';
import { userConversation, getConversation } from '../../../Service/Api';
import { AccountContext } from '../../../Context/AccountInfo';
import { UserContext } from '../../../Context/UserProvider';

const useStyles = makeStyles({
    component: {
        height: 40,
        display: 'flex',
        padding: '13px 0'
    },
    dp:{
        width: 50,
        height: 50,
        objectFit: 'cover',
        borderRadius: '50%',
        padding: '0 14px'
    },
    container: {
        display: 'flex'
    },
    timestamp: {
        fontSize: 12,
        marginLeft: 'auto',
        color: 'white',
        marginRight: 15
    },
    text: {
        display: 'block',
        color: 'white',
        fontSize: 14
    }

});


const Conversation = ({curr}) => {

    const classes = useStyles();
    const url = curr.imageUrl || 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png';
    

    const {account, socket, newMessageFlag} = useContext(AccountContext);
    const {setPerson} = useContext(UserContext);

    const [message, setMessage] = useState({});

    useEffect(() => {
        const getConversationMessage = async() => {
            const data = await getConversation({ sender: account.googleId, receiver: curr.googleId });
            //console.log(data);
            setMessage({ text: data.message, timestamp: data.updatedAt });
        }
        getConversationMessage();
    }, [newMessageFlag]);


    const userConvo = async ()=> {
        setPerson(curr);
        await  userConversation({senderId: account.googleId, receiverId: curr.googleId})
    };

    const getTime = (time) => {
        return time < 10 ? '0' + time : time; 
    }; 


    return (
        <>
            <Box className={classes.component} onClick={()=> userConvo()} >
                <Box>
                    <img src={url} alt='dp' className={classes.dp} />  
                </Box>
                <Box>
                    <Box className={classes.container}>
                        <Typography>{curr.name}</Typography>
                        { 
                            message.text && 
                            <Typography className={classes.timestamp}>
                                {getTime(new Date(message.timestamp).getHours())}:{getTime(new Date(message.timestamp).getMinutes())}
                            </Typography>        
                        }
                    </Box>
                    <Box>
                        <Typography className={classes.text}>{message.text}</Typography>
                    </Box>
                </Box>          
            </Box>
        </>
    )
}

export default Conversation;
