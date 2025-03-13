import React, { useState } from 'react'

function Team_Members(props) {
  const [cardColor, SetTo]  = useState('yellow');

  return (
    <div className='team' style={{backgroundColor: cardColor }}
        onClick = {() => SetTo(cardColor === 'yellow' ? 'red' : 'yellow')}
    >
        <h2>{props.Name}</h2>
        <br />
        <p>{props.College}</p>
        <p>{props.University}</p>
    </div>
  );
}

export default Team_Members