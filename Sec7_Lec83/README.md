Sec7 - Lec 83 - A Better Project Structure
===========================================

Typically components like App.js component that manage state should not be involved with UI rendering too much. The "render" method should be rather lean and should not contain too much JSX.
So we will split this into more components.

For e.g we will create a person list component or person's component . We can then simply pass this array of persons into this component , 
and inside that perons's component we would do mapping and render the list.

This will allow us to outsource all this code and in end, just import persons in our app component and either render it if showPersons is true or not render it . 
Another thing which we can do is outsource our cockpit into its own component so that so that in the end our app component really only has this 
wrapping div and then a cockpit component and a person component.

All above are optional and we will just do it to not mix up things in a single compontnt. Lets start now :

==> we will create a "Persons" folder in src folder and inside that a file Persons.js
   Also, we will move Person folder inside this newly created Persons folder
      src => Persons => - Person => Person_Prop.js and Person.css
                        - Persons.js ==> new file 

==> we can add a new folder in src foler - "assests"   
==> we will create a new folder "components" which can hold all components like Person Component
==> a new folder "container" in src folder to hold all containers like App component and its css. So we        will move App.js and App.css in this new folder "container"
=> will add a new folder cockpit and inside that a file Cockpit.js

So, the structure will look like below :
           
src  ==>   =>  assets      =>    for images etc....    

           =>  components => - Persons => - Person =>  - Person_Prop.js 
                                          - Persons.js  - Person.css
                             - Cockpit => Cockpit.js             
                            
           =>  containers => - App.js
                             - App.css
                             - App.test.js

                            

However, it will break now as all import paths are wrong we will correct them as below :

In App.js,
---------
//Sec7_Lec83 import PersonProp from './Person/Person_Props';
             import PersonProp from '../components/Persons/Person/Person_Props'; //Sec7_Lec83

Also , below (however the below 2 lines won't be used but for removing error import)
//Sec7_Lec83 import MyPerson from './Person/Person';
             import MyPerson from '../components/Persons/Person/Person';   //Sec7_Lec83


In index.js,
------------
//Sec7_Lec83  import App from './App';
              import App from './containers/App'; //Sec7_Lec83      

if we do npm start , it will work now . In next chapter (Sec7_Lec84) we will write code in newly created files
- persons.js
- cockpit.js

in order to split the code to get a improved component structure.
