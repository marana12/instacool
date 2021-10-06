import { AnyAction, Dispatch } from "redux";
import {IServices} from '../services';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile,UserCredential } from "firebase/auth";
import {setDoc,doc  } from 'firebase/firestore';
import { fireStore } from '../services/firebase'
import { type } from "os";

const SET_PROFILE_IMAGE='user/set-profile-image';
const GET_PROFILE_IMAGE='user/get-profile-image';

export const setProfileImage = (payload:string) => ({
    type:SET_PROFILE_IMAGE,
    payload,
})
export interface ILogin {
    first_name:string,
    last_name:string,
    email:string,
    password:string
}

export default function reducer(state={},action:AnyAction) {
    switch(action.type){
        case SET_PROFILE_IMAGE:{
            return {
                ...state,
                profileImage:action.payload
            }
        } 
        default:{
            return state;
        }
    }
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
    
export const loadUserInitialData = () =>
    async (dispatch:Dispatch, getState:() => any, {auth}:IServices) =>{
        console.log(auth)
    }