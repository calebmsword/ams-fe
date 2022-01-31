import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../colors';
import Header from './Header';
import axios from '../axiosConfig';

export default function CheckPANAvailability(props) {
    const navigate = useNavigate();
    const [pan, setPan] = useState('');
    const [isTenChar, setIsTenChar] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }

    const handleSubmit = async (element) => {
        element.preventDefault();
        if (!isTenChar) {
            setDisplayMessage(`Entered ${pan.length} digits, but PAN must be 10 digits.`);
            
        } else {
            const response = await axios.get(`customer/${pan}`)
                .catch( () => setDisplayMessage('PAN available!'))
            if (response) {
                setDisplayMessage('PAN already taken')
            }
        }
    }

    const handleChange = (element) => {
        setDisplayMessage('');
        const value = element.target.validity.valid ? element.target.value : pan;
        setIsTenChar(value.length === 10);
        setPan(value);
    }
    
    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler} />

                {/*Content*/}
                <div style={styles.content}>
                    <br/>
                    <span><Link to='../home'>Back</Link></span>
                    <br/>
                    <span>Enter a Personal Account Number you would like to check: </span>
                    <br/>
                    <form
                        style={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <input
                            style={styles.textInput}
                            type='text'
                            pattern='[0-9]*'
                            value={pan}
                            onChange={handleChange}
                            placeholder='Personal account number'
                        />
                        {
                            displayMessage ? 
                                <span style={styles.message}>
                                    {displayMessage}
                                </span>
                            :
                                null
                        }
                        <br/>
                        <input
                            style={styles.button}
                            type='submit'
                            value='Check PAN'
                        />
                    </form>
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
        padding: '10px',
    },
    header: {
        backgroundColor: colors.headerBackground,
        width: '100%',
        color: 'white',
        display: 'flex',
        alignItems: 'space-between',
        justifyContent: 'space-between'
    },
    content: {
        color: colors.contentText,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    message: {
        fontSize: '24px',
        fontWeight: 700,
    },
    messageWarning: {
        fontSize: '24px',
        fontWeight: 700,
        color: 'red',
    }
}