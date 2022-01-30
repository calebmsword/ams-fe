import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { colors } from '../colors';
import logo from '../account-management-system-logo-solid-color.png';
import DOBDaySelect from './DOBDaySelect';
import DOBMonthSelect from './DOBMonthSelect';
import StateSelect from './StateSelect';
import Header from './Header';

export default function CreateNewCustomer (props) {
    const navigate = useNavigate();
    const [personalAccountNumber, setPersonalAccountNumber] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [dateOfBirthDay, setDateOfBirthDay] = useState();
    const [dateOfBirthMonth, setDateOfBirthMonth] = useState('');
    const [dateOfBirthYear, setDateOfBirthYear] = useState();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [areaCode, setAreaCode] = useState();
    const [state, setState] = useState('');

    const logoutHandler = () => {
        props.setCurrentUser(null);
        navigate('../')
    }

    const submitHandler = (element) => {
        console.log('Submitted! :D');
        element.preventDefault();
    }

    return (
        <div style={styles.head}>

            {/*Left gray background*/}
            <div style={{flex:1}}></div>

            <div style={styles.middle}>
                <Header logoutHandler={logoutHandler} />

                {/*Content*/}
                <div style={styles.content}>
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
                            type='email' 
                            placeholder='email' 
                            value={email} 
                            onChange={ element => setEmail(element.target.value) }
                        />
                        <select 
                            style={styles.formInput}
                            value={role}
                            placeholder='Select role' 
                            onChange={ element => setRole(element.target.value) } 
                        >
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
                            type='number' 
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
}