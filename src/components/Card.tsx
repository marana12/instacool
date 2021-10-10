import React,{Component} from "react";
import '../styles/Card.css';

export default class Card extends Component{
    public render(){
        const {children} = this.props;
        return(
            <div className="Card" >
                {children}
            </div>
        )
    }
}
