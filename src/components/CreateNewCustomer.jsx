import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../colors';
import DOBDaySelect from './DOBDaySelect';
import DOBMonthSelect from './DOBMonthSelect';
import StateSelect from './StateSelect';
import Header from './Header';
import axios from '../axiosConfig';
import { send } from '@emailjs/browser';

export default function CreateNewCustomer (props) {
    const navigate = useNavigate();
    const [personalAccountNumber, setPersonalAccountNumber] = useState('');
    const [username, setUsername] = useState('');
    const [temporaryPassword, setTemporaryPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [dateOfBirthDay, setDateOfBirthDay] = useState(1);
    const [dateOfBirthMonth, setDateOfBirthMonth] = useState('');
    const [dateOfBirthYear, setDateOfBirthYear] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [state, setState] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../home')
    }

    const submitHandler = async (element) => {
        element.preventDefault();

        const validationArray = [
            personalAccountNumber, username, temporaryPassword, firstName, lastName, email, role, 
            dateOfBirthDay, dateOfBirthMonth, dateOfBirthYear, address, city, areaCode, state
        ]

        setDisplayMessage('');
        validationArray.forEach( item => {
            if (item === '') {
                setDisplayMessage('Please enter values for all fields.')
            }
        })
        
        if (!displayMessage) {
            axios.post('/customer',{
                permanentAccountNumber: personalAccountNumber,
                loginId: username,
                password: temporaryPassword,
                role: role,
                firstname: firstName,
                lastname: lastName,
                uniqueIdentifier: null,
                email: email,
                birthDay: dateOfBirthDay,
                birthMonth: dateOfBirthMonth,
                birthYear: dateOfBirthYear,
                street: address,
                city: city,
                state: state,
                areaCode: areaCode,
                newCustomer: true
            }).catch((error) =>
                setDisplayMessage(error.message)
            ).then( response => {
                if (response.data) {
                    console.log('success!')
                    send('service_hcjt3tm','template_9r5o3fc',{
                            to_name: firstName,
                            username: username,
                            password: temporaryPassword,
                            email: email,
                        },
                        'user_M5Yz7YRms23Z2tK3Aq4XV')
                    navigate('../home')
                }
            })
            
        }
    }

    console.log(process.env);
    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler} />

                {/*Content*/}
                <div style={styles.content}>
                    <br/>
                    <Link to='../home'>Back</Link>
                    <h3>Input User details:</h3>
                    <form onSubmit={submitHandler} style={styles.form}>
                        <input
                            style={styles.formInput} 
                            type='text' 
                            placeholder='Personal account number' 
                            value={personalAccountNumber} 
                            onChange={ element => setPersonalAccountNumber(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='text' 
                            placeholder='First name' 
                            value={firstName} 
                            onChange={ element => setFirstName(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='text' 
                            placeholder='Last name' 
                            value={lastName} 
                            onChange={ element => setLastName(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='text' 
                            placeholder='Username' 
                            value={username} 
                            onChange={ element => setUsername(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='password' 
                            placeholder='Temporary Password' 
                            value={temporaryPassword} 
                            onChange={ element => setTemporaryPassword(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='email' 
                            placeholder='email' 
                            value={email} 
                            onChange={ element => setEmail(element.target.value) }
                        />
                        <select 
                            style={styles.formInput}
                            value={role}
                            onChange={ element => setRole(element.target.value) } 
                        >
                            <option value='' default hidden>Choose Role Type</option>
                            <option value='MANAGER'>Bank Manager</option>
                            <option value='USER'>User</option>
                        </select>

                        <div>
                            <DOBMonthSelect 
                                style={styles.formInput} 
                                dateOfBirthMonth={dateOfBirthMonth} 
                                setDateOfBirthMonth={setDateOfBirthMonth} 
                            />
                            <DOBDaySelect 
                                style={styles.formInput}
                                dateOfBirthDay={dateOfBirthDay}
                                setDateOfBirthDay={setDateOfBirthDay}
                                dateOfBirthMonth={dateOfBirthMonth}
                            />
                        </div>
                        
                        
                        <input 
                            style={styles.formInput} 
                            type='number'
                            placeholder='year'
                            value={dateOfBirthYear}
                            onChange={ element => setDateOfBirthYear(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='text' 
                            placeholder='Address' 
                            value={address} 
                            onChange={ element => setAddress(element.target.value) }
                        />
                        <input 
                            style={styles.formInput} 
                            type='text' 
                            placeholder='City' 
                            value={city} 
                            onChange={ element => setCity(element.target.value) }
                        />
                        <StateSelect 
                            style={styles.formInput} 
                            state={state} 
                            setState={setState}     
                        />
                        <input 
                            style={styles.formInput} 
                            type='text' 
                            placeholder='Area Code' 
                            value={areaCode} 
                            onChange={ element => setAreaCode(element.target.value) }
                        />
                        <input
                            style={styles.button} 
                            className='CreateUserButton'
                            type='submit'
                            value='Create New User'
                        />
                    </form>
                    {
                        displayMessage ?
                            <>
                                <span style={styles.messageWarning}>Create New User failed:</span>
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
    form: { 
        width: '200px', 
        marginBottom: '20px' 
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
    formInput: {
        border: '2px solid #030202',
        padding: '5px 20px',
        borderRadius: '5px',
        marginBottom: '5px',
        fontFamily: 'Montserrat',
    },
    button: {
        // width: '50%',
        backgroundColor: '#FFD23F',
        color: '#574017',
        fontWeight: 700,
        fontSize: '24px',
        fontFamily: 'Montserrat',
        alignSelf: 'flex-end',
        borderRadius: '5px',
        border: '2px',
        padding: 10,
        margin: 5,
    },
    messageWarning: {
        fontSize: '12px',
        fontWeight: 700,
        color: 'red',
    },
    message: {
        fontSize: '12px',
        fontWeight: 700,
        // color: 'green',
    }
}