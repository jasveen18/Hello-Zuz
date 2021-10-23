import React, {useContext} from 'react';
import { makeStyles, Box} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { AccountContext } from '../../Context/AccountInfo';
import { addUser } from '../../Service/Api';

const useStyle = makeStyles(theme =>({
  component: {
    display: 'flex'
  },
  right: {
    position: 'absolute',
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',       
  },
  logo: {
    height: 220,
    width: 220,
    marginBottom: 180,
    [theme.breakpoints.down('xs')]: {
      marginBottom: 100,
      height: 180,
      width: 180
    }   
  },
  butt: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
  }

}));


const Login = () => {

  const classes = useStyle();

  const {account,setAccount} = useContext(AccountContext);

  const onLoginSuccess = async (res) => {
    console.log('Login Success:', res.profileObj);
    setAccount(res.profileObj);
    await addUser(res.profileObj);
    
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const ClientId = `771441744916-c5vrh4snjl2jf9clj7f2r3nlj9e5cvna.apps.googleusercontent.com`;

  return (
    <>
        <Box className={classes.component}>
            <Box className={classes.right}>
                <img src='./images/image1.jpeg' alt='dp' className={classes.logo} />
            </Box>
            <Box >
                <div style={{position: 'absolute', left: '0%', top: '41%', transform: 'translateX(0%) translateY(-25%)', 
                     width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <GoogleLogin
                        clientId={ClientId}
                        buttonText="Sign In Here"
                        onSuccess={onLoginSuccess}
                        onFailure={onLoginFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    />                        
                </div>
            </Box>
        </Box>    
    </>

  )
    
  
};

export default Login;
