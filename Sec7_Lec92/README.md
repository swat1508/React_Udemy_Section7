Sec7 - Lec 92 - controlling the useEffect() behaviour
======================================================

"useEffect" can be tricky to use as we saw in last chapter, it executes all the time - it combines 
componentDidMount and componentDidUpdate. Now what if we want to send an HTTP request here but only when component is rendered for first time and not for every re-render cycle.

For this lets add setTimeOut call to fake HTTP request. It won't be a real HTTP request but just take sometime to complete like HTTP request.
    useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
        //HTTP Request

        setTimeout( () => {
            alert('saved data to cloud !!!');
        } , 1000);

    });

if we reload the page we can see this alert after 1 sec, which is fine. But     
if we click on "Toggle Persons" button or update something in textbox or click on person component to delete it then also we will get this alert. So, this is not what we want.

How to control when it actually executes ?
------------------------------------------
Lets say we want to execute only when persons changed, in that case we can add second argument - 
which will be an aray - [props.persons]

 useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
        //HTTP Request

        setTimeout( () => { //Sec7_Lec92
            alert('saved data to cloud !!!');
        } , 1000);

    } , [props.persons]);

now with above change we will see alert only if persons gets changed 
so 
- on page load
- On click of person component to delete it,
- any change in textbox will
 will show alert however this alert won't be shown on click of "Toggle Button"    

Also if we have different effect based on different data we can use "useEffect" more than once
that is absolutely fine. We can have as many useEffect setups as we want

Now what if we want to execute this when component renders first time only ?
-----------------------------------------------------------------------------
For this we can pass empty array . This tells React that - it has no dependency and it should re-run
whenever one of the dependencies changes.If we have no dependency , they can never change and 
therefore this can never re-run.It will run for the first time which is default but will not run again.

useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
        //HTTP Request

        setTimeout( () => { //Sec7_Lec92
            alert('saved data to cloud !!!');
        } , 1000);

    } , []);

    with the above change (empty array as second argument), we will onyl get alert on page load
    and no on below :
     - On click of person component to delete it,
     - any change in textbox will 


Note : if we have dependency on a certain field we can pass that field as second argument as above.
       Also, we can also have multiple fields in second argument that we can depend on.
       e.g [a,b,c]