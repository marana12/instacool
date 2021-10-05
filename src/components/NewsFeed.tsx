import { connect } from "react-redux";
import React,{Component} from "react";
import Container from "./Container";
import Post from './Post'
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import * as postsDuck from '../ducks/Posts';
import logo from '../../src/assets/loader.gif'
interface INewsFeedProps{
    fetchPosts:() => void,
    like:(a:string)=>void,
    share:(a:string)=>void,
    fetched:boolean,
    loading:boolean,
    data:postsDuck.IDataPost
    
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
        const {data,loading,fetched} =this.props;
        console.log("Loading: "+loading," Fetched: "+ fetched)
        return(
            <div style={{marginTop:'40px'}}>
                <Container center={false} >
                    
                    {Object.keys(data).map(x => {
                        const post = data[x]

                        return <div key={x} style={{margin:'3px auto'}}>

                                    <Post
                                        img={  post.imageUrl}
                                        like={this.handleLike(x)}
                                        share={this.handleShare(x)}/>
                                    
                            </div>
                    })}

                </Container>
                
            </div>
        )
    }
    private handleLike =(id:string) => () =>{
        const {like} = this.props;
        like(id);
    }
    private handleShare =(id:string) => () =>{
        const {share} = this.props;
        share(id);
    }
}

const mapStateToProps = (state:any) => {
    const {Posts: {data,fetched,fetching}} = state;
    const loading = fetching || !fetched;
    return {
        loading,
        fetched,
        data
    }
};
const mapDispatchToProps = (dispatch:ThunkDispatch<any,any,any>) => bindActionCreators(postsDuck, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(NewsFeed);