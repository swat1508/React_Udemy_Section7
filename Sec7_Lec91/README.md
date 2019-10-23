Sec7 - Lec 91 - using useEffect() for functional components
============================================================

If we look at our Cockpit component, its a functional component, and therefore we can use React Hooks here if we are using the right React version that actually supports React Hooks.

Here we can't add ComponentDidMount or anything like that but we can manage state via useState although it
won't really help us but what we can use is another hook which has to be imported from React.
Its called useEffect....

useEffect - It is the second most important React Hook we can use next to useState.It basically combines
the functionality or the use cases we can cover of all these class based lifecycle hooks in one React hook.
So basically a function we can add into one of our functional components.

how does it work?
-----------------
We can add it anywhere here in our functional component body and then useEffect as default takes a function that will run for every render cycle.

In Cockpit.js,
    const cockpit = (props) => {

    useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
    });

Now, if we reload page , we can see in console that "useEffect" has been called !!!
this function useEffect is getting executed for every render cycle of cockpit. if we click on 
"Toggle Person" button , we can see it executed again as we changed something and that re-rendered cockpit.

Also, if we type something in textbox,we can see useEffect getting executed. This is because 
React will basically re-render app.js when we type as we are managing state of persons in App.js and that
state changes when we type and hence it calls render method of App.js and in App.js, we have included our 
cockpit so cockpit gets re-rendered too.

Also, we can see useEffect getting executed when we delete any person component.

Note : Here, re-render doesn't mean real DOM,but the virtual DOM

So, "useEffect" run for every update and this means we can already use it for all things we would have done
in componentDidUpdate.
If we need to send any HTTP request , we can do that . It also runs when component is created (can see in page reload)
So, basically its "componentDidMount" and "componentDidUpdate" combined in one effect.

Note : Some hooks like getDerivedStateFromProps is not included here but we also don't really need it
because if we have props here and we want to base our state on that , then we can use "useState" and pass 
some data from our props as an initial state into this.
