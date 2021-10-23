import React from 'react'
import { Dialog, makeStyles, Box, withStyles} from '@material-ui/core';
import Menu from './Menu/Menu';
import ChatSpace from './Chat/ChatSpace';

const useStyles = makeStyles({
    container:{
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        padding: 20        
    },
    main: {
        position: 'absolute',
        top: '52%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        borderRadius: '10px',
        backgroundColor: '#7E878c',
        height: '90%'
    },
    component: {  
        display: 'flex',   
    },
    leftComponent: {
        minWidth: 380,
        width: 350,
        height: 610,
        color: 'white',
        backgroundColor: '#3f3f3f',
        borderRadius: 13,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20,
        marginBottom:20
    },
    rightComponent: {
        width: '70%',
        height: 610,
        minWidth: 300,
        borderLeft: '1px solid rgba(0, 0, 0, 0.14)',
        borderRadius: 10,
        backgroundColor: '#3f3f3f',
        marginRight: 20,
        marginTop: 20,
        marginBottom:20
    }
});

const style = {
    dialogPaper: {
        height: '100%',
        width: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 0,
        boxShadow: 'none',
        margin: 0,
        overflow: 'hidden'
    }
};


const ChatBox = ({classes}) => {
    const classname = useStyles();

    return (
        <>
            
            <Dialog 
                open={true} 
                classes={{paper: classes.dialogPaper}} 
                BackdropProps={{style: {backgroundColor: 'unset'}}}
            >
                <Box className={classname.container}>
                    <Box className={classname.main}>
                        <Box className={classname.component}>
                            <Box className={classname.leftComponent}>
                                <Menu />
                            </Box>
                            <Box className={classname.rightComponent}>
                                <ChatSpace />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
};

export default withStyles(style)(ChatBox);

