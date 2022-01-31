import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { colors } from '../colors';
import logo from '../account-management-system-logo-solid-color-dark-zoomedout.jpg';
import axios from '../axiosConfig';

export default function FirstTimeSignedIn(props) {
    
    const navigate = useNavigate();
    const [newPasswordA, setNewPasswordA] = useState('');
    const [newPasswordB, setNewPasswordB] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [passwordIsValidLength, setPasswordIsValidLength] = useState(false);
    const [passwordContainsNumber, setPasswordContainsNumber] = useState(false);
    const [passwordContainsUpperCaseAndLowercase, setPasswordContainsUpperCaseAndLowerCase] = useState(false);
    const [passwordContainsSpecialCharacters, setPasswordContainsSpecialCharacters] = useState(false);
    const [displayMessage, setDisplayMessage] = useState('');

    const changePasswordHandler = async (element) => {
        element.preventDefault();
        const passwordValid = passwordsMatch && 
            passwordIsValidLength && 
            passwordContainsNumber && 
            passwordContainsUpperCaseAndLowercase && 
            passwordContainsSpecialCharacters;
        if (passwordValid) {

            const currentUser = props.currentUser;

            console.log({
                ...currentUser,
                password: newPasswordA,
                newCustomer: false,
            })

            const response = await axios.put(`customer`, {
                ...currentUser,
                password: newPasswordA,
                newCustomer: false,
            })
                .catch( e => setDisplayMessage(e.message))

            if (response) {
                props.setCurrentUser({...props.currentUser, newCustomer: 'false'})
                navigate('../home');
            }
        }
    }

    useEffect( () => {
        setPasswordsMatch(newPasswordA === newPasswordB && newPasswordA.length > 0 && newPasswordB.length > 0);
        setPasswordIsValidLength( newPasswordA.length >= 8);
        setPasswordContainsNumber( 
            /[0-9]/.test(newPasswordA) && 
            newPasswordA.length > 0
        );
        setPasswordContainsUpperCaseAndLowerCase(
            /[a-z]/.test(newPasswordA) && 
            /[A-Z]/.test(newPasswordA) && 
            newPasswordA.length > 0
        );
        setPasswordContainsSpecialCharacters( 
            /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPasswordA) &&
            newPasswordA.length > 0
        );
    
    }, [newPasswordA, newPasswordB]);
    
    return (

        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                {/*Header*/}
                <div style={styles.header}>
                    <img alt='logo' src={logo} width='200px'/>
                </div>

                {/*Content*/}
                <div style={styles.content}>
                    <p>Signed in with temporary password. Please create new password.</p>
                    <form onSubmit={changePasswordHandler} className='ChangePassword'>
                        <input
                            style={styles.textInput}
                            type='password'
                            placeholder='New password'
                            value={newPasswordA}
                            onChange={ (element) => setNewPasswordA(element.target.value) }
                        />
                        <input
                            style={styles.textInput}
                            type='password'
                            placeholder='Re-enter new password'
                            value={newPasswordB}
                            onChange={ (element) => setNewPasswordB(element.target.value) }
                        />
                            <br/><br/><span style={ passwordIsValidLength ? styles.message : styles.messageWarning}>  
                                Password {!passwordIsValidLength ? 'must contain' : 'contains'} at least 8 characters 
                            </span><br/>
                            <br/><span style={ passwordContainsUpperCaseAndLowercase ? styles.message : styles.messageWarning}> 
                                Password {!passwordContainsUpperCaseAndLowercase ? 'must contain' : 'contains'} at least one uppercase and lowercase character
                            </span><br/>
                            <br/><span style={ passwordContainsNumber ? styles.message : styles.messageWarning}> 
                                Password {!passwordContainsNumber ? 'must contain' : 'contains'} at least one number 
                            </span><br/>
                            <br/><span style={ passwordContainsSpecialCharacters ? styles.message : styles.messageWarning}> 
                                Password {!passwordContainsSpecialCharacters ? 'must contain' : 'contains'} special characters
                            </span><br/>
                            <br/><span style={ passwordsMatch ? styles.message : styles.messageWarning}> 
                                Passwords {!passwordsMatch ? 'must match' : 'match'} 
                            </span><br/><br/>
                        <input
                            style={styles.button}
                            type='submit'
                            value='Change Password'
                        />
                    </form>

                    {
                        displayMessage ?
                            <>
                                <span style={styles.messageWarning}>Change Password Failed:</span>
                                <span style={styles.messageNotGreen}>{displayMessage}</span>
                            </>
                        :
                            null
                    }

                </div>
            </div>
            
            {/*Right gray background*/}
            <div style={{flex:1}}></div>

        </div>

    );
}

const styles = {
    head: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    middle: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colors.contentBackground,
        height: '100vh',
        width: '50vw',
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        padding: '10px'
    },
    header: {
        backgroundColor: colors.headerBackground,
        width: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between',
        padding: '10px',
    },
    content: {
        color: colors.contentText,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textInput: {
        border: '2px solid '+colors.border,
        padding: '5px 20px',
        borderRadius: '5px',
        marginBottom: '5px',
        fontFamily: 'Montserrat',
    },
    button: {
        // width: '50%',
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
        fontSize: '12px',
        fontWeight: 700,
        color: 'red',
    },
    message: {
        fontSize: '12px',
        fontWeight: 700,
        color: 'green',
    },
    messageNotGreen: {
        fontSize: '12px',
        fontWeight: 700,
    }
}