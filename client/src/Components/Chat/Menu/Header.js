import React,{useContext, useState} from 'react';
import {Box, makeStyles} from '@material-ui/core';
import {Chat as MessageIcon} from '@material-ui/icons';
import { AccountContext } from '../../../Context/AccountInfo';
import HeaderMenu from './HeaderMenu';
import InfoDrawer from '../../Drawer/InfoDrawer';

const useStyles = makeStyles({
    header: {
        height: 35,
        background: 'rgba(222, 23, 11, 255)',
        display: 'flex',
        padding: '10px 16px',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius:10
    },
    style: {
        height: 37,
        width: 37,
        borderRadius: '50%'
    },
    chatIcons: {
        marginLeft: 'auto',
        '& > *': {
            marginLeft: 2,
            padding: 8,
            color: 'black'
        },
        '& :first-child': {
            fontSize: 22,
            marginRight: 8,
            marginTop: 3
        }
    }
});

const Header = () => {
    const classes = useStyles();

    const [openDrawer, setOpenDrawer] = useState(false);

    const {account} = useContext(AccountContext);

    const toggleDrawer = () => {
        setOpenDrawer(true);
    }

    return (
        <>
            <Box className={classes.header}>
                <img src={account.imageUrl} alt='dp' className={classes.style} onClick={()=> toggleDrawer()} />
                <Box className={classes.chatIcons}>
                    <MessageIcon />
                    <HeaderMenu />
                </Box>
            </Box>
            <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />
        </>
    )
}

export default Header
