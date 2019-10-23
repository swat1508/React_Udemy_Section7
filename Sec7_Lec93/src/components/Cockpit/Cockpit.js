import React,{useEffect} from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

    useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
        //HTTP Request

        setTimeout(() => { //Sec7_Lec92
            alert('saved data to cloud ok ok  !!!');
        } , 1000);
    
          return () => {          //Sec7_Lec93
              console.log('Cockpit.js ===> cleanUp work in useEffect ');
          };

      } ,[]);  //Sec7_Lec92 - alert will only execute once


    useEffect(() => { //Sec7_Lec93
        console.log('cockpit.js ==> 2nd  useEffect() ');
        return () => {
            console.log('Cockpit.js ===> cleanUp work in 2nd useEffect ');
        };
    });
    
    

    const assignedClasses=[];
    let btnClass='';

    if(props.showPersons){
        btnClass= classes.Red;
    }
   
    if(props.persons.length <= 2 ){
                      assignedClasses.push( classes.red );
    }
    
    if(props.persons.length <= 1 ){
                      assignedClasses.push( classes.bold );
    }


    return (
        <div className={classes.Cockpit}>
            <h2> Using State </h2>
            <h1> {props.title} </h1>
            <p className={assignedClasses.join(' ')}>This is really working !!!!</p>
            <button
                className={btnClass}
                onClick={props.clicked}>Toogle Persons </button>       
        </div>
    );
};

export default cockpit;
