import React,{Component} from "react";

class Title extends Component{
    public render(){
        return(
            <h2 {...this.props} className="Title"/>
        )
    }
}
export default Title;