import { AnyAction, Dispatch } from "redux";
import {IServices} from '../services';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword,updateProfile,UserCredential } from "firebase/auth";
import {setDoc,doc, updateDoc  } from 'firebase/firestore';
import { fireStore, storage } from '../services/firebase'
import { Iprofile } from "./Posts";
import { ref } from "@firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";

const SET_PROFILE_IMAGE='user/set-profile-image';
const GET_PROFILE_IMAGE='user/get-profile-image';
const SET_CURRENT_PROFILE='user/set-current-profile';
export const setProfileImage = (payload:string) => ({
    type:SET_PROFILE_IMAGE,
    payload,
})
export const setCurrentProfile = (payload:Iprofile) => ({
    type:SET_CURRENT_PROFILE,
    payload,
})
export interface ILogin {
    first_name:string,
    last_name:string,
    user_name:string,
    phone:string,
    email:string,
    password:string,
    profileImg:string,
    profile:Iprofile
}

export default function reducer(state={},action:AnyAction) {
    switch(action.type){
        case SET_PROFILE_IMAGE:{
            return {
                ...state,
                profileImage:action.payload
            }
        }
        case SET_CURRENT_PROFILE:{
            return{
                ...state,
                profile:action.payload
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
            const{email,password,first_name,last_name,user_name} = register;

            const result = await createUserWithEmailAndPassword(auth,email,password)
                                .then((userCredential:UserCredential) => {
                                    // Signed in 
                                    updateProfile(userCredential.user,{
                                        displayName: first_name + ' ' + last_name,
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
                    last_name:last_name,
                    user_name:user_name,
                };
    
                await setDoc(doc(fireStore, "users", uid), data);                        

            }

        }
    
export const loadUserInitialData = () =>
    async (dispatch:Dispatch, getState:() => any, {auth}:IServices) =>{
        if(!auth.currentUser){
            return;
        }
        const token = await auth.currentUser.getIdToken()
        const {uid} = auth.currentUser;
        const profliePost =  await fetch('/api/profile/' + uid + '/getprofilepost', {
            headers: {
                authorization: token
            }
        }).then(resp => resp.json());

        dispatch(setProfileImage(profliePost.profileImg));
        dispatch(setCurrentProfile(profliePost))
    }

    export const handleProfileImageSubmit = (payload: { profileImg: File }) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return;
        }
        const { uid } = auth.currentUser;
        const type = payload.profileImg.name.split('.');
        const storageRef = ref(storage, 'profileImages/' + uid + '.' + type[1]);
        const response = await uploadBytes(storageRef, payload.profileImg).then((snapshot) => {
            return snapshot;
        });

        const url = await getDownloadURL(response.ref);
        console.log(url)
        
        const data={
            profileImg:url
        };

        await updateDoc(doc(fireStore, "users", uid), data);

        dispatch(setProfileImage(url));

    }