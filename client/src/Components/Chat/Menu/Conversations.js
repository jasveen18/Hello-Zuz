import React,{useState, useContext, useEffect} from 'react';
import { getUsers } from '../../../Service/Api';
import { Box, Divider, makeStyles } from '@material-ui/core';
import Conversation from './Conversation';
import { AccountContext } from '../../../Context/AccountInfo';

const useStyles = makeStyles({
    component: {
        overflow: 'overlay',
        height: '80vh'
    },
    divider: {
        margin: '0 0 0 67px',
        backgroundColor: '#F2F2F2'
    }

});


const Conversations = ({text}) => {

    const classes = useStyles();

    const {account, socket, setActiveUsers} = useContext(AccountContext);

    const [users,setUsers] = useState([]);

    useEffect(()=> {
        const fetchData = async ()=> {
            const data = await getUsers();
            let filteredData = data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData);
        }
        fetchData();
    },[text]);


    useEffect(() => {
        socket.current.emit('addUser', account.googleId);
        socket.current.on('getUsers', users => {
            setActiveUsers(users);
        })
    },[account]);


    return (
        <>
            <Box className={classes.component}>
                {
                    users && users.map((curr, id)=>{
                        if(curr.googleId !== account.googleId){ 
                        
                          return(
                                <>
                                    <Conversation curr={curr}/>
                                    {
                                        users.length !== (id+1) && <Divider />
                                    }
                                </>
                          )
                        }
                        
                    })
                }
            </Box>
        </>
    )
};

export default Conversations;
