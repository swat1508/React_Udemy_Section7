Sec7 - Lec 85 - Comparing Statefull and Stateless Components
=============================================================

 Stateless vs Stateful Component
           or 
 Presentational Vs Container Component
=======================================
Stateful does no automatically means Class based component because a functional Compoent that manages its own state with useState is also Stateful component.
Although historically this was the case as React Hooks like useState is really new feature and hence we can still find plenty of applications where state is only managed in class-based component.

Presentational also called dunb/stateless have historically been functional components because to prior to React 16.8, these could not manage state
Even though we can use useState to manage state in Presentational component, its a good practice to restrict to a couple of components only that could manage state. The size of couple of components depends on how big the application is. Key point is majority of components should be presentational.


Sec7 - Lec 86 -  Class based vs functional components
=======================================================
With React Hooks, for functional components
- access to state hook is possible using useState() 
- however access to lifecycle hook is not suported

Regarding the way we acess state & props, its important to know that 
- in class based components we need "this" keyword because state and props are properties of component class.
- in functional component we get props as an argument and so we can simply use it like a normal variable

So when to use what ??
When we are using a version of React that does not support react hooks, then its simple.
When we are working with state or need lifecycle hooks , then use class based approach

If the project uses React Hooks, then we may want to use functional components only but we can still split
to have a clear separation between components that are involved in state management and the components that are not and its optimal to have as many presentational only component as possible.

So summary is :
if we are using an older version of react, then use functional component for all presentational components.
So it will be for all the components that only gets inputs,props and dont need to manage state.


use of this.props
================
As of now App.js file does now receive any prop , we can change this 
in index.js file, we can send title to App component


index.js
----------
//Sec7-Lec86 ReactDOM.render(<App />, document.getElementById('root'));
          ReactDOM.render(<App appTitle="Person Manager" />, document.getElementById('root')); //Sec7-Lec86

app.js
------
  <div className={classes.App}>
      <Cockpit 
        title={this.props.appTitle}   //Sec7_Lec86
        showPersons={this.state.showPersons}

Cockpit.js
----------
  //Sec7_Lec86 <h1>Hi I am reactApp</h1>  
               <h1> {props.title} </h1> //Sec7_Lec86

so we see above in app,js how to use this.props .it will work
