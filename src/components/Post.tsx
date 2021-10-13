import React,{Component} from "react";
import PostFooter from "./PostFooter";
import '../styles/Post.css'
import PostComment from "./PostComment";
import { Timestamp } from "../../node_modules/@firebase/firestore/dist";
import Moment from 'react-moment';
import { ICommentPost, like,Iprofile } from "../ducks/Posts";
import UserComment from "./UserComment";
import PostHeader from "./PostHeader";

interface IPostProps{
    img:string,
    like:()=>void,
    share:()=>void,
    hasLike:boolean,
    comment?:string,
    createdPost?:Date,
    postId:string,
    totalLikes:number,
    submitComment:(a:string)=>void,
    ownProfilePost:Iprofile
}

export default class Post extends Component<IPostProps>{

    public render(){
        
        const {img, like, share,hasLike,comment="",createdPost,postId,submitComment,totalLikes,ownProfilePost} = this.props;
        
        return(
            <div className="Post">
                <PostHeader 
                    profileImg={ownProfilePost.profileImg}
                    userId={ownProfilePost.userId} 
                    user_name={ownProfilePost.user_name}
                    />
                <img src={img} alt="default" className="imgPost" onDoubleClick={like} />
                <PostFooter 
                    totalLikes={totalLikes} 
                    comment={comment} 
                    hasLike={hasLike} 
                    like={like} 
                    share={share}
                    ownProfilePost={ownProfilePost}/>
                    <hr />
                <div className="comments-section">
                    <UserComment />
                    <UserComment/>
                </div>


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