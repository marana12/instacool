import React,{Component} from "react";
import '../styles/Container.css'

interface IContainerProps{
    center?:boolean
}

class Container extends Component<IContainerProps>{
    public render(){
        const {children,center=false} = this.props;
        return(
            <div  className={`Container ${ center ? 'center' : ''}`}  >
                {children}
            </div>
        )
    }
}
export default Container;