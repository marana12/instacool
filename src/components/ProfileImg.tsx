import React,{Component} from "react";
import { reduxForm,InjectedFormProps,Field,WrappedFieldProps, WrappedFieldInputProps} from "redux-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera} from '@fortawesome/free-solid-svg-icons';
const style={
    img:{
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width:'100%',
    }as React.CSSProperties,
    file:{
        display:'none'
    } as React.CSSProperties,
    logoContent:{
        backgroundColor: "rgba(var(--b3f,250,250,250),1)",
        borderRadius:'50%',
        boxSizing: 'border-box',
        height: '100%',
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    } as React.CSSProperties,
    imgButton:{
        border: 0,
        cursor: 'pointer',
        height:'100%',
        padding: 0,
        width:' 100%',
    } as React.CSSProperties
}
const handleChange =(submitProfileImg:()=>void,input:WrappedFieldInputProps) =>
                   async (e:React.ChangeEvent<HTMLInputElement>) =>{
    e.preventDefault();
    const {onChange} = input;
    const {files} = e.target;
    if(files){
      await onChange(files[0])
        submitProfileImg()
    }
}
interface IProfileImg{
    submitProfileImg: () => void,
    handleProfileImageSubmit:(a:{profileImg:File}) => void,
    profileImage:string,
}
const RenderField: React.FunctionComponent<WrappedFieldProps & IProfileImg> = ({input,submitProfileImg,profileImage}) =>
<div>
    <input onChange = {handleChange(submitProfileImg,input) } style={style.file} type="file" id='profileImage' accept="image/jpeg image/jpg" />
    <div style={{height:'150px',width:'150px'}}>
        <div style={style.logoContent}>
            <label htmlFor="profileImage" style={style.imgButton}>
                <img style={style.img} src={profileImage} title="press to change profile"/>

            </label>
        </div>
    </div>

 
</div>


 class ProfileImg extends Component<InjectedFormProps<({profileImg:File}),IProfileImg>  & IProfileImg >{
    public render(){
        const {handleSubmit,submitProfileImg,profileImage} = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <Field 
                component={RenderField} 
                name='profileImg'
                profileImage={profileImage}
                submitProfileImg={submitProfileImg}/>
            </form>
        )
    }
}
export default reduxForm<({profileImg:File}),IProfileImg>({
    form:'profileImg'
})(ProfileImg)