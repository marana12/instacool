import React,{Component} from "react";
import { Field } from "redux-form";
import Input from "./Input";
import PostComment from "./PostComment";
import '../styles/Comment.css'
import { Iprofile } from "../ducks/Posts";

interface ICommentProps{
    comment?:string,
    ownProfilePost:Iprofile
}
export default class Comment extends Component<ICommentProps>{
    public render(){
        
        const {comment,ownProfilePost} = this.props;
        return(
            <div className="Comment">
                <div className="comment-handle">
                    <span className="user-name">{ownProfilePost.user_name}</span>
                        &nbsp;
                    <span className="user-comment">{comment}</span>
                </div>

            </div>

        )
    }
}