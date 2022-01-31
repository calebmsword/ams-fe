import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../colors';
import Header from './Header';
import axios from '../axiosConfig'
import { send } from '@emailjs/browser';

export default function AddLinkedTransaction(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [isSixChar, setIsSixChar] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }

    const handleSubmit = async (element) => {
        element.preventDefault();
        if (!isSixChar) {
            setDisplayMessage(`Entered ${bankAccountNumber.length} digits, but bank account number must be 6 digits.`);
        } else {
            const response = await axios.put(`customer/${props.currentUser.permanentAccountNumber}/${bankAccountNumber}`)
                .catch( e => setDisplayMessage(e.message))
            if (response) {
                const getResponse1 = await axios.get(`bankaccount/${params.initiatorAccountNumber}`)
                    .catch(e => setDisplayMessage(e.message))

                const getResponse2 = await axios.get(`bankaccount/${bankAccountNumber}`)
                    .catch(e => setDisplayMessage(e.message))
                
                if (getResponse1 && getResponse2 && getResponse1.data && getResponse2.data) {
                    send('service_hcjt3tm','template_sb1h2bd', {
                        firstname: getResponse2.data.customer.firstname,
                        nameOther: getResponse1.data.accountName,
                        accountNumberOther: params.initiatorAccountNumber,
                        accountNumber: bankAccountNumber,
                        name: getResponse2.data.accountName,
                        email: getResponse2.data.customer.email,
                    }, 'user_M5Yz7YRms23Z2tK3Aq4XV')

                }
                navigate(`../transactions/${params.initiatorAccountNumber}/new-linked`)
            }
        }
    }

    const handleChange = (element) => {
        setDisplayMessage('');
        const value = element.target.validity.valid ? element.target.value : bankAccountNumber;
        setIsSixChar(value.length === 6);
        setBankAccountNumber(value);
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
                    <span>Enter a Bank Account Number you would like to link: </span>
                    <br/>
                    <form
                        style={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <input
                            style={styles.textInput}
                            type='text'
                            pattern='[0-9]*'
                            value={bankAccountNumber}
                            onChange={handleChange}
                            placeholder='Bank account number'
                        />

                        {
                            bankAccountNumber.length === 6 ? 
                            <input
                                style={styles.button}
                                type='submit'
                                value='Add Account'
                            />
                            :
                                null
                        }

                        {
                            displayMessage ? 
                                <span style={styles.messageWarning}>
                                    {displayMessage}
                                </span>
                            :
                                null
                        }
                        
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