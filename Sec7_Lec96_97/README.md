Sec7 - Lec 96 - Optimization functional components with React.memo()
====================================================================
We saw that shouldComponentUpdate is a great tool but is only available for class based components.
So what about Cockpit component which is a functional components.

In paint flashing we saw that when we type anything in textbox then in console we get
Cockpit.js ===> cleanUp work in 2nd useEffect 
Cockpit.js:22 cockpit.js ==> 2nd  useEffect() 
even  though only Person component is getting affected and not Cockpit component

So how can we prevent this if nothing about Cockpit component changed ?

For that first of all we have to look at the cockpit and we can see that only thing that the cockpit uses
internally and therefore should trigger a  re-rendering of cockpit  are :
- persons length
- title
- showPersons

React also has a tool for functional components.We can wrap our export, so our entire component in Cockpit js file with React memo.
This basically uses mooization which is a technique where React will memoize. So basically storing
a snapshot of this component and only if its input changes it will re-render , it will re-render it
otherwise if its input do not change and if its parent component want to update this cockpit component,
React will give back that stored component. 

So initially this runs because there is no stoed data and here it runs again . but why again ?
Because in cockpit component it only re-renders when its props changes, but ofcourse one of props
we depend on is the persons.
We only use the length but that is not something Reacts picks up here.
To fix that we can optimize the way we pass data into our Cockpit.

In App.js
---------
<Cockpit 
                  title={this.props.appTitle}  //Sec7_Lec86
                  showPersons={this.state.showPersons}
                  persons={this.state.persons} 
                  clicked={this.togglePersonsHandler}/>


here instead of passing in "persons" ==> we can pass personsLength

<Cockpit 
                  title={this.props.appTitle}  //Sec7_Lec86
                  showPersons={this.state.showPersons}
//Sec7_Lec96      persons={this.state.persons} 
                  personsLength={this.state.persons.length}  //Sec7_Lec96
                  clicked={this.togglePersonsHandler}/>


So, instead of determining the length inside of cockpit , we do it outside of cockpit now and we only
pass in persons.length. This will now only change if the persons length here changes.

In Cockpit.js
------------

//Sec7_Lec96    if(props.persons.length <= 2 ){
                if(props.personsLength <= 2 ){   //Sec7_Lec96
                      assignedClasses.push( classes.red );
                }
    
//Sec7_Lec96    if(props.persons.length <= 1 ){
                if(props.personsLength <= 1 ){ //Sec7_Lec96
                      assignedClasses.push( classes.bold );
                }
Now with these changes, we will 
- reload page
- click on Toggle Persons 
- when we type something in textbox we won't see anything related to Cockpit hooks
 
 Therefore, its a good idea to wrap functional components that might not need to update with every change
 in the parent component with it.


 
Sec7 - Lec 97 - When should you optimize ?
==========================================

Now with React memo and shouldComponentUpdate, it would be kind of logical to basically add either of the two to any component we are creating.Every functional component could be wrapped with React memo and every class based component could implement shouldComponentUpdate ...
Now this might sound like a good idea but it actually is not ...

We will have components that will always update when their parents updates. In such cases where we depend on some input from our parent component,that is about the only data parent component manages and so when 
parent component updates , we will also have to update because then that data changed.

In such cases, if we implement shouldComponentUpdate or React Memo then these functions will run and will
check whether the input changed and they will find out yes it changed like it always does and they will allow you to re-render .....
so we dont stop anything to happen but we executed unnecessary code of check in shouldComponentUpdate :
 if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
                  return true;
            }else{
                  return false;
            }
            

