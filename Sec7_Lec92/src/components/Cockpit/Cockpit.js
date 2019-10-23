import React,{useEffect} from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {

    useEffect(() => {   //Sec7_Lec91
        console.log('cockpit.js ==> useEffect() ');
        //HTTP Request

        setTimeout( () => { //Sec7_Lec92
            alert('saved data to cloud !!!');
        } , 1000);

//    } , [props.persons]); // alert will execute when persons array gets changed
      } , []);  //Sec7_Lec92 - alert will only execute once

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
