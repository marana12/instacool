import React,{Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp,faRetweet,faThumbsDown,faHeart} from '@fortawesome/free-solid-svg-icons';
const styles ={
    buttons: (like?:boolean) =>( {
        textAlign:'center',
        padding:'10px 15px',
        cursor:'pointer',
        color:like? "red":"#eee",
    }as React.CSSProperties),
    footer:{
            display:'flex',
            marginLeft:'-15px',
            width:"calc(100% + 30px)"
        }as React.CSSProperties,
    totalLikes:{
        fontWeight: 600,
        color: 'rgba(var(--i1d,38,38,38),1)',
        fontSize:'12px',
    }
}
interface IFotterProps{
    like:()=>void,
    share:()=>void,
    hasLike:boolean 
}


export default class Footer extends Component<IFotterProps>{
    public render(){
        const {like,share,hasLike} = this.props;
        
        return(
           < React.Fragment>
            <div style={styles.footer}>
                <div onClick={like} style={styles.buttons(hasLike)}>
                    <FontAwesomeIcon className="far fa-heart" icon={faHeart}/>
                </div>
                <div onClick={share} style={styles.buttons()}><FontAwesomeIcon icon={faRetweet}/></div>

            </div>
            <div style={{display:'flex'}}>
                    <span style={styles.totalLikes}>125,26 likes</span>
            </div>
            </React.Fragment>
        )
    }
}