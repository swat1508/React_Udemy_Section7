import React, { Component } from 'react';
import classes from './App.css'; //Sec5_Lec70

import Persons from '../components/Persons/Persons'; //Sec7_Lec84
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  state = {
    persons:[
      {id:'P1',name:'Maxqqq' , age:28},
      {id:'P002',name:'Manu' , age:29},
      {id:'Steph',name:'Stephanie' , age:26}
    ],
    otherState : 'some other value',
    showPersons:false
  }

switchNameHandler = (newName) => {
  console.log('Button Clicked !!! ');
  this.setState({
    persons:[
      {name: newName, age:28},
      {name:'Manu' , age:29},
      {name:'Stephanie' , age:27}
    ]
  })
} 

deletePersonHandler = (personIndex) =>{
const persons = this.state.persons.slice();
persons.splice(personIndex,1);
this.setState({persons : persons});
}

nameChangedHandler = (event,id) => {

  const personIndex = this.state.persons.findIndex(p => {
    return p.id===id;
  });

  const person = {
    ...this.state.persons[personIndex]
  };

  person.name=event.target.value;
  const persons= [...this.state.persons];
  persons[personIndex] = person;


  this.setState({persons : persons  })
}


togglePersonsHandler = () => {
const doesShow = this.state.showPersons;
this.setState({showPersons: !doesShow});
}

  render() {
    let persons=null;

if(this.state.showPersons){
persons=
      <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
  }

return (

      <div className={classes.App}>
      <Cockpit 
        title={this.props.appTitle}  //Sec7_Lec86
        showPersons={this.state.showPersons}
        persons={this.state.persons} 
        clicked={this.togglePersonsHandler}/>
      {persons}
        </div>
    );
  }
}

export default App;