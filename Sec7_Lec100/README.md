Sec7 - Lec 100 - Rendering Adjacent JSX Elements
=================================================

We see in earlier chapter that we have to always return just one JSX element insie of a component.N

Now that JSX element can contain other jsx elements but we must have only one root JSX element.

So we are not allowed to have something like below in Person.js

 return (  
        <div className={classes.Person}>
          <p onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
        </div>

        <div></div>
      )
if we try above ( adding<div> tag) , we will get error as below :
"Parsing error: Adjacent JSX elements must be wrapped in an enclosing tag"

 So inside there is ok to have adjacent JSX element but not at  root element.
However this is not entirely true, because if we look at Persons component
we can see in render :

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

here we are returning array of elements so its not a single element, its an array
Technically, an array ofcourse is one object but with multiple elements and indeed React does allow us 
to return an array of adjacent element as long as all the items in there have a key and that key is
required so that React can efficiently update and reorder these elements as required.

So in Person component we will make below changes :
return (  
        <div className={classes.Person}>
          <p onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
        </div>
      )
      

is changed to 
    
      return[
          <p onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>,
        <p>{this.props.children}</p>,
        <input type="text" onChange={this.props.changed} value={this.props.name} />
       ]
This will work but will give below warning when click on "Toggle Persons"    
Warning: Each child in a list should have a unique "key" prop
For this we can add key as below :

  return[
          <p key="i1" onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>,
        <p key="i2" >{this.props.children}</p>,
        <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
       ]
Now that warning will be removed , only thing missing is styling because when we 
removed div ==> <div className={classes.Person}>    
then className "Person" also gets removed that had the styling...

So its important to note that if we don't technically need a wrapping element for s styling or structural reasons,then we can avoid it by using an array but this is not the only way of doing it.

We can create such array but its a bit inconvenient 
-to wrap in square bracket
- assign a key
 and so on 

 Another approach is to create a  wrapping component that does not render any actual HTML code but simply is there to fulfill React's requirement of having a wrapping component. And for this , we will create a new folder
 "hoc" that stands for Higher Order Component and inside this we will create a new file
 "Aux.js" - for mac
 "Auxillary.js" - for windows

So in new file Auxillary.js
----------------------------

import React from 'react';

const Auxillary = props => props.children;

export default Auxillary;



and  in Person component i.e Person_Props.js
--------------------------------------------
return(
      <Auxillary>
          <p key="i1" onClick={this.props.click}> I am {this.props.name} and I am {this.props.age} years old</p>,
        <p key="i2" >{this.props.children}</p>,
        <input key="i3" type="text" onChange={this.props.changed} value={this.props.name} />
        </Auxillary>
      )

With the above changes it will work...

