import React,{Component} from "react";
const style ={
    backgroundColor:'#fff',
    border:'1px solid #ddd',    
    padding:'10px 15px',
} as React.CSSProperties

export default class Card extends Component{
    public render(){
        const {children} = this.props;
        return(
            <div style={style}>
                {children}
            </div>
        )
    }
}
