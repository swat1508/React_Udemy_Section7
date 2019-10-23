 //Sec7-Lec98 import React,{Component} from 'react';      //Sec7_Lec89 - {Component} added
              import React,{PureComponent} from 'react';  //Sec7_Lec98 - {PureComponent} added
import Person from './Person/Person_Props';


//Sec7_Lec98      class Persons extends Component{
                  class Persons extends PureComponent{      //Sec7_Lec98


/* As we are returning new state below without initilaization
   so getting warning, commenting it temporarily , will see later

      static getDerivedStateFromProps(props,state){
            console.log('Persons.js ==> getDerivedStateFromProps');
            return state;
      }*/
      
/*
      componentWillReceiveProps(){
            console.log('Persons.js ==> componentWillReceiveProps : ', props );            
      } */

 /* Sec7-Lec98 starts
      shouldComponentUpdate(nextProps,nextState){
            console.log('Persons.js ==> shouldComponentUpdate');
            
 //Sec7-Lec98  if(nextProps.persons !== this.props.persons){  //Sec7_Lec95 starts
               if(nextProps.persons !== this.props.persons  || nextProps.changed !== this.props.changed ||
                        nextProps.clicked !== this.props.clicked ){                  
                  return true;
            }else{
                  return false;
            }  //Sec7_Lec95 ends 

//Sec7_Lec95   return true; //generally here we compare current props to nextProps
      }       Sec7-Lec98 ends  */
      

      getSnapshotBeforeUpdate(prevProps,prevState){
            console.log('Persons.js ==> getSnapshotBeforeUpdate');
            return {message: 'Snapshot'};
      }
/*
      componentWillUpdate(){
            console.log('Persons.js ==> componentWillUpdate');
      }
      */
componentDidUpdate(prevProps,prevState,snapshot){ //will execcute after render
      console.log('Persons.js ==> componentDidUpdate');
      console.log('snapshot : ' ,  snapshot );   //the message:'Snapshot' from getSnapshotBeforeUpdate will returned
}


componentWillUnmount(){
      console.log('Persons.js ==> componentWillUnmount method');
}
      render(){
            console.log('Persons js --> rendering')
            return this.props.persons.map( (person,index) => {
            return (<Person
                  name={person.name} 
                  age={person.age}
                  key={person.id}
                  click={ () => this.props.clicked(index) } 
                  changed= {(event) => this.props.changed(event,person.id)}
  />)
      });   
      }
}
export default Persons;

/*
const persons = (props) =>    //Sec7_Lec84  
{
      console.log('Persons js --> rendering')
      return props.persons.map( (person,index) => {
           
            return (<PersonProp 
                        name={person.name} 
                        age={person.age}
                        key={person.id}
                        click={ () => props.clicked(index) } 
                        changed= {(event) => props.changed(event,person.id)}
        />)
    });
}
export default persons;
*/
  












