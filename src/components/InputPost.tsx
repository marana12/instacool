import React from "react";
import {WrappedFieldProps} from 'redux-form';
import '../styles/InputPost.css'
interface IInputProps {
    label:string,
    placeholder?:string,
    type?:string
}

const InputPost: React.FunctionComponent<WrappedFieldProps & IInputProps> = props =>{
    const { input, label } = props
    return(
        <React.StrictMode>
            <div className="InputPost">
                <span >{label}</span>
                <input {...input} {...props} />
            </div>
        </React.StrictMode>

    )
}

export default InputPost;