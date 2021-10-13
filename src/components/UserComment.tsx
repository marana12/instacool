import Reatc,{Component} from 'react';
import Moment from 'react-moment';
import '../styles/UserComment.css';
import { Iprofile } from "../ducks/Posts";


class UserComment extends Component {
    public render(){
        return(
            <div className='UserComment'>
                <div className='user-profile-img'>
                    <div className='redonded-img'>
                        <img src="https://yt3.ggpht.com/a/AATXAJxmz8IxNeeOlQmKcbmp1AglKdPrMoYvXBSbvQ=s900-c-k-c0xffffffff-no-rj-mo" alt="shrek" />
                    </div>

                </div>
                
                <div className='users-comment comment-handle'>
                    <span className="user-name">Julio</span>&nbsp;
                    <span>this is a text from test</span> 
                    <span className='commented-time'>
                        <span aria-hidden="true">&nbsp;·&nbsp;</span>
                            <Moment fromNow interval={1}>
                                {new Date("10/11/2021 18:20")}
                            </Moment>
                    </span>

                </div>
            </div>    
        )
    }
}
export default UserComment;