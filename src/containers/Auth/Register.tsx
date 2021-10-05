import React,{Component} from 'react';
import Card from '../../components/Card';
import Container from '../../components/Container';
import Title from '../../components/Title';
import RegisterForm from '../../components/RegisterForm';
import {register as registerThunk,ILogin } from '../../ducks/Users';
import { connect } from 'react-redux';

interface ILoginProps{
  register:(a:ILogin) => void
}
class Register extends Component<ILoginProps> {
    public render(){
      const {register} = this.props;
        return(
            <Container center={true}>
            <Card>
              <Title>Register</Title>
              <RegisterForm onSubmit={register}/>
            </Card>
  
      </Container>
        )
    }
}
const mapStateToProps = (state:any) => state;

const mapDispatchToProps = (dispatch:any) => ({
  register: (payload:any) => dispatch(registerThunk(payload))
});

export default connect(mapStateToProps,mapDispatchToProps)(Register)