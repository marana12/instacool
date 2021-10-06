import { AnyAction, Dispatch } from "redux";
import {IServices} from '../services';
import {getDocs,collection,Timestamp, getDoc,doc ,orderBy, query,limit } from 'firebase/firestore';
import {ref,getDownloadURL,uploadBytes}  from "firebase/storage";
import { fireStore,storage } from '../services/firebase'
import {download} from '../utils';
const START = 'posts/fetch-start';
const SUCCESS = 'posts/fetch-success';
const ERROR = 'posts/fetch-error';
const ADD = 'post/add';

export interface IPost{
    comment:string,
    userId:string,
    createdAt:Timestamp,
    imageUrl:string
}
export interface IDataPost{
    [key:string]:IPost,

}
const fetchStart = () =>({
    type:START
});
const fetchSuccess = (payload:IDataPost) =>({
    type:SUCCESS,
    payload,
});
const fetchError = (error:Error) =>({
    type:ERROR,
    error,
});
const add = (payload:IDataPost) =>({
    type:ADD,
    payload,
});

const initial={
    data:{},
    fetched:false,
    fetching:false,
}

export default function reducer(state = initial,action:AnyAction){
    switch(action.type){
        case START:
            return {
                ...state,
                fetching:true
            }
        case SUCCESS:
            return{
                ...state,
                data: action.payload,
                fetched:true,
                fetching:false
            }
        case ADD:
            return{
                ...state,
                data:{
                    ...state.data,
                    ...action.payload
                }
            }
        case ERROR:
            return{
                ...state,
                error: action.error,
                fetching:false
            }     
        default:
            return state
    }
}

export const fetchPosts = () =>
    async (dispatch:Dispatch, getState:() => any, {}:IServices) => {
        dispatch(fetchStart())
        try {
            const q = query(collection(fireStore, "posts"), orderBy('createdAt','desc'),)
            const snapsPosts = await getDocs(q);
            const posts:any = {};
            snapsPosts.forEach(p => posts[p.id] = p.data());
            console.log(posts)
            const imgIds:Array<any> = await Promise.all(Object.keys(posts)
                                            .map(async x => {
                                                const url = await getDownloadURL(ref(storage,`posts/${x}.jpg`));
                                                return [x,url]
                                            }));
            const keyedImages:any = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1]);

            Object.keys(posts).forEach(x => posts[x] = {
                ...posts[x],
                imageUrl:keyedImages[x],
            });

            dispatch(fetchSuccess(posts))
        } catch (e:any) {
            console.error(e)
            dispatch(fetchError(e))
        }
    }
export const like = (id:string) =>
    async (dispatch:Dispatch, getState:() => any, {auth}:IServices) =>{
        if(!auth.currentUser){
            return;
        }

        const token = await auth.currentUser.getIdToken();
        const result = await fetch('/api/posts/'+id+'/like',{
            headers:{
                authorization:token
            }
        })
        const text = await result.text();
    }
export const share = (id:string) =>
    async (dispatch:Dispatch, getState:() => any, {auth}:IServices) =>{
        if(!auth.currentUser){
            return;
        }

        const token = await auth.currentUser.getIdToken();
        const result = await fetch('/api/posts/'+id+'/share',{
            headers:{
                authorization:token
            }
        });

        const url = await getDownloadURL(ref(storage,`posts/${id}.jpg`));
        const blob = await download(url) as Blob;
        const {id:postId}:{id:string} = await result.json();
        const imgRef = ref(storage,`posts/${postId}.jpg`)
        await uploadBytes(imgRef,blob);
        const imageUrl = await getDownloadURL(imgRef);
        const snap = await getDoc(doc(fireStore,"posts",postId));

        dispatch(add({[snap.id]: {
            ...snap.data(),
            imageUrl
        }} as IDataPost));
    }
export const handleProfileImageSubmit = (payload: {file:File}) =>
    async (dispatch:Dispatch, getState:() => any, {}:IServices)=>{
        console.log(payload)
    }