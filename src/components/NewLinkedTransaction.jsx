import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../colors';
import Header from './Header';

import { mockLinkedBankAccountList } from '../mockData';

export default function NewLinkedTransaction (props) {
    const navigate = useNavigate();
    const params = useParams();
    const [displayMessage, setDisplayMessage] = useState('');
    const [amount, setAmount] = useState(0); 
    const [linkedAccount, setLinkedAccout] = useState();
    const [transactionType, setTransactionType] = useState();
    const [linkedBankAccountList, setLinkedBankAccountList] = useState([]);

    const logoutHandler = () => {
        props.setCurrentUser(null); 

        //! Check that url is correct!
        navigate('../')
    }

    const handleSubmit = (element) => {
        element.preventDefault();
        navigate(`../transactions/${params.initiatorAccountNumber}`)
    }

    const handleTransactionTypeChange = (element) => {
        setDisplayMessage('');
        setTransactionType(element.target.value);
    }

    const handleLinkedAccountChange = (element) => {
        setDisplayMessage('');
        setLinkedAccout(element.target.value);
    }

    const handleAmountChange = (element) => {
        setDisplayMessage('');
        const value = element.target.validity.valid ? element.target.value : amount;
        setAmount(value);
    }

    const addLinkedAccountHandler = () => {
        navigate(`../transactions/${params.initiatorAccountNumber}/add-linked`)
    }

    useEffect( () => {
        setLinkedBankAccountList(mockLinkedBankAccountList);
    }, []);

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
                    
                    <form
                        // style={styles.form}
                        onSubmit={handleSubmit}    
                    >
                        <h2>Choose linked Account:</h2>
                        <select
                            style={styles.textInput}
                            value={linkedAccount}
                            onChange={handleLinkedAccountChange}
                        >
                            <option value='' default hidden />
                            { 
                                linkedBankAccountList.map( item => 
                                    <option key={item.accountNumber}>
                                        {item.accountName}
                                    </option>)
                            }
                        </select>
                        <button 
                            onClick={addLinkedAccountHandler} 
                            style={styles.button}>
                            Add Linked Account
                        </button>

                        <h2>Choose transaction type</h2>
                        <select
                            style={styles.textInput}
                            value={transactionType}
                            onChange={handleTransactionTypeChange}
                        >
                            <option value='' default hidden />
                            <option value='deposit'>deposit</option>
                            <option value='withdrawal'>withdrawal</option>
                        </select>
                        
                        {
                            transactionType ? 
                                <>
                                    <input
                                        style={styles.textInput}
                                        type='text'
                                        pattern='[0-9]*'
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
                            <>
                                <span style={styles.messageWarning}>Transaction failed:</span>
                                <span style={styles.message}>{displayMessage}</span>
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