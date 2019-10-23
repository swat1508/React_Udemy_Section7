import React from 'react';

/*Sec7_Lec104
const withClass = props => (
    <div className={props.classes}>
        {props.children}
    </div>
);
*/

//Sec7_Lec104
const withClass = (WrappedComponent, className) => {
    return props => (
    <div className = {className}> 
            <WrappedComponent/>
    </div>
    );
}

export default withClass;