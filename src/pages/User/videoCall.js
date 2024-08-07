import React, { useRef,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';





const RoomPage=()=>{
    let { roomId } = useParams();
    const navigate=useNavigate()
    const containerRef = useRef(null);
    
    const user=useSelector(state=>state.authentication_user.userProfile)
    const handleLeaveRoom = () => {
        navigate('/messages');
    }
    
    
    useEffect(()=>{
    

        const myMeeting= async (element)=>{
            const userID = user.id.toString();
    
            const userName =user.username ;
          
            const roomID=roomId
            const appID=2131821859;
            const serverSecret="4aed30dc53baee65dac38423e67bdb18";
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


    },[])
 
    


    
    
    
     return <div>
           <div className="w-full h-full"ref={containerRef} />
         </div>

    }
    


  




export default RoomPage