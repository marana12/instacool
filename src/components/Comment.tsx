import React,{Component} from "react";
import { Field } from "redux-form";
import Input from "./Input";
import PostComment from "./PostComment";


const styleComment ={
    fontSize:'12px'
} as React.CSSProperties


interface ICommentProps{
    comment?:string
}
export default class Comment extends Component<ICommentProps>{
    public render(){
        
        const {comment} = this.props;
        return(
            <React.Fragment>
                <div style={{display:'flex'}}>
                    <span style={styleComment}>{comment}</span>
                </div>
                <div>
                <PostComment/>
                </div>
            </React.Fragment>

        )
    }
}