Sec7 - Lec 89 - Component Update LifeCycle (for props changes )
===============================================================
When props or state changes which are 2 trigers we have for a component to be re-evaludated by React, then we go through a different lifecycyle. This lifecycle starts with :

getDerivedStateFromProps
------------------------
- will not be used too often but can be used to initilize the state of component
 that updated based on props we are getting.

 e.g a form control which gets external properties and then we internally want to handle user input
 but initialize state or update state based on outside changes..

 to sync local state inside of component to props we are getting. we should not cause side effects in here
 so dont send any HTTP requests or anything like that.


 then it comes 
shouldComponentUpdate
=====================
its interesting as it allows to cancel the updating process.So here we can decide whether or not React should continue evaluating and re-rendering component
this must be done very carefully because we can break the components if we block the update form happening
this can done for performance optimization if we know in advance that there wont be any update

then comes

render
-------
react goes through JSX code evaluates that and basically constructs its virtual DOM and sees if it needs to update real DOM 
React then goes ahead and updates all child component so it evaluates all child component present in JSX
code of this component (for which lifecycle here runs) and every child component also goes through that 
lifecycle if it receives new props or state.

after this

getSnapshotBeforeUpdate
-----------------------
it takes previous props and previous state as input and that actually returns a snapshot object which you 
can freely configure and this is also a niche lifecycle hook which we won't use too much 
we may use it for last minute DOM operations - does not mean changes to DOM but things like getting current
scrolling position of user 
so lets say the upcoming update of the component will re-render the DOM and will add new elements on DOM 
and we therefore want to restore the scrolling position of user when update is done .In this case
"getSnapshotBeforeUpdate" can give us that snapshot of user state so of scrolling position right before the update happends and then we can comsume and use that snapshot once update is done to scroll user back 
to where he was. 


After that 

componentDidUpdate
------------------
it signals that we are now done with updating that - render method has been executed and here we can now cause the side effects . So here we could now make HTTP request , though we will have to watch out 
to not enter an infinite loop 
if we make HTTP request and get back a response and we then update the component and then this cycle may starts again . so this is something we should be careful.

what we should not do here is say outside the "then " block of a promise of HTTP request is updating the state with setState. Its ok to do as a result of some async task but we should not call it synchronously
in componentDidUpdate because it will simply lead to unnecessary re-render cycle.  

Lets starts practical with a scenario that props changed
--------------------------------------------------------
To see these lifecycle hooks we will convert persons and person component to class based components
so that we can throw some lifecycle hook into these

converting a component to class based component is simple, we simply have to import component from React
as we need to extend that and then instead of returning a funciton we can can create a new class that extends component and we need a render method to return JSX

also, 
- props will be replaced by this.props
- while exporting use the same name given in class so 
  export default personProp; ==> changes to ==>   export default Person;

we will also update lifecycle hooks to it

======================================================================================================

Person_Prop.js
--------------
import React,{Component} from 'react'; //Sec7_Lec89- {Component} added
import classes from './Person.css';  //Sec5_Lec72

class Person extends Component{   //Sec7_Lec89
    render(){
      console.log('Person.js ===> rendering ');
      
      return (  
        <div className={classes.Person}>
          <p onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
      )
    }
  }

  export default Person;

======================================================================================================

Persons.js
-----------
import React,{Component} from 'react';  //Sec7_Lec89 - {Component} added
import Person from './Person/Person_Props';


class Persons extends Component{

/* As we are returning new state below without initilaization
   so getting warning, commenting it temporarily , will see later

      static getDerivedStateFromProps(props,state){
            console.log('Persons.js ==> getDerivedStateFromProps');
            return state;
      }*/
      
/*
      componentWillReceiveProps(){
            console.log('Persons.js ==> componentWillReceiveProps : ', props );            
      } */

      shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            return true; //generally here we compare current props to nextProps
      }

      getSnapshotBeforeUpdate(prevProps,prevState){
            console.log('Persons.js ==> getSnapshotBeforeUpdate');
            return {message: 'Snapshot'};
      }
/*
      componentWillUpdate(){
            console.log('Persons.js ==> componentWillUpdate');
      }
      */

      componentDidUpdate(prevProps,prevState,snapshot){ //will execcute after render
            console.log('Persons.js ==> componentDidUpdate');
            console.log('snapshot : ' ,  snapshot );   //the message:'Snapshot' from getSnapshotBeforeUpdate will returned
      }
      render(){
            console.log('Persons js --> rendering')
            return this.props.persons.map( (person,index) => {
            return (<Person
                  name={person.name} 
                  age={person.age}
                  key={person.id}
                  click={ () => this.props.clicked(index) } 
                  changed= {(event) => this.props.changed(event,person.id)}
  />)
      });   
      }
}
export default Persons;
======================================================================================================


Note : 
(i) flow
    ----
Person update componentlifecycle will be trigered as soon as we type something in textbox 
We will see :

App.js --> getDerivedStateFromProps  {appTitle: "Person Manager"}
App.js:93 App.js ==> render 
Persons.js:16 Persons.js ==> shouldComponentUpdate
Persons.js:30 Persons js --> rendering
3Person_Props.js:6 Person.js ===> rendering 
Persons.js:21 Persons.js ==> getSnapshotBeforeUpdate
Persons.js:26 Persons.js ==> componentDidUpdate
Persons.js:27 snapshot :  {message: "Snapshot"}


(ii) snapshot in getSnapshotBeforeUpdate & componentDidUpdate
    ---------------------------------------------------------
snapshot is like a data package which can be passed from getSnapshotBeforeUpdate so that we can use it to update DOM again (scroll position as discussed earlier) in 
componentDidUpdate method once the DOM is re-rendered.here we are passing 
{message: 'Snapshot'} in getSnapshotBeforeUpdate
 and in componentDidUpdate we are receiving it 
 normally this {message: 'Snapshot'} will be some scroll location co-ordinates 


(iii) commented out lifecycle hooks
       ----------------------------
below methods are commented out as they don't support anymore. 
getDerivedStateFromProps is commented temporarily for other reason, we will see this method further...

In App.js,      componentWillMount()      --> commented
In Persons.js,  componentWillMount()      --> commented  
In Persons.js , getDerivedStateFromProps  ==> commented
In Persons.js,  getDerivedStateFromProps  ==> commented temporarily as giving warning
                                                  because we were returning state without initialization

so now we will see lifecycle updation methods for App.js in next chapter - Sec7_Lec90