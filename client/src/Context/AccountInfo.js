import React, {createContext, useState, useEffect, useRef} from 'react';
import { io } from 'socket.io-client';

export const AccountContext = createContext(null);


const AccountInfo = ({children}) => {
    
    const [account,setAccount] = useState();
    const [activeUsers, setActiveUsers] = useState();
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    const socket = useRef();

    //useEffect(() => {
    //    console.log(activeUsers);
    //},[activeUsers]);

    useEffect(() => {
        socket.current = io('ws://localhost:5000');
    },[]);

    return (
        <>
            <AccountContext.Provider value={{
                account,
                setAccount,
                socket,
                setActiveUsers,
                activeUsers,
                newMessageFlag,
                setNewMessageFlag,
                showloginButton,
                setShowloginButton,
                showlogoutButton,
                setShowlogoutButton
            }}>
                {children}
            </AccountContext.Provider>
        </>
    )
}

export default AccountInfo;
