Sec7 - Lec 103 - Higher Order Components (HOC) Introduction
============================================================
As discussed earlier, Aux/Auxillary component is so called Higher Order Component and hence placed in HOC folder.
Its named higher order because all it does essentially is it wraps another component.It does not containe its own logic,styling or add any structure to the JSX code or to real DOM that will be rendered , it just wraps another component and then may be adds some extra logic to it . Altough the Aux component here does not even add any logic, it is just a technical wrapper.

Another example of higher order component that we could create would be a component that sets up a div that contains a class or sets up a class like here in app.js,
 <div className={classes.App}>

 This serve as good example for custom higher order component we can create that does more than aux component.
 Now we will create a new file in hoc folder and name it "WithClass.js"
 Note: is kind of convention to name highoer order componet with a "With" at beginning 

WithClass.js
============
import React from 'react';

const withClass = props => (
    <div className={props.classes}>
        {props.children}
    </div>
);

export default withClass;

To use it, we will go to App.js

and import withClass ==> import WithClass from '../hoc/WithClass';

now in return instead of div ,we can use withClass

return (

//Sec7_Lec103 <div className={classes.App}>
              <WithClass classes={classes.App}> {/* Sec7_Lec103  */}

<button onClick={() =>                                  // Sec7_Lec93
              {this.setState({showCockpit:false});      //Sec7_Lec93
              }}>Remove Cockpit</button>                
      {this.state.showCockpit ? (                       //Sec7_Lec93                
      <Cockpit 
              title={this.props.appTitle}  //Sec7_Lec86
              showPersons={this.state.showPersons}              
//Sec7_Lec96  persons={this.state.persons} 
              personsLength={this.state.persons.length}  //Sec7_Lec96
              clicked={this.togglePersonsHandler}/>
        
       )  : null}                                       
      {persons} 
      {/*Sec7_Lec103  </div> */}
      </WithClass>  //Sec7_Lec103
    );

Notice that we have used "classes" in line ==> <WithClass classes ....
because this is prop passed to WithClass.js file


This WithClass usage is just an example here and there will be other Higher Order Components(HOC) also to be introduced later where we for example add error handling that we can wrap around any component that makes HTTP request. The general concept is simply that we have a component that wraps other component which adds something to it - could be styling / additional HTML structire around it or that could also be some logic - we will add the logic once we add HTTP request - to automatically handle HTTP error...
