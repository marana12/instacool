import React from "react";
import {WrappedFieldProps} from 'redux-form';
import '../styles/Input.css'
interface IInputProps {
    label:string,
    placeholder?:string,
    type?:string
}

const Input: React.FunctionComponent<WrappedFieldProps & IInputProps> = props =>{
    const { input, label } = props
    return(
        <React.StrictMode>
            <div className="Input">
                <span >{label}</span>
                <input {...input} {...props} />

            </div>
        </React.StrictMode>

    )
}

export default Input;