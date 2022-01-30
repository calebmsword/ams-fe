import React from 'react';

export default function DOBDaySelect({ style, dateOfBirthDay, setDateOfBirthDay, dateOfBirthMonth }) {
    
    let maxDays;
    if (dateOfBirthMonth === 'February') {
        maxDays = 28;
    }
    else if (dateOfBirthMonth === 'January' || dateOfBirthMonth === 'March' || dateOfBirthMonth === 'May' || dateOfBirthMonth === 'July' || dateOfBirthMonth === 'August' || dateOfBirthMonth === 'October' || dateOfBirthMonth === 'December') {
        maxDays = 31;
    }
    else {
        maxDays = 30;
    }

    let dayArray = [1];
    for (let i = 0; i < maxDays-1; i++) {
        dayArray[i+1] = dayArray[i]+1;
    }

    return(
        <select 
            style={style}
            value={dateOfBirthDay} 
            onChange={ (element) => setDateOfBirthDay(element.target.value)}>
            { dayArray.map( (item) => <option key={item} value={item}>{item}</option>) }
        </select>
    );
}
