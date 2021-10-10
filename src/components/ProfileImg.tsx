import React,{Component} from "react";
import { reduxForm,InjectedFormProps,Field,WrappedFieldProps, WrappedFieldInputProps} from "redux-form";
import '../styles/ProfileImg.css';

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
    <input onChange = {handleChange(submitProfileImg,input) } className="file-input" type="file" id='profileImage' accept="image/jpeg image/jpg" />
    <div className="profile-img-container">
        <div className="profile-img-content">
            <label htmlFor="profileImage" className="img-button">
                <img src={profileImage} title="Press to change profile"/>
            </label>
        </div>
    </div>

 
</div>


 class ProfileImg extends Component<InjectedFormProps<({profileImg:File}),IProfileImg>  & IProfileImg >{
    public render(){
        const {handleSubmit,submitProfileImg,profileImage} = this.props;
        return(
            <div className="ProfileImg">
                <form onSubmit={handleSubmit}>
                    <Field 
                    component={RenderField} 
                    name='profileImg'
                    profileImage={profileImage}
                    submitProfileImg={submitProfileImg}/>
                </form>
        </div>


        )
    }
}
export default reduxForm<({profileImg:File}),IProfileImg>({
    form:'profileImg'
})(ProfileImg)