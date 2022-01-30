export const mockRecentTransaction = [
    {
        id: 1, 
        initiatorAccountNumber: 1234567890, 
        initiatorAccountName: 'Savings',
        datimeOfTransaction: Date.now(), 
        amount: 9000.01,
        transactionType: 'DEPOSIT',
        recipientAccountNumber: 1234567890,
        recipientAccountName: "Savings"
    },
    {
        id: 2, 
        initiatorAccountNumber: 1234567890, 
        initiatorAccountName: 'Checking',
        datimeOfTransaction: Date.now(), 
        amount: 420.69,
        transactionType: 'WITHDRAWAL',
        recipientAccountNumber: 2345678901,
        recipientAccountName: "Checking"
    },
    {
        id: 3, 
        initiatorAccountNumber: 1234567890,
        initiatorAccountName: 'Checking', 
        datimeOfTransaction: Date.now(), 
        amount: 420.69,
        transactionType: 'TRANSFER', 
        recipientAccountNumber: 3456789012, 
        recipientAccountName: 'Dad\'s Checking Account'
    },
    {
        id: 4, 
        initiatorAccountNumber: 1234567890, 
        initiatorAccountName: 'Checking',
        datimeOfTransaction: Date.now(), 
        amount: 420.69,
        transactionType: 'TRANSFER',  
        recipientAccountNumber: 1234567890, 
        recipientAccountName: 'Savings'
    },
    {
        id: 5, 
        initiatorAccountNumber: 2345678901, 
        initiatorAccountName: 'Savings',
        datimeOfTransaction: Date.now(), 
        amount: 420.69,
        transactionType: 'TRANSFER',  
        recipientAccountNumber: 1234567890, 
        recipientAccountName: 'Checking'
    },               
]

export const mockAccountsList = [
    {accountNumber: 1234567890, name: "Checking", balance: 420.69},
    {accountNumber: 2345678901, name: "Savings", balance: -2}
]

export const mockUser = {
    "permanentAccountNumber": 1,
    "loginId": 'user',
    "password": '@Test000',
    "role": 'USER',
    "firstname": 'Caleb',
    "lastname": 'Sword',
    "uniqueIdentifier": null,
    "email": 'BigmouthCreator@gmail.com',
    "birthDay": 31,
    "birthMonth": 'May',
    "birthYear": 1995,
    "street": '871 Fisher Rd.',
    "city": 'Grosse Pointe',
    "state": 'Michigan',
    "areaCode": 48230,
    "bankAccount": null,
    "linkedAccounts": null,
    "newCustomer": true
}

export const mockUserVeteran = {
    "permanentAccountNumber": 1,
    "loginId": 'user',
    "password": '@Test000',
    "role": 'USER',
    "firstname": 'Caleb',
    "lastname": 'Sword',
    "uniqueIdentifier": null,
    "email": 'BigmouthCreator@gmail.com',
    "birthDay": 31,
    "birthMonth": 'May',
    "birthYear": 1995,
    "street": '871 Fisher Rd.',
    "city": 'Grosse Pointe',
    "state": 'Michigan',
    "areaCode": 48230,
    "bankAccount": null,
    "linkedAccounts": null,
    "newCustomer": false
}

export const mockManager = {
    "permanentAccountNumber": 2,
    "loginId": 'manager',
    "password": '@Test000',
    "role": 'MANAGER',
    "firstname": 'Caleb',
    "lastname": 'Sword',
    "uniqueIdentifier": null,
    "email": 'BigmouthCreator@gmail.com',
    "birthDay": 31,
    "birthMonth": 'May',
    "birthYear": 1995,
    "street": '871 Fisher Rd.',
    "city": 'Grosse Pointe',
    "state": 'Michigan',
    "areaCode": 48230,
    "bankAccount": null,
    "linkedAccounts": null,
    "newCustomer": false
}

export const mockBankAccountList = [
    {
        "accountNumber": 2,
        "accountName": 'Savings',
        "balance": 420.69,
        "customer": {
            "permanentAccountNumber": 1,
            "loginId": null,
            "password": null,
            "role": null,
            "firstname": null,
            "lastname": null,
            "uniqueIdentifier": null,
            "email": null,
            "birthDay": 0,
            "birthMonth": null,
            "birthYear": 0,
            "street": null,
            "city": null,
            "state": null,
            "areaCode": null,
            "bankAccount": null,
            "linkedAccounts": null,
            "newCustomer": false
        },
        "transactionList": null,
        "linkedCustomer": null
    }
]

export const mockLinkedBankAccountList = [
    {
        "accountNumber": 3,
        "accountName": 'Dad\'s Checking Account',
        "balance": 420.69,
        "customer": {
            "permanentAccountNumber": 1,
            "loginId": null,
            "password": null,
            "role": null,
            "firstname": null,
            "lastname": null,
            "uniqueIdentifier": null,
            "email": null,
            "birthDay": 0,
            "birthMonth": null,
            "birthYear": 0,
            "street": null,
            "city": null,
            "state": null,
            "areaCode": null,
            "bankAccount": null,
            "linkedAccounts": null,
            "newCustomer": false
        },
        "transactionList": null,
        "linkedCustomer": null
    },
    {
        "accountNumber": 4,
        "accountName": 'Mom\'s Checking Account',
        "balance": 694.20,
        "customer": {
            "permanentAccountNumber": 1,
            "loginId": null,
            "password": null,
            "role": null,
            "firstname": null,
            "lastname": null,
            "uniqueIdentifier": null,
            "email": null,
            "birthDay": 0,
            "birthMonth": null,
            "birthYear": 0,
            "street": null,
            "city": null,
            "state": null,
            "areaCode": null,
            "bankAccount": null,
            "linkedAccounts": null,
            "newCustomer": false
        },
        "transactionList": null,
        "linkedCustomer": null
    }
]