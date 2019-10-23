Sec7 - Lec 95 - Using shouldComponentUpdate for Optimization 
=============================================================
In Persons.js, we have shouldComponentUpdate method as below :

  shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            return true; //generally here we compare current props to nextProps
      }
this return true which means by default whenever something changes here on this component (when it
gets re-rendered), then it will update.
Now Persons.js already gets re-rendered when in app.js something changes because persons is in the end
of a child component of app.js...
so whenever we change something in app.js, even if that only affects the cockpit or anything else 
in app.js but not persons, the persons child still gets re-rendered because that render function here
gets called and therefore this whole function executes and React will go through that entire component tree
this is how it works.

and it makes sense logically because this is a function it gets executed from top to bottom.So persons gets
re-rendered when something changes 

When we reload page and click on "Toggle Persons" , now if we click on "Remove Cockpit"
still we can see in console:
Persons.js ==> shouldComponentUpdate
Persons js --> rendering
Person.js ===> rendering  - 3 times
Persons.js ==> getSnapshotBeforeUpdate
Persons.js ==> componentDidUpdate
so all our persons updating hooks ran, even though in persons nothing is changed . So it would be good if we can prevent this..
we can prevent this by checking what changed in "shouldComponentUpdate" function of Persons.js

      shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
                  return true;
            }else{
                  return false;
            }  //Sec7_Lec95 ends

//Sec7_Lec95    return true; //generally here we compare current props to nextProps
      }


Now if we check again , we can only  see in console :
Persons.js ==> shouldComponentUpdate and not others 
if we type something in textbox then we can see other updating hooks in console which is expected as
persons is really changed.

Note : persons here is an array and array just like objects are reference types.
Please refer : https://academind.com/learn/javascript/reference-vs-primitive-values/

Basically, idea here is that reference types and so arrays and objects are stored in memory and what we actually store in varibales and properties here are only pointers at that place in memory.
so what we do compare here is actually the pointer. If something in that person component changed and pointer is still the same then this update would not run and the reason it does run here is because in app.js when we update the persons we have created a copy of person that we want to change and then we created a copy of that persons array and hence we created a new person object and  a new array object
and that occupies a new place in memory and gets a new pointer and therefore the pointers 
now also differ.

If we would not have updated like this and instead would have updated the old array then object in memory
would be same. Even if some property of it would have changed,but place in memory would be same
and "shouldComponentUpdate" check won't work because it does not deeply compare this, it does not look
at all the properties in persons or in all the objects in persons , it just does a shallow comparison 
which means it compares whether the two values are really same and the values are our pointer here and it
works correctly because we updated it correctly by replacing objects.


Also, in chrome F12 window , we can go to more tools ==> Rendering and there we can enable
"Paint Flashing" - it allows to see what really gets re-rendered(in real DOM) - it highlight in green

now we have coded "shouldComponentUpdate" method in Persons.js like below :

      shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
                  return true;
            }else{
                  return false;
            }  //Sec7_Lec95 ends

//Sec7_Lec95    return true; //generally here we compare current props to nextProps
      }
if we temporarily remove the if else and return true as earlier 

      shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
           /*
            if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
                  return true;
            }else{
                  return false;
            }  //Sec7_Lec95 ends */

    return true; //generally here we compare current props to nextProps
      }

so that we have redundant re-rendering , then we can see that if we remove the cockpit by clicking on
"Remove Cockpit" button, then we can see it won;t re-render in DOM (it only shifts up)
although we can see persons hooks in console :
Persons.js ==> shouldComponentUpdate
Persons js --> rendering
Person.js ===> rendering  - 3 times
Persons.js ==> getSnapshotBeforeUpdate
Persons.js ==> componentDidUpdate

so that re-render happened in virtual DOM not in real DOM

Another example is when we type something in textbox we can see in console :
Cockpit.js ===> cleanUp work in 2nd useEffect 
Cockpit.js:22 cockpit.js ==> 2nd  useEffect() 
however in Paint flashing we can see only Person component is re-rendered not cockpit 
so real dom re-render is happening in Person component only

So even though we were not doing that performace optimization,we still don't hit the real DOM
with every keystroke which is good but its even better if we can make this performace optimization