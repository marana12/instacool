import React,{Component} from "react";
import { reduxForm,InjectedFormProps,Field,WrappedFieldProps, WrappedFieldInputProps} from "redux-form";

const style={
    img:{
        borderRadius:'100%',
        width:'100px',
    }as React.CSSProperties,
    file:{
        display:'none'
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
    <label htmlFor="profileImage">
        <img style={style.img} src={profileImage}/>
    </label>
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