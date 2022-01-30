import React, { useState, useEffect } from 'react';
import { mockAccountsList, mockRecentTransaction } from '../mockData';
import { colors } from '../colors';
import { parseDatime } from '../utils';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

export default function Transactions(props) {
    const navigate = useNavigate();
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [bankAccount, setBankAccount] = useState({});

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }
    
    const exportHandler = (element) => {
        console.log('export functionality will be handled in the future! :)');
        element.preventDefault();
    }

    const clickHandlerA = () => {
        navigate('new');
    }

    const clickHandlerB = () => {
        navigate('new-linked');
    }

    useEffect( () => {
        // use api call to get recent transactions
        setRecentTransactions(mockRecentTransaction);

        // use useParams hook to call bankAccount by ID in url to get current bank account
        setBankAccount(mockAccountsList[0]);
    }, []);
    
    console.log('bankAccount is: \n',bankAccount, 'mockAccountsList[0] is: \n',mockAccountsList[0])
    return (
        <div style={styles.head}>

            <div style={{ flex: 1 }}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler} />

                {/*Content*/}
                <div style={styles.content}> 
                    <br/>
                    <span><Link to='../home'>Back</Link></span>
                    <br/>
                    <span>{bankAccount.name} ({bankAccount.accountNumber})</span>
                    <span>Current balance: {bankAccount.balance}</span>
                    <br/>

                    <button 
                        style={styles.button} 
                        onClick={clickHandlerA}>
                        Make transaction
                    </button>

                    <button 
                        style={styles.button} 
                        onClick={clickHandlerB}>
                        Transfer to other user's account
                    </button>
                    <br/>
                    <span>Recent Transactions: </span>
                    {
                        recentTransactions.map(item => 
                            <div key={item.id} style={styles.balance}>
                                <p>{item.transactionType} ${item.amount} {item.transactionType === "DEPOSIT" ? "TO" : "FROM"} {item.recipientAccountName}; {parseDatime(item.datimeOfTransaction)}</p>
                            </div>
                        )
                    }
                    <form onSubmit={exportHandler}>
                        <input
                            style={styles.button}
                            type='submit'
                            value='Export Transactions as CSV'
                        />
                    </form>
                </div>

            </div>

            <div style={{ flex: 1 }}></div>

        </div>);
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
        minHeight: '100vh',
        minWidth: '50vw',
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
    content: {
        color: colors.contentText,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        // width: '50%',
        backgroundColor: colors.buttonBackground,
        color: colors.buttonText,
        fontWeight: 700,
        fontSize: '24px',
        fontFamily: 'Montserrat',
        // alignSelf: 'flex-end',
        borderRadius: '5px',
        border: 0,
        padding: 5,
        margin: 5,
    },
    balance: {
        backgroundColor: colors.listBackground,
        borderRadius: '5px',
        width: '75%',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        alignItems: 'flex-start',
        marginTop: '20px',
    }
}