import { AnyAction, Dispatch } from "redux";
import { IServices } from '../services';
import { getDocs, collection, Timestamp, getDoc, doc, orderBy, query, limit,updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes, } from "firebase/storage";
import { fireStore, storage } from '../services/firebase'
import { download } from '../utils';
import { setProfileImage } from "./Users";
import ProfileImg from "../components/ProfileImg";
const START = 'posts/fetch-start';
const SUCCESS = 'posts/fetch-success';
const ERROR = 'posts/fetch-error';
const ADD = 'post/add';
const LIKE = 'post/like';
export interface IPost {
    comment: string,
    userId: string,
    createdAt: Timestamp,
    imageUrl: string,
    like:boolean
}

export interface IDataPost {
    [key: string]: IPost,

}
export interface ILikePost{
    id:string,
    hasLike?:boolean
}
export interface ICommentPost{
    id:string,
    comment:string
}
const fetchStart = () => ({
    type: START
});
const fetchSuccess = (payload: IDataPost) => ({
    type: SUCCESS,
    payload,
});
const fetchError = (error: Error) => ({
    type: ERROR,
    error,
});
const add = (payload: IDataPost) => ({
    type: ADD,
    payload,
});
const setLike = (payload: ILikePost) => ({
    type: LIKE,
    payload
})
const initial = {
    data: {},
    fetched: false,
    fetching: false,
    likePost:{},
}

export default function reducer(state = initial, action: AnyAction) {
    switch (action.type) {
        case START:
            return {
                ...state,
                fetching: true
            }
        case SUCCESS:
            return {
                ...state,
                data: action.payload,
                fetched: true,
                fetching: false
            }
        case ADD:
            return {
                ...state,
                data: {
                    ...state.data,
                    ...action.payload
                }
            }
        case LIKE:
            return {
                ...state,
                likePost:action.payload
                ,
            }

        case ERROR:
            return {
                ...state,
                error: action.error,
                fetching: false
            }
        default:
            return state
    }
}

export const fetchPosts = () =>
    async (dispatch: Dispatch, getState: () => any, {auth }: IServices) => {
        dispatch(fetchStart())
        try {
            if (!auth.currentUser) {
                return;
            }
            const token = await auth.currentUser.getIdToken()

            const q = query(collection(fireStore, "posts"), orderBy('createdAt', 'desc'),)
            const snapsPosts = await getDocs(q);
            const posts: any = {};

            snapsPosts.forEach(p => posts[p.id] = p.data());
            
            const imgIds: Array<any> = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const url = await getDownloadURL(ref(storage, `posts/${x}.jpg`));
                    return [x, url]
                }));

            const likesArr: Array<any> = await Promise.all(Object.keys(posts)
                .map(async x => {
                    const result = await fetch('/api/posts/' + x + '/like', {
                        headers: {
                            authorization: token
                        }
                    });
                    const message = await result.json();
                    return [x, message.hasLike]
                }));

            const keyedImages: any = {}
            const keyedLikes: any = {}
            imgIds.forEach(x => keyedImages[x[0]] = x[1]);
            likesArr.forEach(x => keyedLikes[x[0]] = x[1])
            Object.keys(posts).forEach(x => {
                
                posts[x] = {
                ...posts[x],
                imageUrl: keyedImages[x],
                like:keyedLikes[x]
            }
        });

        dispatch(fetchSuccess(posts))
        } catch (e: any) {
            console.error(e)
            dispatch(fetchError(e))
        }
    }
export const like = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return;
        }

        const token = await auth.currentUser.getIdToken();
        const result = await fetch('/api/posts/' + id + '/like', {
            headers: {
                authorization: token
            }
        })
        const message = await result.json();
        dispatch(setLike(message))
    }

export const share = (id: string) =>
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) => {
        if (!auth.currentUser) {
            return;
        }

        const token = await auth.currentUser.getIdToken();
        const result = await fetch('/api/posts/' + id + '/share', {
            headers: {
                authorization: token
            }
        });

        const url = await getDownloadURL(ref(storage, `posts/${id}.jpg`));
        const blob = await download(url) as Blob;
        const { id: postId }: { id: string } = await result.json();
        const imgRef = ref(storage, `posts/${postId}.jpg`)
        await uploadBytes(imgRef, blob);
        const imageUrl = await getDownloadURL(imgRef);
        const snap = await getDoc(doc(fireStore, "posts", postId));

        dispatch(add({
            [snap.id]: {
                ...snap.data(),
                imageUrl
            }
        } as IDataPost));
    }
export const submitComment = (commentPost:ICommentPost) => 
    async (dispatch: Dispatch, getState: () => any, { auth }: IServices) =>{
        if (!auth.currentUser) {
            return;
        }
        const {id,comment} = commentPost;
        console.log(comment)
        const token = await auth.currentUser.getIdToken();
        const response = await fetch('/api/posts/' + id + '/comment', {
            method: 'POST',
            headers: {
                authorization: token,
                contentType: 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({
              comment,
            }),
          })
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

        
        const data={
            profileImg:url
        };

        await updateDoc(doc(fireStore, "users", uid), data);

        dispatch(setProfileImage(url));

    }