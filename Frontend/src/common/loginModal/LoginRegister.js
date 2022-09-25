import React, { useState } from 'react';
import {
    Button,
    Tab,
    Tabs,
    TextField,
    Typography    
} from "@material-ui/core";
import Modal from 'react-modal';
import Panel from '../panel/Panel'
import './LoginRegister.css'
import {loginUser,registeruser} from '../../auth/Auth'


const username = "string";
    const pwrd = "string";

const LoginRegister = ({loginClick,setisLoggedIn,setloginClick}) => {
    var base64 = require("base-64");
    

    const [loginOpen, setLoginOpen] = useState(loginClick);
    const [value, setValue] = useState(0);
    const [login, setLogin] = useState(true);
    const [success, setSuccess] = useState(false);
    const [loginUserName,setloginUserName] = useState("")
    const [loginpasswrd,setloginpasswrd] = useState("")
    const [firstName, setfirstName] = useState("");    
    const [isfirstNameset, setisfirstNameset] = useState(false); 
    const [lastName, setlastName] = useState("");
    const [IslastNameSet, setlastNameSet] = useState(false);
    const [email, setemail] = useState("");
    const [IsemailSet, setemailSet] = useState(false);
    const [password, setpassword] = useState("");
    const [IspasswordSet, setpasswordSet] = useState(false);
    const [contactNumber, setcontactNumber] = useState("");
    const [IscontactNumberset, setIscontactNumberset] = useState(false);
    const [displayText, setdisplayText] = useState("");
    const [logindisplayText, setlogindisplayText] = useState("");
    const [isValidated, setisValidated] = useState(false);
    

    const registerform = {        
        firstName,
        lastName ,
        email,
        password,
        contactNumber                      
    }



   

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setdisplayText("")
        setisfirstNameset(false)
        setlastNameSet(false)
        setemailSet(false)
        setpasswordSet(false)
        setIscontactNumberset(false)
        setisValidated(false);
        setfirstName(""),
        setlastName("") ,
        setemail(""),
        setpassword(""),
        setcontactNumber("")   
    };

    const handleCloseModal = ()=>{
        setLogin(true);
        setLoginOpen(false);
        setisLoggedIn(false);
        setloginClick(false);
      }


    const loginHandler = (e) => {
        e.preventDefault();

        setLogin(false);
        setLoginOpen(false);
        
        try{
            console.log("User details are ",loginUserName)
            loginUser(loginUserName,loginpasswrd).then(success=>{
                setLogin(false);
                setLoginOpen(false);
                setisLoggedIn(true);
            }).catch(err=>{

                console.log("Unable to login",err)
                setlogindisplayText("Unable to login");
                setLoginOpen(true);
                setLogin(true);
            })
        }catch(except){
            console.log("Unable to login",except)
            setLoginOpen(true);
            setLogin(true);
        }
       

       
        
    };

    const registerFormHandler = () => {
        
         validateFields();
         const valueset =  firstName!==''&&lastName!==''&&email!==''&&password!==''&&contactNumber!=='' ;       
        
        if(valueset){            
            registeruser(registerform).then(item=>{
             
                 setdisplayText("'Registration Successful. Please login!'") 
                 
                 setSuccess(valueset)
             
         }).catch(error=>{         
             try{
                     
                     setdisplayText(error.response.data.message)
                     setSuccess(true)    
 
             } catch(except) {
                 console.log("Inside exception",except)
             }   
                  
         });          
             
         } 
    };


    const validateFields = ()=>{

        let finalSet = false;
        setisfirstNameset(false)
        setlastNameSet(false)
        setemailSet(false)
        setpasswordSet(false)
        setIscontactNumberset(false)
        setisValidated(false);
        for (const item in registerform){

             switch (item) {
                case 'firstName':
                    setisfirstNameset(firstName!=='');
                    break;
                case 'lastName':
                    setlastNameSet(lastName!=='');
                    break;    
                case 'email':
                    setemailSet(email!=='');
                    break;
                case 'password':
                    setpasswordSet(password!=='');
                    break;
                 case 'contactNumber':
                    setIscontactNumberset(contactNumber!=='');
                    break;

                default:
                    break;
             }
                 
            
        }
        setisValidated(true);   

     
        
    }
   

    const handlephoneNumber = (e) =>{
        setcontactNumber(e.target.value)
    };

    const handlePassword = (e) =>{
      setpassword(e.target.value);
    }

    const handleEmail = (e) =>{
        setemail(e.target.value);
      }

      const handleUserFirstName = (e) =>{
        setfirstName(e.target.value);
      }

      const handleUserlastName = (e)=>{
        setlastName(e.target.value);
      }

      const setname = (e)=>{       
        setloginUserName(e.target.value)
      }

      const setpaswrd =(e)=>{
        setloginpasswrd(e.target.value)
      }

     

      

    return (

        <div id='modal_content'>
            <Modal
                isOpen={loginOpen}
                ariaHideApp={false}
                id="login_modal"
                onRequestClose={handleCloseModal}
                
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <Panel value={value} index={0}>
                    <TextField label="Username" required style={{ margin: "5px 0px" }}  
                    onChange={setname}
                   />
                    <TextField
                        label="Password"
                        required
                        type="password"
                        style={{ margin: "5px 0px" }}
                        onChange={setpaswrd}
                    />

                    <div className="form_button">
                        <Button id="btn_login"
                            variant="contained"                          
                            onClick={loginHandler}
                            color="primary"
                        >
                            Login
                        </Button>
                    </div>
                    {(logindisplayText!=="")&&<p className="required_messages">{logindisplayText}</p>}
                </Panel>
                <Panel value={value} index={1}>
                    <TextField label="First Name" required style={{ margin: "5px 0px" }} onChange={handleUserFirstName}/>
                    {isValidated&&!isfirstNameset ?<section className="required_messages">required</section>:null}
                    <TextField label="Last Name" style={{ margin: "5px 0px" }} onChange={handleUserlastName}/>
                    {isValidated&&!IslastNameSet ? <section className="required_messages">required</section>:null}
                    <TextField label="Email" required style={{ margin: "5px 0px" }} onChange={handleEmail}/>
                    {isValidated&&!IsemailSet ? <section className="required_messages">required</section>:null}
                    <TextField className="required_messages" label="Password"  type="password" style={{ margin: "5px 0px" }} onChange={handlePassword}/>
                    {isValidated&&!IspasswordSet ? <section className="required_messages">required</section>:null}
                    <TextField className="required_messages" label="Contact No" style={{ margin: "5px 0px" }} onChange={handlephoneNumber}/>
                    {isValidated&&!IscontactNumberset ? <section className="required_messages">required</section>:null}
                    {success ? (
                        <Typography variant="subtitle1" gutterBottom>                           
                            {displayText}
                        </Typography>
                    ) : null}

                    <div className="form_button">
                        <Button
                            variant="contained"
                            onClick={registerFormHandler}
                            color="primary"
                            style={{ margin: "20px 20px" }}
                        >
                            Register
                        </Button>
                    </div>

                </Panel>
            </Modal>

        </div>
    )

}



export default LoginRegister;