import React, { useState, useEffect } from 'react';
import { colors } from '../colors';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import trash from '../delete.png';
import Header from './Header';
import axios from '../axiosConfig';

export default function AllBankAccountsView(props) {
    
    const navigate = useNavigate(); 
    const [userBankAccounts, setUserBankAccounts] = useState([]);
    const [displayMessage, setDisplayMessage] = useState('')

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }

    const addHandler = () => {
        navigate('../add-account');
    }

    const deleteHandler = (id) => async () => {
        const response = await axios.delete(`bankaccount/${id}`)
            .catch( e => setDisplayMessage(e.message))
        if (response) {
            setDisplayMessage('')
            const response_get = await axios.get(`bankaccount/bypan/${props.currentUser.permanentAccountNumber}`);
            setUserBankAccounts(response_get.data)
        }
    }

    // I get warnings on compilation if I make useEffect callback async
    // I get warnings props.currentUser.permanentAccountNumber is not in dependency array
    useEffect( () => {
        (async () => {
            const response = await axios.get(`bankaccount/bypan/${props.currentUser.permanentAccountNumber}`);
            setUserBankAccounts(response.data)
        })()
    },[props.currentUser, displayMessage]);

    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler}/>
                
                {/*Content*/}
                <div style={styles.content}>
                    <h3>Hi {props.currentUser.firstname}! Here are your bank Accounts:</h3>
                    {
                        userBankAccounts.map( item => {
                            return (
                                <div key={item.accountNumber} style={styles.balance}>
                                    <div style={{textAlign: 'left'}} >
                                        <span style={{color:'black'}}><Link to={`../transactions/${item.accountNumber}`}>{item.accountName}</Link> (#{item.accountNumber})</span><br/>
                                        <span>Balance: ${(Math.round(item.balance*100)/100).toFixed(2)}</span>
                                    </div>
                                    <img onClick={deleteHandler(item.accountNumber)} src={trash} alt='Delete' width='25px' height='25px'></img>
                                </div>
                            );
                        }
                            
                        )
                    }
                    <button onClick={addHandler} style={styles.button}>
                        Add Account
                    </button>
                    {
                        displayMessage ?
                            <>
                                <span style={styles.messageWarning}>Delete failed:</span>
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
    button: {
        width: '50%',
        backgroundColor: colors.buttonBackground,
        color: colors.buttonText,
        fontWeight: 700,
        fontSize: '24px',
        fontFamily: 'Montserrat',
        // alignSelf: 'flex-end',
        borderRadius: '5px',
        border: 0,
        padding: 5,
        marginTop: '20px',
        margin: 5,
    },
    balance: {
        backgroundColor: colors.listBackground,
        borderRadius: '5px',
        width: '75%',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        alignItems: 'stretch',
        marginTop: '20px',
        justifyContent: 'space-between'
    },
    messageWarning: {
        fontSize: '24px',
        fontWeight: 700,
        color: 'red',
    },
    message: {
        fontSize: '24px',
        fontWeight: 700,
    }
}