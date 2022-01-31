import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../colors';
import { parseDatime } from '../utils';
import Header from './Header';
import axios from '../axiosConfig';

export default function TransactionsView(props) {
    const navigate = useNavigate();
    const params = useParams();
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [bankAccount, setBankAccount] = useState({});
    const [errorFindingTransactions, setErrorFindingTransactions] = useState('')

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
        ( async () => {
            const responseTransaction = await axios.get(`transaction/byaccount/${params.initiatorAccountNumber}`)
                .catch( (e) => setErrorFindingTransactions(e.message)
            )

            setRecentTransactions(
                responseTransaction.data.sort( (a, b) => {
                    if (b.datimeOfTransaction > a.datimeOfTransaction) {
                        return 1
                    } 
                    else if (b.datimeOfTransaction < a.datimeOfTransaction) {
                        return -1
                    }
                    else {
                        return 0
                    }
                }).slice(0,5)
            );

            const responseBankAccount = await axios.get(`bankaccount/${params.initiatorAccountNumber}`)
                .catch( (e) => setErrorFindingTransactions(e.message)
            )
            setBankAccount(responseBankAccount.data);
            
        })()
    }, [params.initiatorAccountNumber]);
    
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
                    <span>{bankAccount.accountName} (#{bankAccount.accountNumber})</span>
                    <span style={{fontSize:'24px',color:'white',paddingTop:'10px'}}>Current balance: ${(Math.round(bankAccount.balance*100)/100).toFixed(2)}</span>
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
                    {
                        errorFindingTransactions ?
                            <>
                                <span style={styles.messageWarning}>Error finding transactions:</span>
                                <span style={styles.message}>{errorFindingTransactions}</span>
                                <span style={styles.message}>Come back and try again once we fix our servers!</span>
                            </>
                        :
                            null
                    }

                    {   
                        recentTransactions.length > 0 && !errorFindingTransactions ? 
                            <>
                                <span>Recent Transactions: </span>
                                {
                                    recentTransactions.map(item => {

                                        let message = `${item.transactionType} $${(Math.round(item.amount*100)/100).toFixed(2)}`;

                                        if (item.transactionType === 'TRANSFER') {
                                            message += ` FROM ${item.initiatorAccountName} TO ${item.recipientAccountName}`
                                        }

                                        return (
                                            <div key={item.id} style={styles.balance}>
                                                <span>{message}</span>
                                                <span style={{color:'black',fontSize:'12px'}}> {parseDatime(item.datimeOfTransaction)}</span>
                                            </div>
                                        );
                                    })
                                }
                                <br/>
                                <form onSubmit={exportHandler}>
                                    <input
                                        style={styles.button}
                                        type='submit'
                                        value='Export Transactions as CSV'
                                    />
                                </form>
                            </>
                            
                        :
                            null
                    }
                    
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
    },
    message: {
        fontSize: '18px',
        fontWeight: 700,
    },
    messageWarning: {
        fontSize: '24px',
        fontWeight: 700,
        color: 'red',
    }
}