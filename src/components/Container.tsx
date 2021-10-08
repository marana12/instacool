import React,{Component} from "react";
const style = (center:boolean) =>({
    alignItems: center ?'center' : undefined,
    // backgroundColor:'#eee',
    display:'flex',
    flexDirection:'column',
    justifyContent:center ?'center' : undefined,
    padding:'10px 15px',
} as React.CSSProperties);

interface IContainerProps{
    center?:boolean
}

class Container extends Component<IContainerProps>{
    public render(){
        const {children,center=false} = this.props;
        return(
            <div style={style(center)}>
                {children}
            </div>
        )
    }
}
export default Container;