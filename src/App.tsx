import React,{useEffect,useState} from 'react';
import './styles/App.css'; 
import {Route} from 'react-router-dom';
import {History} from 'history';
import NavBar from './components/NavBar';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import services from './services';
import Profile from './containers/Profile';
import NewsFeed from './containers/NewsFeed';

interface IAppProps{
  history:History,
  loadInitialData:() => void,
}
function App(props:IAppProps) {

  const [state,setState] = useState({
    loading:true
  });

  //Mounted
  useEffect(() =>{ 
    const {auth} = services;
    auth.onAuthStateChanged(user=>{
      const pathName = window.location.pathname;
      const {history} = props;
      if(user){
        const {loadInitialData} = props;
         loadInitialData();
        if (['/','/login','/register'].indexOf(pathName) > -1 ){
          history.push('/app/newsfeed');
        }
      }
      else{
        if(/app\/./.test(pathName)){ //app/<PATH>
          history.push('/');
        } 
      }
      setState({
        loading:false
      });
    });

}, [props]);

  const {loading} = state;
  return (
    loading?<h2>Loading...</h2> : 
        <div>
          {/* <BrowserRouter> */}
              <Route exact path='/' component={Login}/>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/register' component={Register}/>
              <Route exact path='/app/profile' component={Profile}/>
              <Route path='/app' component={NavBar}/>
              <Route exact path='/app/newsfeed' component={NewsFeed}/>    

          {/* </BrowserRouter> */}
        </div>
  );
}

export default App;
