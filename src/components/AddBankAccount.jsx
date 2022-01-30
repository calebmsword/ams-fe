import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../colors';
import Header from './Header';

export default function (props) {
    const navigate = useNavigate();
    const [accountName, setAccountName] = useState();
    const [displayMessage, setDisplayMessage] = useState();

    const logoutHandler = () => {
        props.setCurrentUser(null);

        //! Check that url is correct!
        navigate('../')
    }

    const handleSubmit = (element) => {
        element.preventDefault();
        if (accountName==='test') {
            setDisplayMessage('Chosen account name is not allowed. Please enter another name.')
        }
        else {
            navigate('../home')
        }
    }

    const handleChange = (element) => {
        setDisplayMessage('');
        setAccountName(element.target.value);
    }

    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler}/>

                {/*Content*/}
                <div style={styles.content}>
                    <br/>
                    <span><Link to='../home'>Back</Link></span>
                    <h2>Enter new account name: </h2>
                    <form
                        style={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <input
                            style={styles.textInput}
                            type='text'
                            value={accountName}
                            onChange={handleChange}
                            placeholder='New account name'
                        />
                        <input
                            style={styles.button}
                            type='submit'
                            value='Create New Account'
                        />
                    </form>
                    {
                        displayMessage ?
                            <span>
                                <span style={styles.messageWarning}>Add account failed:</span><br/>
                                <span style={styles.message}>{displayMessage}</span>
                            </span>
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
    },
    header: {
        backgroundColor: colors.headerBackground,
        width: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between'
    },
    form: { 
        width: '200px', 
        marginBottom: '20px' 
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
        fontSize: '24px',
        fontWeight: 700,
        color: 'red',
        padding: '10px'
    },
    message: {
        fontSize: '24px',
        fontWeight: 700,
        padding: '10px',
    },
}