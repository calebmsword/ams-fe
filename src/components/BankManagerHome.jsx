import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../colors';
import Header from './Header';

export default function BankManagerHome(props) {
    const navigate = useNavigate();

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }
    
    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
            <Header logoutHandler={logoutHandler} />

                {/*Content*/}
                <div style={styles.content}>
                    <h4>Welcome, {props.currentUser.firstname ? props.currentUser.firstname : 'Insert Manager Name Here'}! What would you like to do?</h4>
                    <br/>
                    <p><Link to='../create-new-customer'>Add New User</Link></p>
                    <p><Link to='../check-pan'>Check PAN Availability</Link></p>
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
        padding: '20px'
    }
}