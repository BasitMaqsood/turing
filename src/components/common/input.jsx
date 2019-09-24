import React from 'react';

const Input = ({ name , label ,  errors , ...rest}) => {
    return ( 
        <React.Fragment>
            <div className="form-group">
                <input
                    {...rest} 
                    name={name}
                    id={name}
                    className="form-control" />
            </div>
            {errors && <div className="alert alert-danger">{ errors }</div>}
        </React.Fragment>
     );
}
 
export default Input;