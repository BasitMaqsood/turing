import React from 'react';

const Select = ({ name , label , options=[] , selectIndex =0, selectValues ="", error , ...rest }) => {
    return ( 
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} {...rest}  className="form-control" >
                {options.map(option =>(
                    <option key={option[selectIndex]} value={parseInt(option[selectIndex])}>
                        {option[selectValues]}
                    </option>
                )
                )}
            </select>
            {error && <div className="altert alert-danger"> {error} </div>}

        </div>
     );
}
 
export default Select;