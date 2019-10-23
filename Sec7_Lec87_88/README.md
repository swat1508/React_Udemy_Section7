Sec7 - Lec 87 - Component LifeCycle
====================================
Component lifecycle is only available in class based components.We will later learn that functional
components when using React Hooks have an equivalent of it.

Following are the methods which we can add to any class based component and React will execute them
for us :
-constructor()
-getDerivedStateFromProps()
-shouldComponntUpdate()
-getSnapshotBeforeUpdate()
-componentDidUpdate()
-componentDidCatch()
-componentDidMount()
-componentWillUnmount()
-render()

These will run at different point of time .

constructor
-----------
When a component is created then first of all constructor executes.This is not actually a React lifecycle hook but default ES6 class feature.The constructor will receive the props of the component and we have to call super(props) in constructor . Use is : 
    - can be used for basic initialization of work e.g setting an initial state

getDerivedStateFromProps(props,state)
-------------------------------------
This is lifecycle hook added in React 16.3 and in the end, idea is that whenever props changes for class based component, we can sink the state to them. This is actually used in very rare cases.
- Use is : when props of component can change and we want to update internal state of that component,then             its used.

render()
--------
We already saw that this is the method that returns JSX.We should use it to prepare the data as we need to 
lay out our JSX code  and to render the HTML code. 
when render executes and we render any other React component in this class based component, then the child 
components will be rendered.So every child component which we have included in our rendered component will be rendered as well and only once all child components are rendered and their lifecycle looks finished , then this lifecycle hooks gets finished for creation when componentDidMount gets called 

componentDidMount()
-------------------
This is very important lifecycle hook which we will use a lot.This is a typical hook which we can use for 
making HTTP request to get new data from web.
Note : we should not call setState here synchronously as it can trigger a re-render cycle.


Sec7 - Lec 88 - Component Creation LifeCycle in action
=======================================================
In our application we have App.js which is class based component and hence we have access to lifecycle hooks.
(1)The first thing to execute is constructor ,it receives some props .When we add a constructor,we have to 
call super(props) here .This will basically execute the constructor of component we are extending and its 
important to make sure everything is initialized correctly.
In constructor we can set state.

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

  here we have cut the initializing of state and put inside construcor(optional). 
  but we can only do this.state = .... and not this.setState as there will be initially no state to merge.

(2)After constructor, now getDerivedStateFromProps will execute which is a static method
  
   static getDerivedStateFromProps(props,state){
        console.log('App.js --> getDerivedStateFromProps ' , props);
        return state;
    }
Actually updated state is to be returned, but here just returning old state as no updation    


(3)After this render method executes
As mentioned above in when we render a component all the child component gets rendered . In this case 
all Person compoent will be rendered and if this Person would have been a class based component we could 
have added their lifecycle too and would have seen them executed too. However as Person is not
class based component so this is not possible
What we will do is :
(a) In Persons component(Persons.js) we will add console.log('Persons js --> rendering')

to add this console.log statement we need to put it inside {} and add return statement

const persons = (props) =>    //Sec7_Lec84  
{ //Sec7_Lec88
      console.log('Person js --> rendering')
//Sec7_Lec88 props.persons.map( (person,index) => {
      return props.persons.map( (person,index) => {  //Sec7_Lec88
                return (<PersonProp 
                        name={person.name} 
                        age={person.age}
                        key={person.id}
                        click={ () => props.clicked(index) } 
                        changed= {(event) => props.changed(event,person.id)}
        />)
    });
} //Sec7_Lec88

(b)In Person component (Person_Prop.js) , we will add console.log('Person.js rendering'); before return statement

by this ,  App.js render will execute => then 
           Persons component render will execute ==> then 
           individual Person component (render in Person_Prop.js) will execute

(4) After this componentDidMount() will execute

    componentDidMount(){  //Sec7_Lec88
      console.log('App.js ==> componentDidMount');
    }

Now if we do npm start , we can see in browser console 

App.js ==> constructor
App.js --> getDerivedStateFromProps  {appTitle: "Person Manager"}
App.js ==> render 
App.js ==> componentDidMount

this is expected and console.log in person is not visible because its not called yet
if we click on Toggle button then we can see  the additional log below 

App.js --> getDerivedStateFromProps  {appTitle: "Person Manager"}
App.js ==> render 
Persons js --> rendering
Person_Props.js:5 Person.js rendering -3 times(as three Person component called in Persons component)

So all good till here

(5)  There is one more method "componentWillMount" which is still there but not used and will be removed
in future. To check we can write the below in App.js  

 componentWillMount(){  //Sec7_Lec88 -  rarely used and will be removed in future
  console.log('App.js ==> componentWillMount ');
 }
 and this will execute before componentDidMount...

 The work done in componentWillMount is like preparing for state and this can be done in 
 getDerivedStateFromProps also.Both there are relatively very less used
=================================================================================================
Actually, with above code I got error/warning so removed ,anyway as mentioned aboove its not used 
and can be removed in future so ok let this not be

The error, I got is :
    Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.

    App uses getDerivedStateFromProps() but also contains the following legacy lifecycles:
    componentWillMount
      The above lifecycles should be removed. Learn more about this warning here:
      https://fb.me/react-async-component-lifecycle-hooks
=================================================================================================

there are other hooks which will come in picture while updating lifecycle and we will see those in 
next chapter

Note : One important point to note is that - accessing render method does not mean that real DOM
       gets rendered, instead it means React will now re-render its virtual DOM and check if the
       real DOM needs to be changed.