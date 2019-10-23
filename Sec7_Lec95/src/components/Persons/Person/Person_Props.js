import React,{Component} from 'react'; //Sec7_Lec89- {Component} added
import classes from './Person.css';  //Sec5_Lec72

class Person extends Component{   //Sec7_Lec89
    render(){
      console.log('Person.js ===> rendering ');
      
      return (  
        <div className={classes.Person}>
          <p onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
      )
    }
  }

  export default Person;

/* //Sec7_Lec89
  const personProp = (props) => {
console.log('Person.js rendering ');
  return (

    <div className={classes.Person}>
      <p onClick={props.click}> I am {props.name} and I am { props.age} years old</p>
    <p>{props.children}</p>
    <input type="text" onChange={props.changed} value={props.name} />
    </div>
  )
};

export default personProp;
*/