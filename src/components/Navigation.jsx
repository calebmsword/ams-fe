import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import Login from './Login';
import LoggedIn from './LoggedIn';
import TransactionsView from './TransactionsView'
import CreateNewCustomer from './CreateNewCustomer';
import CheckPANAvailability from './CheckPANAvailability';
import AddBankAccount from './AddBankAccount';
import NewTransaction from './NewTransaction';
import NewLinkedTransaction from './NewLinkedTransaction';
import AddLinkedTransaction from './AddLinkedTransaction';
import TransactionsViewCustom from './TransactionsViewCustom';

export default function Navigation() {

    // pass these in order to have a global user state
    const [currentUser, setCurrentUser] = useState();
    const globalProps = { currentUser, setCurrentUser};

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login {...globalProps} />} />
                <Route path='/home' element={<LoggedIn {...globalProps} />} />
                <Route path='/transactions/:initiatorAccountNumber' element={<TransactionsView {...globalProps} />} />
                <Route path='/transactions/:initiatorAccountNumber/new' element={<NewTransaction {...globalProps} />} />
                <Route path='/transactions/:initiatorAccountNumber/new-linked' element={<NewLinkedTransaction {...globalProps} />} />
                <Route path='/transactions/:initiatorAccountNumber/add-linked' element={<AddLinkedTransaction {...globalProps} />} />
                <Route path='/transactions/:initiatorAccountNumber/custom' element={<TransactionsViewCustom {...globalProps} />} />
                <Route path='/add-account' element={<AddBankAccount {...globalProps} />} />
                <Route path='/create-new-customer' element={<CreateNewCustomer {...globalProps} />} />
                <Route path='/check-pan' element={<CheckPANAvailability {...globalProps} />} />
            </Routes>
        </BrowserRouter>
    );
}