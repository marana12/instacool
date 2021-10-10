import { connect } from "react-redux";
import React,{Component} from "react";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import * as postsDuck from '../../ducks/Posts';
import defaultImg from '../../assets/loader.gif';
import Container from "../../components/Container";
import Post from "../../components/Post";
import  '../../styles/NewsFeed.css'
interface INewsFeedProps{
    fetchPosts:() => void,
    like:(a:string)=>void,
    share:(a:string)=>void,
    submitComment:(a:postsDuck.ICommentPost) =>void,
    fetched:boolean,
    loading:boolean,
    data:postsDuck.IDataPost,
    likePost:postsDuck.ILikePost,
    
}
 class NewsFeed extends Component<INewsFeedProps>{

     constructor(props:INewsFeedProps){
         super(props)
         const {fetchPosts,fetched} = props;
         if(fetched){
             return
         }else{

            fetchPosts();

         }
     }
    public render(){
        const {data,loading,fetched,likePost,submitComment} =this.props;
        return(
            <main  className="NewsFeed" >
                <Container center={false} >
                    {
                        fetched ?
                            Object.keys(data).map(x => {
                                const post = data[x]
                                if(likePost.id){
                                    if(x === likePost.id){
                                        post.like=likePost.hasLike || false
                                    }
                                }
                                return <div key={x} className="card" >
                                    
                                            <Post
                                                img={ post.imageUrl}
                                                like={this.handleLike(x)}
                                                share={this.handleShare(x)}
                                                submitComment={this.handleComment(x)}
                                                hasLike={post.like}
                                                comment={post.comment}
                                                createdPost ={post.createdAt.toDate()}
                                                postId={x}/>
                                            
                                    </div>
                            })
                            :
                            <div className="card" >
                                                <Post
                                                img={defaultImg}
                                                like={this.handleLike('')}
                                                share={this.handleShare('')}
                                                submitComment={this.handleComment('')}
                                                hasLike={false}
                                                comment={''}
                                                postId=""/>
                                            
                                    </div>

                    }
                  

                </Container>
                
            </main>
        )
    }
    private handleLike = (id:string) => () =>{
        const {like} = this.props;
       like(id);
    }
    private handleShare = (id:string) => () =>{
        const {share} = this.props;
        share(id);
    }
    private handleComment = (id:string) => (comment:any) =>{
        var setComment = {
            id,comment
        } as postsDuck.ICommentPost;


        const {submitComment} = this.props;
        submitComment(setComment);
    }
}

const mapStateToProps = (state:any) => {
    const {Posts: {data,fetched,fetching,likePost}} = state;
    const loading = fetching || !fetched;
    return {
        loading,
        fetched,
        data,
        likePost
        
    }
};
const mapDispatchToProps = (dispatch:ThunkDispatch<any,any,any>) => bindActionCreators(postsDuck, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(NewsFeed);