import React from 'react';
import Messanger from './Components/Messanger';
import AccountInfo from './Context/AccountInfo';
import TemplateProvider from './Templates/TemplateProvider';
import UserProvider from './Context/UserProvider';

const App = () => {
  return (
    <>
      <TemplateProvider>
        <UserProvider>
          <AccountInfo>
            <Messanger />
          </AccountInfo>
        </UserProvider>  
      </TemplateProvider>
    </>
  )
}

export default App
