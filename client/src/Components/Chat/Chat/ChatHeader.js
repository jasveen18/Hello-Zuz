import React,{useContext} from 'react';
import { Box, Typography, makeStyles} from '@material-ui/core';
import { Search, MoreVert } from '@material-ui/icons';
import { AccountContext} from '../../../Context/AccountInfo';

const useStyles = makeStyles({
    header: {
        height: 35,
        background: 'rgba(222, 23, 11, 255)',
        display: 'flex',
        padding: '10px 16px',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    dp: {
        width: 37,
        height: 37,
        objectFit: 'cover',
        borderRadius: '50%',
        padding: '0 2px'
    },
    name: {
        marginLeft: 10
    },
    rightContainer: {
        marginLeft: 'auto',
        '& > *': {
            padding: 8,
            fontSize: 22,
            color: 'black'
        }
    },
    status: {
        fontSize: 12,
        color: 'rgb(0, 0, 0, 0.6)',
        marginLeft: 10
    }
});

const ChatHeader = ({person}) => {
   
    const classes = useStyles();

    const { activeUsers } = useContext(AccountContext);

    console.log(activeUsers);

    return (
        <>
            <Box className={classes.header}>
                <img src={person.imageUrl} alt='dp' className={classes.dp} />
                <Box>
                    <Typography className={classes.name}>{person.name}</Typography>
                    <Typography className={classes.status} >
                        {activeUsers?.find(user => user.userId === person.googleId) ? 'online' : 'Offline'}
                    </Typography>
                </Box>
                <Box className={classes.rightContainer}>
                    <Search />
                    <MoreVert />
                </Box>
            </Box>
        </>
    )
};

export default ChatHeader;
