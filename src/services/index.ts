import {auth,storage,fireStore} from './firebase';

import * as firebase from './firebase';
import { Firestore } from '@firebase/firestore';
import { FirebaseStorage } from '@firebase/storage';
import { Auth } from '@firebase/auth';
const services = {
    ...firebase
}
export interface IServices{
    db:Firestore,
    storage:FirebaseStorage,
    auth:Auth
}
export default services;