import React from 'react';

const Input = ({name, placeholder, error,...rest}) => {
    return (
        <div className="form-group m-3">
            <label htmlFor={name} className="control-label"></label>
            <input {...rest} id={name} name={name} placeholder={"?מה ה" + placeholder + " שלך "} className="form-control input-md text-right"/>
            {error && 
            <span className="text-danger">{error}</span>
            }
        </div>
    )

} 

export default Input;