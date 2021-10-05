import React from "react";
import {WrappedFieldProps} from 'redux-form';
const style ={
    input:{
        backgroundColor:'#fff',
        border:'1px solid #ddd',
        borderRadius:'4px',
        marginBottom:'10px',    
        padding:'10px 15px',
        width:'calc(100% - 30px)'
    },
    span:{
        fontSize:'10px',
        fontWeight:'bold',
        color:'#777',
        textTransform:'uppercase'
    } as React.CSSProperties
}
interface IInputProps {
    label:string,
    placeholder?:string,
    type?:string
}

const Input: React.FunctionComponent<WrappedFieldProps & IInputProps> = props =>{
    const { input, label } = props
    return(
        <React.StrictMode>

            <div>
                <span style={style.span}>{label}</span>
                <input {...input} {...props} style={style.input}/>

            </div>
        </React.StrictMode>

    )
}

export default Input;