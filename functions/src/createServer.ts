import * as express from 'express';
import * as admin from 'firebase-admin';

interface IRequest extends express.Request{
    user:{
        uid:string,
        email:string,
        role:string
    }
}

admin.initializeApp({
    credential:admin.credential.applicationDefault(),
});

const db = admin.firestore();
const auth = admin.auth();
export default () => {
    const app = express();
    app.use( async (req,res,next)=>{
        const token = req.headers.authorization ? req.headers.authorization : '';
        try {
            const {uid,email} = await auth.verifyIdToken(token);
            const snap = await db.collection('users').doc(uid).get();
            const user = snap.data();
    
            Object.assign(req,{
                user:{
                    ...user,
                    uid,
                    email
                }
            })
            next()
        } catch (error) {
            console.log(error)
            res.status(403).send({
                message:'Failed to authenticate',
                status:403
            })
        }

    });

    app.get('/posts/:postId/like',async (req:IRequest ,res:any)=>{
        const {uid} = req.user;
        const {postId} = req.params;
        const snaps = await db.collection('likes')
            .where('userId','==',uid)
            .where("postId","==",postId)
            .limit(1)
            .get();

        const result:{id?:string} = {};
        var hasLike:boolean=false;
        var countLikes:number = 0;
        snaps.forEach(x => Object.assign(result, {...x.data(), id: x.id}));
        if(result.id){
           await db.collection('likes').doc(result.id).delete();
           hasLike=false;
        }
        if(!result.id){
            await db.collection('likes').doc().set({
                userId:uid,
                postId,
                createdAt: new Date(),
            });
            hasLike = true
         }
        const snapsTotal = await db.collection('likes')
        .where("postId","==",postId)
        .get();
        const totalLikes = snapsTotal.size;
         console.log(totalLikes)
        res.status(200).send({
            id:postId,
            hasLike,
            totalLikes
        });
    });

    app.get('/posts/:postId/getlike',async (req:IRequest ,res:any)=>{
        const {uid} = req.user;
        const {postId} = req.params;
        const snaps = await db.collection('likes')
            .where('userId','==',uid)
            .where("postId","==",postId)
            .limit(1)
            .get();

        const result:{id?:string} = {};
        var hasLike:boolean=false;
        snaps.forEach(x => {
            Object.assign(result, {...x.data(), id: x.id})
        });

        if(result.id){
            hasLike = true
         }
         const snapsTotal = await db.collection('likes')
         .where("postId","==",postId)
         .get();

        const totalLikes = snapsTotal.size;
        res.status(200).send({
            id:postId,
            hasLike,
            totalLikes
        });
    });


    app.get('/posts/:postId/share',async (req:IRequest ,res:any)=>{
        const {uid} = req.user;
        const {postId} = req.params;
        const snap = await db.collection("posts").doc(postId).get();
        const post = snap.data();
        const result = await db.collection("posts").add({
            ...post,
            createdAt: new Date(),
            userId:uid,
        });
        res.send({ id: result.id})


    });

    app.post('/posts/:postId/comment',async (req:IRequest ,res:any)=>{
        const {uid} = req.user;
        const {postId} = req.params;
        const {comment} = JSON.parse(req.body);
        if(!comment.comment){
            res.status(404).send({
                message:"comment field is empty"
            });
        }
        await db.collection('comments').doc().set({
            userId:uid,
            postId,
            comment:comment.comment,
            createdAt: new Date(),})


        res.sendStatus(204)


    });

    app.get('/posts/:postId/getcomment',async (req:IRequest ,res:any)=>{
        const {postId} = req.params;

        const snaps = await db.collection('comments')
        .where("postId","==",postId)
        .get();

        const result:{id?:string} = {};

        snaps.forEach(x => {
            
            Object.assign(result, {...x.data(), id: x.id})
        });
        res.sendStatus(204)


    });
    app.get('/profile/:userId/getprofilepost',async (req:IRequest ,res:any)=>{
        const {userId} = req.params;
        console.log(userId)
        const snaps = await db.collection('users')
        .doc(userId)
        .get();
        const own_post= snaps.data();
        res.status(200).send(own_post)


    });
    return app;
}