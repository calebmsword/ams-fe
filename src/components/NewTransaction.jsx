import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../colors';
import logo from '../account-management-system-logo-solid-color.png';
import { mockBankAccountList } from '../mockData';

export default function NewTransaction (props) {
    const navigate = useNavigate();
    const params = useParams();
    const [transactionType, setTransactionType] = useState('');
    const [displayMessage, setDisplayMessage] = useState();
    const [amount, setAmount] = useState(); 
    const [recipient, setRecipient] = useState();
    const [bankAccountList, setBankAccountList] = useState([]);

    const logoutHandler = () => {
        props.setCurrentUser(null);

        //! Check that url is correct!
        navigate('../')
    }

    const handleSubmit = (element) => {
        element.preventDefault();
        navigate(`../transactions/${params.initiatorAccountNumber}`)
    }

    const handleDropdownChange = (element) => {
        setDisplayMessage('');
        setTransactionType(element.target.value);
    }

    const handleRecipientChange = (element) => {
        setDisplayMessage('');
        setRecipient(element.target.value);
    }

    const handleAmountChange = (element) => {
        setDisplayMessage('');
        const value = element.target.validity.valid ? element.target.value : amount;
        setAmount(value);
    }

    useEffect( () => {
        setBankAccountList(mockBankAccountList);
    }, []);

    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                {/*Header*/}
                <div style={styles.header}>
                    <img src={logo} width='200px'/>
                    <a onClick={logoutHandler} href=''>Logout</a>
                </div>

                {/*Content*/}
                <div style={styles.content}>
                    <span><Link to={`../transactions/${params.initiatorAccountNumber}`}>Back</Link></span>
                    <h2>What kind of transaction: </h2>
                    <form
                        style={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <select
                            style={styles.textInput}
                            value={transactionType}
                            onChange={handleDropdownChange}
                        >
                            <option value='' disabled hidden></option>
                            <option value='deposit'>deposit</option>
                            <option value='withdrawal'>withdrawal</option>
                            <option value='transfer'>transfer</option>
                        </select>

                        {
                            transactionType === 'transfer'? 
                                <>
                                    <h2>What account to transfer to:</h2>

                                    <select
                                        style={styles.textInput}
                                        value={recipient}
                                        onChange={handleRecipientChange}
                                    >
                                        <option value='' disabled hidden></option>
                                        {
                                            bankAccountList.map( item => 
                                                <option key={item.accountNumber} value={item.accountName}>
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