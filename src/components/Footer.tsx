import React,{Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp,faRetweet } from '@fortawesome/free-solid-svg-icons';

const styles ={
    buttons: (type:string) =>( {
        flex:1,
        textAlign:'center',
        padding:'10px 15px',
        cursor:'pointer'
    }as React.CSSProperties),
    footer:{
            backgroundColor:"#eee",
            display:'flex',
            marginLeft:'-15px',
            marginBottom:'-10px',
            width:"calc(100% + 30px)"
        }as React.CSSProperties,
}
interface IFotterProps{
    like:()=>void,
    share:()=>void,
}


export default class Footer extends Component<IFotterProps>{
    public render(){
        const {like,share} = this.props;
        return(
            <div style={styles.footer}>
                <div onClick={like} style={styles.buttons('like')}><FontAwesomeIcon icon={faThumbsUp}/> Like</div>
                <div onClick={share} style={styles.buttons('share')}><FontAwesomeIcon icon={faRetweet}/> Share</div>
            </div>
        )
    }
}