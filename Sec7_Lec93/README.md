Sec7 - Lec 93 - Cleaning up with lifecycle Hooks and useEffect() 
=================================================================

The persons.js is a component which will actually gets removed from DOM when we click "Toggle Person".
Lets say we want to do some cleanup work e.g cleanup some events listeners etc 
We actually don't have it here but in real project it will be there...

In a class based component for this, we can have method - "componentWillUnmount" 

componentWillUnmount(){
      console.log('Persons.js ==> componentWillUnmount method');
}

now when we reload page, we will get alert 
then on click of Toggle Persons button we will see Person components 
and then when we again click on Toggle Persons button we can see in console :
 Persons.js ==> componentWillUnmount method

In the above "componentWillUnmount" method, we can write any code that needs to run just before component
is removed.
if we are using hooks (like in case of Cockpit.js),  then in that case we can use
useEffect for this cleanup work 

what we can do is in the anonymous arrow function , we can return another anonymous function that will run after every render cycle.
To be more precise it runs before the main useEffect function runs but after the first render cycle.

    useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
        //HTTP Request

        setTimeout( () => { //Sec7_Lec92
            alert('saved data to cloud !!!');
        } , 1000);
    
        return () => { //Sec7_Lec93
            console.log('Cockpit.js ===> cleanUp work in useEffect ');
        };

//    } , [props.persons]); // alert will execute when persons array gets changed
      } , []);  //Sec7_Lec92 - alert will only execute once


on pagereload we will get alert and also in console ==>  "cockpit.js ==> useEffect() "
if we click on Toggle Persons we will see Person components and click on it again the
Person components will become invisible.
But we will not get this in console ==> "Cockpit.js ===> cleanUp work in useEffect "
which means components were never removed !!!!

we will go to App.js file,  and add a new button "Remove Cockpit"
in state we will add a new field - showCockpit as true and on button click will make it false

In App.js,

inside constructor add new field "showCockpit" as true 
--------------------------------------------------------
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
            showPersons:false,
            showCockpit:true  //Sec7_Lec93
    }
  }

  return - JSX code
------------------ 

  return (

      <div className={classes.App}>

<button onClick={() =>                                  // Sec7_Lec93*
              {this.setState({showCockpit:false});      //Sec7_Lec93
              }}>Remove Cockpit</button>                {/* Sec7_Lec93*/}
      {this.state.showCockpit ? (                       //Sec7_Lec93
      <Cockpit 
        title={this.props.appTitle}  //Sec7_Lec86
        showPersons={this.state.showPersons}
        persons={this.state.persons} 
        clicked={this.togglePersonsHandler}/>
       )  : null}                                        {/* Sec7_Lec93*/}
      {persons} 
        </div>
    );

Now if we reload the page we will see alert . If we click on "Remove Cockpit" button we can see
in console the below :
Cockpit.js ===> cleanUp work in useEffect 
this is coming from React Hook because it runs just after useEffect runs for last time. 
The case will depend on second argument passed to useEffect. If we pass an empty array, useEffect 
will basically execute this function only when that component and is unmounted

We can add another useEffect here :
    useEffect(() => { //Sec7_Lec93
        console.log('cockpit.js ==> 2nd  useEffect() ');
        return () => {
            console.log('Cockpit.js ===> cleanUp work in 2nd useEffect ');
        };
    });

As we can see this 2nd useEffect has no second argument so we are not controlling when it should run and
hence it will run for every update cycle.

Now if we reload page, we will get alert and in console we can see both :
=> cockpit.js ==> useEffect()
=> cockpit.js ==> 2nd  useEffect()

when we click on "Toggle Persons" button, we can see in console:
=> Cockpit.js ===> cleanUp work in 2nd useEffect
=> cockpit.js ==> 2nd  useEffect()

So we can see "cleanUp work in 2nd useEffect" is displayed before "2nd  useEffect()"

This can be useful when we have some operation which actually should be cancelled whenever the 
component re-renders, so after it updated.

This is an extra bit of flexibility that we have with this cleanup function here and we can
 either let this run when component gets destroyed by passing an empty array as second argument 
or it runs on every update cycle with no argument or we can pass second argument which is an array that lists all data this should watch and only when the data changes , it will run the function in useEffect and it will then run cleanup function too.

Performance Optimization and shouldComponentUpdate
---------------------------------------------------
In App.js,
we have "shouldComponentUpdate" as below :

 shouldComponentUpdate(nextProps,nextState){
  console.log('App.js ==> shouldComponentUpdate');
  return true;
 }

 here its always returning true which means React alsways re-renders entire component tree for this component whenever something changes.As we discussed earlier it does not mean that it updates the real DOM but still it checks whether it needs to update the real DOM internally and if we can prevent this
 we can improve performance.We will see this performance improvement in coming chapters.





