import React,{Component} from "react";
import '../styles/Button.css';

interface IButtonProps{
    block?:boolean
}

class Button extends Component<IButtonProps>{

    public render(){
        const {block = false} =this.props;
        return(
            <button  {...this.props} className={`btn ${block ? 'btn-xlg' :''}`} />
        )
    }
}
export default Button;