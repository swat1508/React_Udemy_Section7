import React,{Component,Fragment} from 'react'; //Sec7_Lec89- {Component} added
import classes from './Person.css';  //Sec5_Lec72
import Auxillary from '../../../hoc/Auxillary';

class Person extends Component{   //Sec7_Lec89
    render(){
      console.log('Person.js ===> rendering ');
      
      return(
     //Sec7_Lec102  <Auxillary>
     //Sec7_Lec102  <React.Fragment> {/*Sec7_Lec102 */}
                    <Fragment>       {/*Sec7_Lec102 */}
      
      <p key="i1" onClick={this.props.click}> I am   {this.props.name} and I am {this.props.age} years old</p>,
      <p key="i2" >{this.props.children}</p>,
      <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
       
        {/*Sec7_Lec102  </Auxillary>  */}         
        {/*Sec7_Lec102  </React.Fragment>   //Sec7_Lec102 */ }
                        </Fragment>         //Sec7_Lec102
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