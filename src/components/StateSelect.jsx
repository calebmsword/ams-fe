import React from 'react';

export default function StateSelect({ style, state, setState }) {
    const statesArray = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    return (
        <select 
            style={style}
            value={state} 
            onChange={ element => setState(element.target.value)}>
        {
            statesArray.map(item => <option key={item} value={item}>{item}</option>)
        }
        </select>
    );
}
