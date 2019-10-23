import React from 'react';
import PersonProp from './Person/Person_Props';

const persons = (props) =>    //Sec7_Lec84  
{
      console.log('Persons js --> rendering')
      return props.persons.map( (person,index) => {
           
            return (<PersonProp 
                        name={person.name} 
                        age={person.age}
                        key={person.id}
                        click={ () => props.clicked(index) } 
                        changed= {(event) => props.changed(event,person.id)}
        />)
    });
}

      export default persons;












