import React,{useContext, useState, useEffect} from 'react';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { Box } from '@material-ui/core';
import {UserContext} from '../../../Context/UserProvider';
import {AccountContext} from '../../../Context/AccountInfo';
import { getConversation } from '../../../Service/Api';

const ChatSpace = () => {

    const {person, setPerson} = useContext(UserContext);
    const {account} = useContext(AccountContext);

    const [conversation, setConversation] = useState({});

    useEffect(() => {
        const getConversationDetails = async () => {
            let data = await getConversation({ sender: account.googleId, receiver: person.googleId});
            setConversation(data);  
        }
        getConversationDetails();

    }, [person.googleId])

    return (
        <>
            <Box>
                <ChatHeader person={person} />
                <Messages conversation={conversation} />
            </Box>
        </>
    )
}

export default ChatSpace;
