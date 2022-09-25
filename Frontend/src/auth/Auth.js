import axios from "axios";

export async function loginUser(username, password) {

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



export async function registeruser (registerform) {
  
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


