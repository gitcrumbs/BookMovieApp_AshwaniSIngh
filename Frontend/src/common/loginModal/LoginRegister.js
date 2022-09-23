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

const LoginRegister = ({loginClick}) => {

    

    const [loginOpen, setLoginOpen] = useState(loginClick);
    const [value, setValue] = useState(0);
    const [login, setLogin] = useState(true);
    const [success, setSuccess] = useState(false);

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
    


    const registerform = {
        
        firstName,
        lastName ,
        email,
        password,
        contactNumber                      
    }


    const loginHandler = () => {
        setLoginOpen(true);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const loginFormHandler = () => {
        setLogin(false);
        setLoginOpen(false);
    };

    const registerFormHandler = () => {
    
        for (const item in registerform){

             switch (item) {
                case 'firstName':
                    setisfirstNameset(item==='firstName'&&registerform[item]==='');
                    break;
                case 'lastName':
                    setlastNameSet(item==='lastName'&&registerform[item]==='');
                    break;    
                case 'email':
                    setemailSet(item==='email'&&registerform[item]==='');
                    break;
                case 'password':
                    setpasswordSet(item==='password'&&registerform[item]==='');
                    break;
                 case 'contactNumber':
                    setIscontactNumberset(item==='contactNumber'&&registerform[item]==='');
                    break;

                default:
                    break;
             }
                     
            
        }

        const finalSet = [isfirstNameset,IslastNameSet,IsemailSet,IspasswordSet,IscontactNumberset]

        setSuccess(finalSet.includes(true))       
        
    };


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


    return (

        <div id='modal_content'>
            <Modal
                isOpen={loginOpen}
                ariaHideApp={false}
                id="login_modal"
            >
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Login" />
                    <Tab label="Register" />
                </Tabs>
                <Panel value={value} index={0}>
                    <TextField label="Username" required style={{ margin: "5px 0px" }}  
                   />
                    <TextField
                        label="Password"
                        required
                        type="password"
                        style={{ margin: "5px 0px" }}
                    />
                    <div className="form_button">
                        <Button id="btn_login"
                            variant="contained"
                            onClick={loginFormHandler}
                            color="primary"
                        >
                            Login
                        </Button>
                    </div>

                </Panel>
                <Panel value={value} index={1}>
                    <TextField label="First Name" required style={{ margin: "5px 0px" }} onChange={handleUserFirstName}/>
                    {isfirstNameset ?<section className="required_messages">required</section>:null}
                    <TextField label="Last Name" style={{ margin: "5px 0px" }} onChange={handleUserlastName}/>
                    {IslastNameSet ? <section className="required_messages">required</section>:null}
                    <TextField label="Email" required style={{ margin: "5px 0px" }} onChange={handleEmail}/>
                    {IsemailSet ? <section className="required_messages">required</section>:null}
                    <TextField className="required_messages" label="Password"  type="password" style={{ margin: "5px 0px" }} onChange={handlePassword}/>
                    {IspasswordSet ? <section className="required_messages">required</section>:null}
                    <TextField className="required_messages" label="Contact No" style={{ margin: "5px 0px" }} onChange={handlephoneNumber}/>
                    {IscontactNumberset ? <section className="required_messages">required</section>:null}
                    {success ? (
                        <Typography variant="subtitle1" gutterBottom>
                            Registration Successful. Please login!
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