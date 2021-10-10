import { Component } from "react";
import { connect } from "react-redux";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { ICommentPost } from "../ducks/Posts";
import '../styles/PostComment.css'
import InputPost from "./InputPost";
interface IPostCommentProps{
    postId:string,
    submitComment:(a:string)=>void
}

class PostComment extends Component<InjectedFormProps<string,IPostCommentProps> & IPostCommentProps>{
    state={
        readySubmit:false
    }
     handleChange = ({target}:any)=>{
         const ready = (target.value.length > 0) ? true : false;
         this.setState({
            readySubmit:ready
         })
    }
    public render(){
        const {handleSubmit,postId} = this.props;
        return(
            <div className="PostComment">
                <form onSubmit={handleSubmit} >
                    <Field 
                    autoComplete="off"
                    component={InputPost} 
                    name={'comment'}
                    id={postId}
                    placeholder="Add a comment"
                    onChange = {this.handleChange}
                    />
                    <button type="submit" className={`submit-post ${(this.state.readySubmit) ? 'ready' : 'no-ready'}`}>Post</button>
                </form>
            </div>

        )
    }
}

function mapStateToProps(state:any, props:IPostCommentProps) {
    return {
        form:"comment_post_"+ props.postId,
    };
}

export default connect(mapStateToProps)
(reduxForm<string,IPostCommentProps,string>({ enableReinitialize: true })(PostComment));
