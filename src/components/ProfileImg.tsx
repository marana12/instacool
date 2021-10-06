import React,{Component} from "react";
import { reduxForm,InjectedFormProps,Field,WrappedFieldProps, WrappedFieldInputProps} from "redux-form";

const style={
    img:{
        borderRadius:'100%',
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
    handleProfileImageSubmit:(a:{file:File}) => void,

}
const RenderField: React.FunctionComponent<WrappedFieldProps & IProfileImg> = ({input,submitProfileImg}) =>
<div>
    <input onChange = {handleChange(submitProfileImg,input) } style={style.file} type="file" id='profileImage' accept="image/jpeg image/jpg" />
    <label htmlFor="profileImage">
        <img style={style.img} src={"http://placekitten.com/100/100"}/>
    </label>
</div>


 class ProfileImg extends Component<InjectedFormProps<{file:File},IProfileImg>  & IProfileImg >{
    public render(){
        const {handleSubmit,submitProfileImg} = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <Field name='profileImg' component={RenderField} submitProfileImg={submitProfileImg}/>
            </form>
        )
    }
}
export default reduxForm<{file:File},IProfileImg>({
    form:'profileImg'
})(ProfileImg)