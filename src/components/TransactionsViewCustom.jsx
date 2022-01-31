import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { colors } from '../colors';
import { parseDatime } from '../utils';
import Header from './Header';
import axios from '../axiosConfig';
import DaySelect from './DOBDaySelect';
import MonthSelect from './DOBMonthSelect';
import { CSVLink } from 'react-csv';

export default function TransactionsViewCustom (props) {
    const navigate = useNavigate();
    const params = useParams();
    const [transactions, setTransactions] = useState([]);
    const [bankAccount, setBankAccount] = useState({});
    const [errorFindingTransactions, setErrorFindingTransactions] = useState('')
    const [dateADay, setDateADay] = useState('')
    const [dateAMonth, setDateAMonth] = useState('')
    const [dateAYear, setDateAYear] = useState('')
    const [dateBDay, setDateBDay] = useState('')
    const [dateBMonth, setDateBMonth] = useState('')
    const [dateBYear, setDateBYear] = useState('')

    const sortByDate = (a, b) => {
        if (b.datimeOfTransaction > a.datimeOfTransaction) {
            return 1
        } 
        else if (b.datimeOfTransaction < a.datimeOfTransaction) {
            return -1
        }
        else {
            return 0
        }
    }

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../../')
    }

    const onDateSubmitHandler = async (element) => {
        element.preventDefault()
        const dateA = +new Date(`${dateAMonth} ${dateADay}, ${dateAYear}`);
        const dateB = +new Date(`${dateBMonth} ${dateBDay}, ${dateBYear}`);

        const response = await axios.get(`transaction/window/${dateA}/${dateB}`)
            .catch( e => setErrorFindingTransactions(e.message))

        if(response && response.data) {
            setTransactions(response.data.sort(sortByDate))
        }
    }

    useEffect( () => {
        ( async () => {
            // const responseTransaction = await axios.get(`transaction/byaccount/${params.initiatorAccountNumber}`)
            //     .catch( (e) => setErrorFindingTransactions(e.message)
            // )

            // setTransactions(responseTransaction.data.sort(sortByDate));

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
                    <span><Link to={`../transactions/${params.initiatorAccountNumber}`}>Back</Link></span>
                    <br/>
                    <span>{bankAccount.accountName} (#{bankAccount.accountNumber})</span>
                    <h2> Choose Date Window: </h2>

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
                    
                    <form onSubmit={onDateSubmitHandler}>
                        <span>Date 1:</span>
                        <MonthSelect 
                            style={styles.formInput} 
                            dateOfBirthMonth={dateAMonth}
                            setDateOfBirthMonth={setDateAMonth}
                        />
                        <DaySelect 
                            style={styles.formInput} 
                            dateOfBirthDay={dateADay}
                            setDateOfBirthDay={setDateADay}
                            dateOfBirthMonth={dateAMonth}
                        />
                        <input
                            style={styles.formInput}
                            type='number'
                            value={dateAYear}
                            placeholder='year'
                            onChange={ (element) => setDateAYear(element.target.value) }
                        />
                        <br/>
                        <span>Date 2:</span>
                        <MonthSelect 
                            style={styles.formInput} 
                            dateOfBirthMonth={dateBMonth}
                            setDateOfBirthMonth={setDateBMonth}
                        />
                        <DaySelect 
                            style={styles.formInput} 
                            dateOfBirthDay={dateBDay}
                            setDateOfBirthDay={setDateBDay}
                            dateOfBirthMonth={dateBMonth}
                        />
                        <input
                            style={styles.formInput}
                            type='number'
                            value={dateBYear}
                            placeholder='year'
                            onChange={ (element) => setDateBYear(element.target.value) }
                        />
                        <input
                            style={styles.button} 
                            type='submit'
                            value='Filter'
                        />
                    </form>
                    

                    {   
                        transactions.length > 0 && !errorFindingTransactions ? 
                            <>
                                <h2>Transactions:</h2>
                                <CSVLink data={transactions}>Download Transactions</CSVLink>
                                {
                                    transactions.map(item => {

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
    },
    formInput: {
        border: '2px solid #030202',
        padding: '5px 20px',
        borderRadius: '5px',
        marginBottom: '5px',
        fontFamily: 'Montserrat',
    },
}