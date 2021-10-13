import React,{Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Comment from "./Comment";
import '../styles/PostFooter.css';
import { faRetweet,faHeart} from '@fortawesome/free-solid-svg-icons';
import { Iprofile } from '../ducks/Posts';

interface IFotterProps{
    like:()=>void,
    share:()=>void,
    hasLike:boolean ,
    comment:string,
    totalLikes:number,
    ownProfilePost:Iprofile
}


export default class PostFooter extends Component<IFotterProps>{

    public render(){
        const {like,share,hasLike,comment,totalLikes,ownProfilePost} = this.props;
        
        return(
           <div className='PostFooter'>
                <div className='buttons-footer'>
                    <div onClick={like} className={`button button-like ${ hasLike ? 'red' : ''}`}>
                        <FontAwesomeIcon  icon={faHeart}/>
                    </div>
                    <div onClick={share} className='button button-share'><FontAwesomeIcon icon={faRetweet}/></div>

                </div>
                <div className="likes-handle" >
                        {
                            totalLikes === 1 ?

                            <span>{totalLikes} like</span>
                            :
                            totalLikes > 0 ?
                            <span>{totalLikes} likes</span>
                            :
                            <span></span>
                        }
                        
                </div>
                
                <Comment ownProfilePost={ownProfilePost} comment={comment} />
            </div>
        )
    }
}