import React from 'react';
import classes from './Person.css';  //Sec5_Lec72

const personProp = (props) => {
console.log('Person.js rendering ');
  return (

    <div className={classes.Person}>
      <p onClick={props.click}> I am {props.name} and I am { props.age} years old</p>
    <p>{props.children}</p>
    <input type="text" onChange={props.changed} value={props.name} />
    </div>
  )
};

export default personProp;