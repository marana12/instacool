import React,{Component} from "react";
import { Field } from "redux-form";
import Input from "./Input";
import PostComment from "./PostComment";
import '../styles/Comment.css'

interface ICommentProps{
    comment?:string
}
export default class Comment extends Component<ICommentProps>{
    public render(){
        
        const {comment} = this.props;
        return(
            <div className="Comment">
                <div className="comment-handle">
                    <span className="user-name">Julio</span>
                        &nbsp;
                    <span className="user-comment">{comment}</span>
                </div>

            </div>

        )
    }
}