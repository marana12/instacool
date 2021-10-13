import React, { Component } from 'react'
import '../styles/PostHeader.css';
import profile from '../assets/profile.png';

interface IPostHeaderProps {
    userId: string,
    profileImg: string,
    user_name: string,
}


export default class PostHeader extends Component<IPostHeaderProps>{

    public render() {
        const { profileImg, user_name } = this.props;

        return (
            <div className='PostHeader'>
                <div className="user-profile-img">
                    <div className="redonded-img">
                        <img src={profileImg ? profileImg : profile} alt={user_name} />
                    </div>
                </div>
                <div className='user-post'>
                    <span className='user-name'>{user_name}</span>
                </div>
            </div>
        )
    }
}