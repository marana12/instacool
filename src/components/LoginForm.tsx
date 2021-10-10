import React,{Component} from "react";
import Button from './Button';
import Input from './Input';
import Center from './Center';
import {Link} from 'react-router-dom';
import { reduxForm ,InjectedFormProps,Field } from 'redux-form';
import { ILogin } from "../ducks/Users";


 class LoginForm extends Component<InjectedFormProps<ILogin>> {
    public render(){
        const {handleSubmit} = this.props

        return(
            <form onSubmit={handleSubmit}>
                <Field label="Email" name="email" type="email" placeholder="Email" component={Input}/>
                <Field label="Password" name="password" type="password" placeholder="Password" component={Input}/>
                <Button block={true}>Send</Button>
                <Center>
                    <Link to='/register'>new user?</Link>
              </Center>
            </form>

        )
    }
}
export default reduxForm<ILogin>({
    form:'login',
})(LoginForm)