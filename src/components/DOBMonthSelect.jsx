import React from 'react';

export default function DOBMonthSelect({ style, dateOfBirthMonth, setDateOfBirthMonth }) {
    let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    return(
        <select 
            style={style}
            value={dateOfBirthMonth} 
            onChange={ (element) => setDateOfBirthMonth(element.target.value)}>
            { monthArray.map( (item) => <option key={item} value={item}>{item}</option>) }
        </select>
    );
}
