import React,{Component} from "react";
import '../styles/Button.css';

interface IButtonProps{
    block?:boolean,
    className?:string,
}

class Button extends Component<IButtonProps>{

    public render(){
        const {block = false,className=''} =this.props;
        return(
            <button  {...this.props} className={`btn ${block ? 'btn-xlg' :''} ${className}`} />
        )
    }
}
export default Button;