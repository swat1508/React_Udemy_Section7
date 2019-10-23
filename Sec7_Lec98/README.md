Sec7 - Lec 98 - PureComponents instead of shouldComponentUpdate
===============================================================

in class based component we saw "shouldComponentUpdate" implementation. If we want to implement a check 
where we simply want to compare all props that matter to a component for difference,then there is an easier
way of writing that component.
 
In Persons.js,
-------------
 shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            
            if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
                  return true;
            }else{
                  return false;
            }  //Sec7_Lec95 ends 

            //Sec7_Lec95   return true; //generally here we compare current props to nextProps
      }

here we are checking "persons" property ==>  if(nextProps.persons !== this.props.persons){ 
 if we want to implement a check where we want to compare all props that matter to a component for difference,then there is an easier way of writing that component.

 we can see in render as below :

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
so we are not only using persons data but also have "changed" function which we trigger and "clicked" function
These are functions not data we output yet if such a function reference would change and if we somehow get a 
new function reference from outside then this component will need to know about that and it should update 
appropriately.

So one can say to add all these 2 check also along with persons check
//  if(nextProps.persons !== this.props.persons){
      if(nextProps.persons !== this.props.persons  || nextProps.changed !== this.props.changed ||
      nextProps.clicked !== this.props.clicked ){
                   return true;
            }else{
                  return false;
            }

with above change , if we reload page , click on toggle person and then click on Remove Cockpit
we can still see in console ==> Persons.js ==> shouldComponentUpdate
which works as before


if we need these type of check for all properties, then we may not use shouldComponentUpdate but instead 
we can extend a different type of component - PureComponent

so in persons.js we will comment the check
Persons.js  - comment method "shouldComponentUpdate"
----------------------------------------------------
 /* Sec7-Lec98 starts
      shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            
 //Sec7-Lec98  if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
               if(nextProps.persons !== this.props.persons  || nextProps.changed !== this.props.changed ||
                        nextProps.clicked !== this.props.clicked ){                  
                  return true;
            }else{
                  return false;
            }  //Sec7_Lec95 ends 

//Sec7_Lec95   return true; //generally here we compare current props to nextProps
      }       Sec7-Lec98 ends  */

and instead of importing and extending Component, we will import & extend PureComponent

2 other changes in Persons.js
------------------------------
 //Sec7-Lec98 import React,{Component} from 'react';      //Sec7_Lec89 - {Component} added
              import React,{PureComponent} from 'react';  //Sec7_Lec98 - {PureComponent} added

and 

//Sec7_Lec98      class Persons extends Component{
                  class Persons extends PureComponent{      //Sec7_Lec98

Now with above changes if we reload page , click on toggle person and then click on Remove Cockpit
we can see there is nothing related to persons hook not even shouldComponentUpdate (as its commented)
and also no other lifecycle hooks . 

So, PureComponent is just a normal component that already implements shouldComponentUpdate with a complete
props check so that checks for any changes in any prop of that component.
As the result is same so instead of manually implementing check like above we can use PureComponent - to save line of code

