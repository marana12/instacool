import { Component } from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import Input from "./Input";

class PostComment extends Component<InjectedFormProps>{
    public render(){
        const {handleSubmit} = this.props;
        return(
            <form onSubmit={handleSubmit}>
                <Field 
                component={Input} 
                name='profileImg'
                />
            </form>
        )
    }
}
export default reduxForm({
    form:'profileImg'
})(PostComment)