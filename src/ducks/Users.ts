import { Dispatch } from "redux";
import {IServices} from '../services';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile,UserCredential } from "firebase/auth";
import {setDoc,doc  } from 'firebase/firestore';
import { fireStore } from '../services/firebase'
// import { doc, setDoc } from "@firebase/firestore";

export interface ILogin {
    first_name:string,
    last_name:string,
    email:string,
    password:string
}

export default function reducer(state={}) {
    return state;
}

export const login = (login:ILogin) => 
  async (dispatch:Dispatch, getState:() => any, {auth}:IServices) => {
            const{email,password} = login;
                 await signInWithEmailAndPassword(auth,email,password)
                                .then((userCredential:UserCredential) => {
                                    // Signed in 
                                    return userCredential;
                                    }).catch(error=>{
                                        return error;
                                    });

        }

export const register = (register:ILogin) => 
  async (dispatch:Dispatch, getState:() => any, {auth,db}:IServices) => {
            const{email,password,first_name,last_name} = register;

            const result = await createUserWithEmailAndPassword(auth,email,password)
                                .then((userCredential:UserCredential) => {
                                    // Signed in 
                                    updateProfile(userCredential.user,{
                                        displayName: first_name + ' ' + last_name 
                                        }).then(resp => resp)
                                        .catch(error => error);
                                        return userCredential;
                                    
                                    }).catch(error=>{
                                        return error;
                                    });


            const {user} = result;
            if(user){
                const {uid} = user;
                const data={
                    role:'user',
                    first_name:first_name,
                    last_name:last_name
                };
    
                await setDoc(doc(fireStore, "users", uid), data);                        

            }

        }
    
