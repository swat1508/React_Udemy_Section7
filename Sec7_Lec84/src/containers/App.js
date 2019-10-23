import React, { Component } from 'react';
/*
import logo from './logo.svg';  ==> deleting logo.svg file as not needed */
//Sec5_Lec70 import './App.css';
             import classes from './App.css'; //Sec5_Lec70
             
//Sec7_Lec83 import MyPerson from './Person/Person';
             import MyPerson from '../components/Persons/Person/Person';   //Sec7_Lec83

//Sec7_Lec83 import PersonProp from './Person/Person_Props';
//Sec7_Lec84 import PersonProp from '../components/Persons/Person/Person_Props'; //Sec7_Lec83
             import Persons from '../components/Persons/Persons'; //Sec7_Lec84
import Cockpit from '../components/Cockpit/Cockpit';

//Sec5_Lec70 import Radium,{StyleRoot} from 'radium';

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
// const persons = this.state.persons;
const persons = this.state.persons.slice();
persons.splice(personIndex,1);
this.setState({persons : persons});
}

nameChangedHandler = (event,id) => {

  const personIndex = this.state.persons.findIndex(p => {
    return p.id==id;
  });
//const person = Object.assign({} , this.state.persons[personIndex]);
/* the above commented code will work but we will follow below spread operator approcach */

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
    /*Sec5-Lec72 starts
          const style = {
              backgroundColor : 'green',
              color:'white',
              font:'inherit',
              border:'1px solid blue',
              padding:'8px',
              cursor:'pointer',

                    //Sec5-Lec70 - remove Radium changes      ':hover' : {
                    //Sec5-Lec70 - remove Radium changes            backgroundColor : 'lightgreen',
                    //Sec5-Lec70 - remove Radium changes            color           : 'black'
                  //Sec5-Lec70 - remove Radium changes            } 

          };
         Sec5-Lec70 ends */
let persons=null;
//Sec7_Lec84 let btnClass=''; //Sec5_Lec72

if(this.state.showPersons){
persons=
//Sec7-Lec84 (
  //Sec7-Lec84  <div>
      <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
          
      {
        /*  Sec7_Lec84
          this.state.persons.map( (person,index) => {
                return <PersonProp 
                name={person.name} 
                age={person.age}
                key={person.id}
                click={ () => this.deletePersonHandler(index) } 
                changed= {(event) => this.nameChangedHandler(event,person.id)}
                />
          })
          */
      }
            
//Sec7-Lec84    </div> 
//Sec7-Lec84   );
 //Sec5-Lec72     style.backgroundColor= 'red';
      /*Sec5-Lec70 - remove Radium changes    
      style[':hover'] = {                      //Sec5-Lec67
                  backgroundColor : 'salmon',
                  color           : 'black'
          };
          */
//Sec7_Lec84 btnClass= classes.Red;  //Sec5_Lec72
}
/* Sec5-Lec70 starts
const classes=[];
if(this.state.persons.length <= 2 ){
classes.push('red');
}
if(this.state.persons.length <= 1 ){
  classes.push('bold');
}*/
/*Sec7_Lec84 - cut pasted in Cockpit.js starts
      const assignedClasses=[];
      if(this.state.persons.length <= 2 ){
                        assignedClasses.push( classes.red );
      }
      if(this.state.persons.length <= 1 ){
                        assignedClasses.push( classes.bold );
      }
Sec7_Lec84 - cut pasted in Cockpit.js ends  */
/* Sec5-Lec70 ends */

return (
 //Sec5-Lec70  <StyleRoot>
 //Sec5_Lec70  <div className="App"> 
/* <div className={classes.App}>
 Sec7_Lec84 - cut pasted in new file cockpit.js starts
                
<h2> Using State </h2>
<h1>Hi I am reactApp</h1>
<p className={assignedClasses.join(' ')}>This is really working !!!!</p>



<button
//Sec5_Lec72  style={style}
className={btnClass} //Sec5_Lec72
onClick={this.togglePersonsHandler}>Toogle Persons </button>
  
{persons}
      </div>
      Sec7_Lec84 - cut pasted in new file cockpit.js ends */
      <div className={classes.App}>
      <Cockpit 
        showPersons={this.state.showPersons}
        persons={this.state.persons} 
        clicked={this.togglePersonsHandler}/>
      {persons}
        </div>
//Sec5-Lec70  </StyleRoot>
    );
  }
}

// export default App;
/*Sec5-Lec70 - remove Radium changes
export default Radium(App); //Sec5-Lec67
*/
export default App;