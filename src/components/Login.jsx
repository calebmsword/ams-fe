import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import logo from '../account-management-system-logo-solid-color-dark.jpg';
import { colors } from '../colors';
import { mockUser, mockManager, mockUserVeteran } from '../mockData';

export default function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNotFound, setUserNotFound] = useState(false);

    const loginHandler = /*async*/ (e) => {
        /*axios request*/
        e.preventDefault();
        if (username === 'user' && password === '@Test000') {
            props.setCurrentUser(mockUser);
            navigate('./home');
        }
        else if (username === 'manager' && password === '@Test000') {
            props.setCurrentUser(mockManager);
            navigate('./home');
        } else if (username === 'userveteran' && password === '@Test000') {
            props.setCurrentUser(mockUserVeteran);
            navigate('./home');
        } else {
            setUserNotFound(true);
        }
    }
    
    return (
        <div style={styles.head}>

            <div style={{flex: 1 }}></div>
            
            {/*content*/}
            <div style={styles.content}>
                <img src={logo} style={styles.form}></img>
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }} 
                    onSubmit={loginHandler} 
                >
                    <input
                        style={styles.textInput} 
                        type='text'
                        placeholder='Username' 
                        value={username} 
                        onChange={ (element) => setUsername(element.target.value) }    
                    />
                    <input 
                        style={styles.textInput} 
                        type='password'
                        placeholder='Password' 
                        value={password} 
                        onChange={ (element) => setPassword(element.target.value) }    
                    />
                    <input
                        style={styles.button}
                        type='submit'
                        value='Login'
                    />
                </form>
                {
                    userNotFound ?
                        <span style={styles.messageWarning}>
                            User not found with specified credentials.
                        </span>
                    :
                        null
                }
                <span></span>
             </div>

             <div style={{flex: '1'}}></div>

        </div>
      
    );
}

const styles = {
    head: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.headerBackground,
        height: '100vh',
        padding: '0px 50px',
        width: '50vw',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    form: { 
        width: '200px', 
        marginBottom: '20px' 
    },
    textInput: {
        border: '2px solid '+colors.border,
        padding: '5px 20px',
        borderRadius: '5px',
        marginBottom: '5px',
        fontFamily: 'Montserrat',
    },
    button: {
        width: '50%',
        backgroundColor: colors.buttonBackground,
        color: colors.buttonText,
        fontWeight: 700,
        fontSize: '24px',
        fontFamily: 'Montserrat',
        alignSelf: 'flex-end',
        borderRadius: '5px',
        border: 0,
        padding: 5,
        margin: 5,
    },
    messageWarning: {
        fontSize: '24px',
        fontWeight: 700,
        color: 'red',
    }
}
