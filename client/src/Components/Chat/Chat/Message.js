import React,{ useContext } from 'react';
import { Box,Typography,makeStyles } from '@material-ui/core';
import { AccountContext } from '../../../Context/AccountInfo';

const useStyles = makeStyles({
    wrapper: {
        background: '#FFFFFF',
        padding: 5,
        maxWidth: '60%',
        width: 'fit-content',
        display: 'flex',
        borderRadius: 10,
        wordBreak: 'break-word',
        marginLeft: 40
    },
    own: {
        background: 'rgba(222, 23, 11, 255)',
        padding: 5,
        maxWidth: '60%',
        width: 'fit-content',
        marginLeft: 'auto',
        display: 'flex',
        borderRadius: 10,
        wordBreak: 'break-word',
        marginRight: 40
    },
    text: {
        fontSize: 14,
        padding: '0 25px 0 5px',
    },
    time: {
        fontSize: 10,
        color: '#919191',
        marginTop: 6,
        wordBreak: 'keep-all',
        marginTop: 'auto'
    }

});

const Message = ({curr}) => {

    const classes = useStyles();

    const {account} = useContext(AccountContext);

    const format = (date) => {
        return date < 10 ? '0' + date : date;
    }

    return (
        <>
            <Box className={account.googleId === curr.sender ? classes.own : classes.wrapper} >
                <Typography className={classes.text} >{curr.text}</Typography>
                <Typography className={classes.time}>
                {format(new Date(curr.createdAt).getHours())}:{format(new Date(curr.createdAt).getMinutes())}
                </Typography>
            </Box>
        </>
    )
};

export default Message;
