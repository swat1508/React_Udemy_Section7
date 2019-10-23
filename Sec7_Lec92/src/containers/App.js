import React, { Component } from 'react';
import classes from './App.css'; //Sec5_Lec70

import Persons from '../components/Persons/Persons'; //Sec7_Lec84
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {

  constructor(props){   //Sec7_Lec88
    super(props);
    console.log('App.js ==> constructor');
    this.state = {
            persons:[
              {id:'P1',name:'Maxqqq' , age:28},
              {id:'P002',name:'Manu' , age:29},
              {id:'Steph',name:'Stephanie' , age:26}
            ],
            otherState : 'some other value',
            showPersons:false
    }
  }

/* Sec7_Lec88  - cut pasted in constructor above
        state = {
          persons:[
            {id:'P1',name:'Maxqqq' , age:28},
            {id:'P002',name:'Manu' , age:29},
            {id:'Steph',name:'Stephanie' , age:26}
          ],
          otherState : 'some other value',
          showPersons:false
        }
  */

 static getDerivedStateFromProps(props,state){ //Sec7_Lec88
  console.log('App.js --> getDerivedStateFromProps ' , props);
  return state;
 }
/* I got an error/warning with this in console so removed - 
   see ReadMe - its not used and can be removed in future 
   so no need to check for this
   
 componentWillMount(){  //Sec7_Lec88 -  rarely used and will be removed in future
  console.log('App.js ==> componentWillMount ');
 }
*/

 componentDidMount(){  //Sec7_Lec88
    console.log('App.js ==> componentDidMount');
 }

 shouldComponentUpdate(nextProps,nextState){
  console.log('App.js ==> shouldComponentUpdate');
  return true;
 }

 componentDidUpdate(){  //Sec7_Lec90
    console.log('App.js ==> componentDidUpdate');
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
    console.log('App.js ==> render ');  //Sec7_Lec88
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