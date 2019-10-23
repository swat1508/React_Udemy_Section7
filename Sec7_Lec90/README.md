Sec7 - Lec 90 - Component Update LifeCycle (for state changes )
=================================================================

In earlier chapter , we saw updating lifecycle for prop changes.Most often used methods would be
componentDidUpdate() - which is after updated finished.
e.g when we want to fetch new data from server

Lets now have a look at lifecycle hooks for internal changes when state changes and we can do it with help of app.js, 
In there, we do change the state , once user enter something on one of textbox  so we can add
after componentDidMount, the method "componentDidUpdate" and we can also add the get snapshot 
before update
so in App.js,
after  componentDidMount() method we can add 2 more methods :
- shouldComponentUpdate
- componentDidUpdate

 shouldComponentUpdate(nextProps,nextState){
  console.log('App.js ==> shouldComponentUpdate');
  return false;
 }

 componentDidUpdate(){  //Sec7_Lec90
    console.log('App.js ==> componentDidUpdate');
  }

  now if we see in browser when we click on Toggle button 
  it fails, nothing will happen because we are returning false and hence further update won't happen
  as it ownt update no it wont update persons .

  now if we change it to true , then all ok 
 shouldComponentUpdate(nextProps,nextState){
  console.log('App.js ==> shouldComponentUpdate');
  // return false;
     return true;
 }

 Now if we type a character in textbox of any of Person component, we can see in console :
=======================================================================================
   App.js --> getDerivedStateFromProps  {appTitle: "Person Manager"}
   App.js:53 App.js ==> shouldComponentUpdate
   App.js:103 App.js ==> render 
   Persons.js:21 Persons.js ==> shouldComponentUpdate
   Persons.js:39 Persons js --> rendering
   3Person_Props.js:6 Person.js ===> rendering 
   Persons.js:26 Persons.js ==> getSnapshotBeforeUpdate
   Persons.js:35 Persons.js ==> componentDidUpdate
   Persons.js:36 snapshot :  {message: "Snapshot"}
   App.js:58 App.js ==> componentDidUpdate
=======================================================================================

Note : ComponentDidMount , ComponentDiDUpdate are very important as we typically do things like 
fetching new data from server

Also, for performace improvements, shouldComponentUpdate() are very much important.

So now we saw lifecycle methods which is only for class based component...
what about funtional component ? 
Answer is React Hooks - we can build entire React app as it can manage state.
 we will see in next chapter
