import React from 'react';
import FirstTimeSignedIn from './FirstTimeSignedIn';
import BankManagerHome from './BankManagerHome';
import AllBankAccountsView from './AllBankAccountsView';

export default function LoggedIn(props) {
    const {currentUser, setCurrentUser} = props;
    const globalProps = {currentUser, setCurrentUser}

    if (props.currentUser.newCustomer === true) {
        return <FirstTimeSignedIn {...globalProps} />;
    }
    else if (props.currentUser.role === "MANAGER") {
        return <BankManagerHome {...globalProps} />
    } else {
        return <AllBankAccountsView {...globalProps} />;
    }

}