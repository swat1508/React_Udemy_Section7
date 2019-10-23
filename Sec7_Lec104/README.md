Sec7 - Lec 104 - Another Form of HOCs
=====================================
The WithClass component we saw in Sec7_Lec103 is a higher order component is actually one of two ways of creating HOC(higher order components).Lets see what is the other way :

The other way does not work by returning functional component but instead by using a regular javascript function
where :
==>  first argument will actually be our wrapped component - naming is as "WrappedComponent"
     (we can name it whatever we want but it should start with Capital Letter as this will be a reference to component) and the 

==> second argument is something that we need in our higher order component and this depends on what kind of HOC     we are creating and what the idea is behind HOC. 
    Here, we are nameing it as "className"  - we can use whatever we want as its specific to why we are creating HOC.

=============================================================
                withClass.js (why w in withclass is changes to small read below line 41)
                ------------
const WithClass = (WrappedComponent, className) => {
    return props => (
    <div className = {className}> 
            <WrappedComponent/>
    </div>
    );
}
export default withClass;
===============================================================

This HOC has purpose of adding a div with certain CSS class around any element and so getting that classname
that should be added makes a lot of sense. Ofcourse we can add as many args as we want based on what our HOC does.

In this HOC, we will return a function body in which we will return a functional component . So here we have a function - normal JS function not a component function because we are not getting props here  and not returning JSX but instead returning another function definition and that is now function definition of component function.

At the end we have a function that returns a function which is functional component. In this functional component, we will add div where we set class name as className passed as 2nd argument

Now inside of that div, we can output wrapped component which is first arg(WrappedComponent) and thats why we need to have name starting with capital char as its expecting to be a component.

Now how to use this kind of HOC ?
---------------------------------

We dont use it as before by wrapping our component with it,instead we will use that Aux/Auxillary component now
because we dont have root level element but we have adjacent elements , we need that Aux/Auxillary component

//Sec7_Lec104 <WithClass classes={classes.App}> {/* Sec7_Lec103  */}
              <Auxillary>  {/* Sec7_Lec104 */ }
              <button onClick={() =>                                  // Sec7_Lec93 
              .....................        
              .....................  

      {/*Sec7_Lec104  </WithClass>  //Sec7_Lec103 */}
      </Auxillary> //Sec7_Lec104


So, we will import it and use it ==> import Auxillary from '../hoc/Auxillary'; (actually its already imported ..)

Also we will import withClass with a small 'w' now ==> 
//Sec7_Lec104 import WithClass from '../hoc/WithClass';
              import withClass from '../hoc/withClass';  //Sec7_Lec104
This is because in App.js its not a component anymore, it is  a normal function that returns a function component but not a function itself. So, the name of file withClass.js has small 'w' 

while exporting in App.js we will use this withClass...
//Sec7_Lec104 export default App;
              export default withClass(App,classes.App);

With these changes it will work....

Now throughout course we will see multiple HOC, not all written by us but some introduced by 3rd party packages 
We should analyze what they do behind the scene- what they add something extra to component - that could be 
styles,HTML code, JS logic etc
