import axios from 'axios';

const url = 'http://localhost:8000';

// adding users in database
export const addUser = async(data) => {
    try{
        let response = await axios.post(`${url}/add`, data);
        return response.data;
    } catch(err){
        console.log('Error while calling addUser API ', err);
    }
};


export const getUsers = async() => {
    try{
        let response = await axios.get(`${url}/users`);
        console.log(response.data);
        return response.data;

    } catch(err){
        console.log('Error while calling getUsers API ', err);
    }
};


export const userConversation = async(data) => {
    try{
        await axios.post(`${url}/conversation/add`, data);
    } catch(err){
        console.log('Error while calling userConversation API ', err);
    }
};


export const getConversation = async(data) => {
    try{
        let response = await axios.post(`${url}/conversation/get`, data);
        return response.data;
    } catch(err){
        console.log('Error while calling getConversation API ', err);
    }
};


// adding messages in database
export const addMessages = async(data) => {
    try{
        await axios.post(`${url}/messages/add`, data);
        
    } catch(err){
        console.log('Error while calling getMessages API ', err);
    }
};


// getting messages from database
export const getMessages = async(id) => {
    try{
     return await axios.get(`${url}/messages/get/${id}`);
        
    } catch(err){
        console.log('Error while calling addMessages API ', err);
    }
};

