import React,{Component} from "react";
import Button from './Button';
import Input from './Input';
import Center from './Center';
import {Link} from 'react-router-dom';
import { reduxForm ,InjectedFormProps,Field } from 'redux-form';
import { ILogin } from "../ducks/Users";


 class RegisterForm extends Component<InjectedFormProps<ILogin>> {
    public render(){
        const {handleSubmit} = this.props

        return(
            <form onSubmit={handleSubmit}>
                <Field label="First name" name="first_name" type="text" placeholder="First name" component={Input}/>
                <Field label="Last name" name="last_name" type="text" placeholder="Last name" component={Input}/>
                <Field label="User name" name="user_name" type="text" placeholder="User name" component={Input}/>
                <Field label="Email" name="email" type="email" placeholder="Email" component={Input}/>
                <Field label="Password" name="password" type="password" placeholder="Password" component={Input}/>
                <Button block={true}>Send</Button>
              <Center>
                <Link to='/login'>have a acount?</Link>
              </Center>
            </form>

        )
    }
}
export default reduxForm<ILogin>({
    form:'register',
})(RegisterForm)