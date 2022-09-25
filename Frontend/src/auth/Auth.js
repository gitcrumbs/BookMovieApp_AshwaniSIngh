import axios from "axios";

async function loginUser(username, password) {

    let encrypted = btoa(`${username}:${password}`)

    await axios.post('/api/v1/auth/login', {},
        {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Basic ${encrypted}`}           
        }
    ).then((response) => {
            console.log("Response Checks", response)
        }).catch((error) => {
            console.log("Error Checks", error)
        })
}


export default loginUser;