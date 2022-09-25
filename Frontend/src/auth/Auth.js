import axios from "axios";

//Authenication handler for handling Authentication.

//Login user utility

export async function loginUser(username, password) {
    //Encrypting the username and password to pass in the Authorizatin header as Basic

    let encrypted = btoa(`${username}:${password}`)

   let response = await axios.post('/api/v1/auth/login', {},
        {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Basic ${encrypted}`}           
        }
    )
    return response;
}


//Register user utility

export async function registeruser (registerform) {
      
    //Constructing the payload items based on the user filled inputs on the registration form
    const sendDataItems = {
        "email_address": registerform['email'],
        "first_name": registerform['firstName'],
        "last_name": registerform['lastName'],
        "mobile_number": registerform['contactNumber'],
        "password": registerform['password']
      }

  let response =  await axios.post('/api/v1/signup', sendDataItems,
        {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",                        
        }
    })

    
    return response;
}


