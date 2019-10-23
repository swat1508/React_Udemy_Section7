import React from 'react';
import PersonProp from './Person/Person_Props';

const persons = (props) =>    //Sec7_Lec84  
  //  this.state.persons.map( (person,index) => { //copied from App.js and cut pasted here with this some change
        props.persons.map( (person,index) => {
        return <PersonProp 
        name={person.name} 
        age={person.age}
        key={person.id}
  //      click={ () => props.deletePersonHandler(index) } 
          click={ () => props.clicked(index) } 
//        changed= {(event) => props.nameChangedHandler(event,person.id)}
          changed= {(event) => props.changed(event,person.id)}
        />
    });


    export default persons;












