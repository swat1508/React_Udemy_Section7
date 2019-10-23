Sec7 - Lec 84 - Splitting an App into components
================================================
we will now write code in Perons.js and Cockpit.js as discussed in earlier chapter


Persons.js
----------
Persons can be functional component here as we are not planning to manage state here(although with React hooks we can do this)

we will cut this code from App.js
-------------------------------
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
replace the cut code with the below code :
      <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />




And the cut code above is copied below with modifications :

In Persons.js,
-------------
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

    this will work well , now we will look to add code in Cockpit.js 


  
    For Cockpit.js , we are planning to put the below code from App.js (which is in return statement)
===================================================================
    <h2> Using State </h2>
    <h1>Hi I am reactApp</h1>
    <p className={assignedClasses.join(' ')}>This is really working !!!!</p>
    <button
        //Sec5_Lec72  style={style}
        className={btnClass} //Sec5_Lec72
        onClick={this.togglePersonsHandler}>Toogle Persons </button>
====================================================================

here in Cockpit.js also , it will be functional component as no plan for managing state


Cockpit.js
----------
if we paste above code in cockpik.js then it won't support here as there are multiple root elements
so we will enclose it in a div tag

Note: in other newly created file, Persons.js we are returning many person as its inside map
      but its allowed there,as at  one time there is no multiple root element 

Also as assignedClasses, btnClass are used so we need to cut below code from App.js

============================================================
/*Sec7_Lec84 - cut pasted in Cockpit.js starts
      const assignedClasses=[];
      if(this.state.persons.length <= 2 ){
                        assignedClasses.push( classes.red );
      }
      if(this.state.persons.length <= 1 ){
                        assignedClasses.push( classes.bold );
      }
Sec7_Lec84 - cut pasted in Cockpit.js ends  */

      //Sec7_Lec84 let btnClass=''; //Sec5_Lec72
      //Sec7_Lec84 btnClass= classes.Red;  //Sec5_Lec72
============================================================
and paste in Cockpit.js with modifications 
 - we need to import classes from Cockpit.css (discussed below) ==> import classes from './Cockpit.css';
 - this.state.persons ==> changes to props.persons and in App.js we have to pass the required data so that it can be accessed as props in Cockit,js. 

 In App.js
 --------
  <Cockpit 
        showPersons={this.state.showPersons}
        persons={this.state.persons} 
        clicked={this.togglePersonsHandler}/>

Also the below code is cut from App.css and pasted in Cockpit.css
we will create a new file Cockpit.css
where we can put the classes used like red, bold and App button classes (which will become Cockpit button classes)
===========================================================
/* Sec7_Lec84 - below code is cut and pasted in new file - Cockpit.css
.red{
color:red;
}

.bold{
font-weight: bold;
}

.App button{
  border: 1px solid blue;
  padding: 16px;
  background-color: green;
  font: inherit;
  color: white;
  cursor: pointer;
}

.App button:hover {
background-color:lightgreen;
color: black;
}

.App button.Red{
background-color: red;
}
.App button.Red:hover{
  background-color: salmon;
}
  */
===========================================================
