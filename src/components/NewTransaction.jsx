import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../colors';
import Header from './Header';
import axios from '../axiosConfig';

export default function NewTransaction (props) {
    const navigate = useNavigate();
    const params = useParams();
    const [transactionType, setTransactionType] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');
    const [amount, setAmount] = useState(''); 
    const [recipient, setRecipient] = useState(0);
    const [bankAccountList, setBankAccountList] = useState([]);

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }

    const handleSubmit = async (element) => {
        element.preventDefault();
        
        const getResponse = await axios.get(`bankaccount/${params.initiatorAccountNumber}`)
            .catch( e => setDisplayMessage(e.message))
        
        const bankAccountResponse = await axios.get(`bankaccount/${recipient}`)
            .catch( e => setDisplayMessage(e.message))

        if (bankAccountResponse && getResponse) {
            const bankAccount = bankAccountResponse.data;
            const postResponse = await axios.post(`transaction`, {
                initiatorAccountName: getResponse.data.accountName,
                datimeOfTransaction: Date.now(),
                transactionType: transactionType,
                amount: amount,
                recipientAccountNumber: bankAccount.accountNumber,
                recipientAccountName: bankAccount.accountName,
                initiatorAccount: getResponse.data
            }).catch( e => setDisplayMessage(e.message))
            
            if (postResponse) {
                navigate(`../transactions/${params.initiatorAccountNumber}`)
            }
        }   
        
    }

    const handleDropdownChange = (element) => {
        setDisplayMessage('');
        setTransactionType(element.target.value);
    }

    const handleRecipientChange = (element) => {
        setDisplayMessage('');
        setRecipient(element.target.value)
    }

    const handleAmountChange = (element) => {
        setDisplayMessage('');
        const value = element.target.validity.valid ? element.target.value : amount;
        setAmount(value);
    }

    useEffect( () => {
        ( async () => {
            const response = await axios.get(`bankaccount/bypan/${props.currentUser.permanentAccountNumber}`)
                    .catch( e => setDisplayMessage(e.message))
            if (response) {
                setBankAccountList(response.data.filter(bankAccount => 
                    bankAccount.accountNumber !== +params.initiatorAccountNumber
                ))
            }
        })()
    }, [params.initiatorAccountNumber, props.currentUser])

    useEffect( () => {
        (async () => {
            const recipientResponse = await axios.get(`bankaccount/${params.initiatorAccountNumber}`)
                .catch( e => setDisplayMessage(e.message))
            if (recipientResponse) {
                setRecipient(recipientResponse.data.accountNumber)
            }  
        })()
    }, [params.initiatorAccountNumber]);

    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler} />

                {/*Content*/}
                <div style={styles.content}>
                    <br/>
                    <span><Link to={`../transactions/${params.initiatorAccountNumber}`}>Back</Link></span>
                    <h2>What kind of transaction: </h2>
                    <form
                        // style={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <select
                            style={styles.textInput}
                            value={transactionType}
                            onChange={handleDropdownChange}
                        >
                            <option value='' disabled hidden></option>
                            <option value='DEPOSIT'>deposit</option>
                            <option value='WITHDRAWAL'>withdrawal</option>
                            {
                                bankAccountList.length > 0 ?
                                    <option value='TRANSFER'>transfer</option>
                                :
                                    null
                            }
                            
                        </select>

                        {
                            transactionType === 'TRANSFER' && bankAccountList.length > 0 ?
                                <>
                                    <h2>What account to transfer to:</h2>

                                    <select
                                        style={styles.textInput}
                                        value={recipient}
                                        onChange={handleRecipientChange}
                                    >
                                        <option value='' default hidden>Choose Account</option>
                                        {
                                            bankAccountList.map(item => 
                                                <option key={item.accountNumber} value={item.accountNumber}>
                                                    {item.accountName}
                                                </option>
                                            )
                                        }
                                    </select>
                                    <br/>
                                </>
                            :
                                null
                        }
                        
                        {
                            transactionType ? 
                                <>
                                    <input
                                        style={styles.textInput}
                                        type='text'
                                        pattern='(^[0-9]*)|([0-9]*.)|([0-9]*.[0-9])|([0-9]*.[0-9][0-9])'
                                        value={amount}
                                        onChange={handleAmountChange}
                                        placeholder='amount'
                                    />
                                    <input
                                        style={styles.button}
                                        type='submit'
                                        value='Submit Transaction'
                                    />
                                </>
                                
                            :
                                null
                        }
                        
                    </form>

                    {
                        displayMessage ?
                            <span>
                                <span style={styles.messageWarning}>Transaction failed:</span><br/>
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
        padding: '10px'
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