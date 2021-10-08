import React,{Component} from "react";
import Footer from "./Footer";
import Comment from "./Comment";

const styleContainer ={
    // backgroundColor:'#fff',
    marginBottom:'10px',
    border:'1px solid #ddd',    
    padding:'10px 15px',
} as React.CSSProperties


interface IPostProps{
    img:string,
    like:()=>void,
    share:()=>void,
    hasLike:boolean,
    comment?:string
}
export default class Post extends Component<IPostProps>{
    public render(){
        
        const {img, like, share,hasLike,comment} = this.props;
        return(
            <div style={styleContainer}>
                <img src={img} alt="kitten1" style={{width:'500px', height:'auto'}} />
                <Footer hasLike={hasLike}  like={like} share={share}/>
                <Comment comment={comment} />
            </div>
        )
    }
}