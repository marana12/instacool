import React,{Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from "./Comment";
import '../styles/PostFooter.css';
import { faThumbsUp,faRetweet,faThumbsDown,faHeart} from '@fortawesome/free-solid-svg-icons';

interface IFotterProps{
    like:()=>void,
    share:()=>void,
    hasLike:boolean ,
    comment:string,
}


export default class PostFooter extends Component<IFotterProps>{
    public render(){
        const {like,share,hasLike,comment} = this.props;
        
        return(
           <div className='PostFooter'>
                <div className='buttons-footer'>
                    <div onClick={like} className={`button button-like ${ hasLike ? 'red' : ''}`}>
                        <FontAwesomeIcon  icon={faHeart}/>
                    </div>
                    <div onClick={share} className='button button-share'><FontAwesomeIcon icon={faRetweet}/></div>

                </div>
                <div className="likes-handle" >
                        <span >125,26 likes</span>
                </div>
                
                <Comment comment={comment} />
            </div>
        )
    }
}