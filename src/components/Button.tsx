import React,{Component} from "react";
const style =(block:boolean) => ({
        backgroundColor:'#00D1B2',
        border:'0px',
        borderRadius:'4px',
        color:'#fff',
        cursor:"pointer",  
        marginBottom:'10px',  
        padding:'10px 15px',
        width: block ? '100%' : undefined
    } as React.CSSProperties
)

interface IButtonProps{
    block?:boolean
}

class Button extends Component<IButtonProps>{

    public render(){
        const {block = false} =this.props;
        return(
            <button  {...this.props} style={style(block)}/>
        )
    }
}
export default Button;