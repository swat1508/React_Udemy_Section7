Sec7 - Lec 102 - Using React Fragment
=======================================
Last chapter we looked at Aux(Auxillary) component and we will use this as a wrapper in case where we want to have adjacent element without an extra DOM element being rendered to REAL DOM i.e without an extra HTML
element like <div> being rendered.
Since React 16.2, there is a build in aux/auxillary component which we can use.
Its not named Aux/Auxillary , instead React ships with a component that we can access on the React and then 
dot(.) fragment. ==> <React.Fragment>


class Person extends Component{   //Sec7_Lec89
    render(){
      console.log('Person.js ===> rendering ');
      
      return(
      //Sec7_Lec102  <Auxillary>
      <React.Fragment>
          <p key="i1" onClick={this.props.click}> I am   {this.props.name} and I am {this.props.age} years old</p>,
        <p key="i2" >{this.props.children}</p>,
        <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
       {/*Sec7_Lec102   </Auxillary>  */}         
       </React.Fragment>
      )
    }
  }

 
and if we do not want to use dot we can import Fragment at top and then simply use ==> <Fragment>

The Fragmnet does exactly same thing as Aux component does . So revering back to <Aux>/<Auxillary> in next chapter to learn other stuffs.