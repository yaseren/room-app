import Janus from 'janus-gateway'

const Room = (props) => {
    return (
        
        Janus.init({
                debug: 'debug',
                callback:()=>{
                    console.log("initialized");
                },
                //dependencies: Janus.useDefaultDependencies()
            })
        
    )
    
}


export default Room;