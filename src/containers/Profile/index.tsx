import React,{Component} from "react";
import * as postsDuck from '../../ducks/Posts';
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { bindActionCreators } from "redux";
import services from "../../services";
import ProfileImg from "../../components/ProfileImg";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { submit } from "redux-form";
import profile from '../../assets/profile.png';
import defaultImg from '../../assets/loader.gif';
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
export interface IProfileProps{
    fetchPosts:() => void,
    submitProfileImg:() =>void,
    handleProfileImageSubmit:(a:{profileImg:File}) => void,
    fetched:boolean,
    loading:boolean,
    data:postsDuck.IPost[][],
    profileImage:string
    
}

 class Profile extends Component<IProfileProps>{
     state = {
         posts:[]
     }
    constructor(props:IProfileProps){
        super(props)
        const {fetchPosts,fetched} = props;

        if(fetched){
            return
        }else{
           fetchPosts();

        }
    }
    public render(){
        const { data,submitProfileImg,handleProfileImageSubmit,profileImage,fetched } = this.props;
       
        return(
            <div style={style.container}>
                <div style={style.topRow}>
                    <ProfileImg onSubmit={handleProfileImageSubmit} submitProfileImg={submitProfileImg} handleProfileImageSubmit={handleProfileImageSubmit} profileImage={profileImage} />
                    <Button>Add</Button>
                </div>
                <div style={style.imgRow}>
                    
                {   fetched ?
                        data.map((x, i)=>
                            <div key={i} style={style.row}>
                                {x.map((y,ind) => 
                                        <Card key={ind}><img style={style.img} src={(y.imageUrl)}/></Card>

                                    )}
                            </div>
                        ):
                        <React.Fragment>
                            <div style={style.row}>
                                <Card ><img style={style.img} src={defaultImg}/></Card>
                                <Card ><img style={style.img} src={defaultImg}/></Card>
                                <Card ><img style={style.img} src={defaultImg}/></Card>
                            </div> 
                            <div style={style.row}>
                                <Card ><img style={style.img} src={defaultImg}/></Card>
                                <Card ><img style={style.img} src={defaultImg}/></Card>
                                <Card ><img style={style.img} src={defaultImg}/></Card>
                            </div> 
                        </React.Fragment>

                        
                }
    
 
                      
                        
                
                </div>


            </div>
        )
    }
}
const mapStateToProps = (state:any) => {
    const {Posts: {data,fetched,fetching}} = state;
    const {Users: {profileImage:tempPI}} = state;

    const loading = fetching || !fetched;
    const profileImage = tempPI || profile;
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
        data:posts,
        profileImage,
    }
};
const mapDispatchToProps = (dispatch:ThunkDispatch<any,any,any>) => bindActionCreators({
    ...postsDuck,
    submitProfileImg:() => submit('profileImg')},
    dispatch);
export default connect(mapStateToProps,mapDispatchToProps)(Profile);