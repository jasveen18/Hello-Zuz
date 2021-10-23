import React,{useContext} from 'react'
import {AppBar, makeStyles, Box, Typography} from '@material-ui/core'
import Login from './Account/Login';
import { AccountContext } from '../Context/AccountInfo';
import ChatBox from './Chat/ChatBox';

const useStyles = makeStyles(theme =>({
    component: {
        height: '100vh',
    },
    loginHeader: {
        background: 'rgba(222, 23, 11, 255)',
        height: 100,
        boxShadow: 'none'
    },
    text: {
        fontSize: 35,
        fontFamily: 'Roboto',
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]:{
            fontSize: 17
        } 
    }

}));

const Messanger = () => {
    const classes = useStyles();
    const {account} = useContext(AccountContext);
    
    return (
        <>
            <Box className={classes.component}>
                <AppBar className={classes.loginHeader}>
                        <Typography className={classes.text}>WELCOME TO THE WORLD OF ZUZ</Typography>
                </AppBar>

                { account ? <ChatBox /> : <Login />}
            </Box>    
        </>
    )
}

export default Messanger
