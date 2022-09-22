import React, { useState } from 'react';
import {
    Button,
    Tab,
    Tabs,
    TextField,
    Typography,
    FormControl,
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
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [contactNumber, setcontactNumber] = useState("");


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
        setLogin(false);
        setSuccess(true);

        console.log(registerform);
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
                    <section className="required_messages">required</section>
                    <TextField label="Last Name" style={{ margin: "5px 0px" }} onChange={handleUserlastName}/>
                    <section className="required_messages">required</section>
                    <TextField label="Email" required style={{ margin: "5px 0px" }} onChange={handleEmail}/>
                    <section className="required_messages">required</section>
                    <TextField className="required_messages" label="Password"  type="password" style={{ margin: "5px 0px" }} onChange={handlePassword}/>
                    <section className="required_messages">required</section>
                    <TextField className="required_messages" label="Contact No" style={{ margin: "5px 0px" }} onChange={handlephoneNumber}/>
                    <section className="required_messages">required</section>
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