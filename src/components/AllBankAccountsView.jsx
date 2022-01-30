import React, { useState, useEffect } from 'react';
import { colors } from '../colors';
import { mockAccountsList } from '../mockData';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import trash from '../delete.png';
import Header from './Header';

export default function AllBankAccountsView(props) {
    
    const navigate = useNavigate(); 
    const [userBankAccounts, setUserBankAccounts] = useState([]);

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }

    const addHandler = () => {
        navigate('../add-account');
    }

    const deleteHandler = (id) => () => {
        setUserBankAccounts(userBankAccounts.filter(acc => acc.accountNumber !== id))
    }

    useEffect( () => {
        // make api call to grab all users bank accounts
        setUserBankAccounts(mockAccountsList);
    }, []);

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
                        userBankAccounts.map( item =>
                            <div key={item.accountNumber} style={styles.balance}>
                                <div style={{textAlign: 'left'}} >
                                    <span><Link to={`../transactions/${item.accountNumber}`}>{item.name}</Link></span><br/>
                                    <span>Balance: ${item.balance}</span>
                                </div>
                                <img onClick={deleteHandler(item.accountNumber)} src={trash} alt='Delete' width='25px' height='25px'></img>
                            </div>
                        )
                    }
                    <button onClick={addHandler} style={styles.button}>
                        Add Account
                    </button>
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
    },
}