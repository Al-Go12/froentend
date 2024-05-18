import React, { useRef,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";






const RoomPage=()=>{
    let { roomId } = useParams();
    const navigate=useNavigate()
    const containerRef = useRef(null);
    
    const user=useSelector(state=>state.authentication_user.userProfile)
    const handleLeaveRoom = () => {
        navigate('/messages');
    }
    
    
    useEffect(()=>{
    

        const myMeeting= async ()=>{
            const userID = user.id.toString();
    
            const userName =user.username ;
          
            const roomID=roomId
            const appID=1407489276;
            const serverSecret="d7fcf37d3b945ec7f887333a29e73cd9";
            const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appID,
              
                
                
                serverSecret,
                roomID,
                userID, 
                userName
                
                )
            
    
            const zc =ZegoUIKitPrebuilt.create(kitToken)
    
            zc.joinRoom({
                container:containerRef.current,
                scenario:{
                    mode:ZegoUIKitPrebuilt.OneONoneCall,
                },
                turnOnCameraWhenJoining: true,
                turnOnMicrophoneWhenJoining: true,
                showPreJoinView: false,  
                showScreenSharingButton:false, 
              onLeaveRoom:handleLeaveRoom,
        }) }  


           myMeeting()


    },[user, roomId])
 
    


    
    
    
     return (
        <div>
        <div className="w-full h-full"ref={containerRef} />
        </div>
   )
     
    

    }
    


  




export default RoomPage