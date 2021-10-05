import React,{Component} from "react";
import ProfileImg from '../components/ProfileImg';
import Card from '../components/Card';
import Button from "./Button";
import * as postsDuck from '../ducks/Posts';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import services from "../services";
const {auth} = services;
const style={
    container:{
        margin:'40px 80px',
        padding:'15px',
    }as React.CSSProperties,
    topRow:{
        display:'flex',
        justifyContent:'space-between',
    }as React.CSSProperties,
    row:{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom:'10px'
    }as React.CSSProperties,
    imgRow:{
        marginLeft:'15px',
        marginRight:'15px',
    } as React.CSSProperties,
    img:{
        width:'330px',
        height:'auto',
    }as React.CSSProperties,
}
interface IProfileProps{
    fetchPosts:() => void,
    fetched:boolean,
    loading:boolean,
    data:postsDuck.IPost[][]
    
}
 class Profile extends Component<IProfileProps>{
    constructor(props:IProfileProps){
        super(props)
        const {fetchPosts,fetched,data} = props;
        console.log(data)
        if(fetched){
            return
        }else{

           fetchPosts();

        }
    }
    public render(){
        const { data } = this.props;

        return(
            <div style={style.container}>
                <div style={style.topRow}>
                    <ProfileImg/>
                    <Button>Add</Button>
                </div>
                <div style={style.imgRow}>
                {
                    data.map((x, i)=>
                        <div key={i} style={style.row}>
                            {x.map((y,ind) => 
                                    <Card key={ind}><img style={style.img} src={y.imageUrl}/></Card>

                                )}
                        </div>
                    )
                }
                </div>


            </div>
        )
    }
}
const mapStateToProps = (state:any) => {
    const {Posts: {data,fetched,fetching}} = state;
    const loading = fetching || !fetched;

    const filteredPosts = Object.keys(data).reduce((acc,el)=>{
        if(data[el].userId !== auth.currentUser?.uid){
            return acc;
        }
        return acc.concat(data[el]);
    }, [] as postsDuck.IPost[]);


    const splitArrayIntoChunksOfLen = (arr:postsDuck.IPost[], len:number) => {
        var chunks = [], i = 0, n = arr.length;
        while (i < n) {
          chunks.push(arr.slice(i, i += len));
        }
        return chunks;
      }
      
     const posts = splitArrayIntoChunksOfLen(filteredPosts,3)
    return {
        loading,
        fetched,
        data:posts
    }
};
const mapDispatchToProps = (dispatch:ThunkDispatch<any,any,any>) => bindActionCreators(postsDuck, dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Profile);