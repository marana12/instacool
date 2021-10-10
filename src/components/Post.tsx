import React,{Component} from "react";
import PostFooter from "./PostFooter";
import '../styles/Post.css'
import PostComment from "./PostComment";
import { Timestamp } from "../../node_modules/@firebase/firestore/dist";
import Moment from 'react-moment';
import { ICommentPost, like } from "../ducks/Posts";

interface IPostProps{
    img:string,
    like:()=>void,
    share:()=>void,
    hasLike:boolean,
    comment?:string,
    createdPost?:Date,
    postId:string,
    submitComment:(a:string)=>void,
}

export default class Post extends Component<IPostProps>{

    public render(){
        
        const {img, like, share,hasLike,comment="",createdPost,postId,submitComment} = this.props;
        
        return(
            <div className="Post">
                <img src={img} alt="default" className="imgPost" onDoubleClick={like} />
                <PostFooter comment={comment} hasLike={hasLike} like={like} share={share}/>
                <div className="date">
                    <span className="date-from-now">
                    <Moment fromNow>
                        {createdPost}
                    </Moment>
                    </span>
                </div>
                <hr />
                <PostComment onSubmit={submitComment} postId={postId} submitComment={submitComment}/>

            </div>
        )
    }
}