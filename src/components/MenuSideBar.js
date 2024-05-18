import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { set_Authentication } from '../store/slice';
import Notifications from './Notification'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { clearNotifications, addNotification } from '../store/slice';




const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('cars');
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    dispatch(
      set_Authentication({
        name: null,
        isAuthenticated: false,
        isAdmin: false
      })
    );
    navigate('/login');
  };

  return handleLogout;
};


const MenuSideBar = () => {


  const dispatch = useDispatch();
  const [showNotifications , setShowNotifications] = useState(false)
  const [notification , setNotification] = useState([])
  const logout = useLogout();
  const user = useSelector(state => state.authentication_user.name);
  const[count,setcount]=useState('')
  
 
  
  


  useEffect(() =>{
  
    if (user) {
      const accessToken = localStorage.getItem('access')
      const websocketProtocol = window.location.protocol === 'http:' ? 'ws://' : 'ws://';
      const socket = new WebSocket(`wss://backend.socialnest.online/ws/notification/?token=${accessToken}`);
      // const socket = new WebSocket(`wss://www.instaconnect.online/ws/notification/?token=${accessToken}`);

      socket.onopen = () => {
        console.log('websocket connection established')
      }

      socket.onmessage = (event) => {
        const newNotification = JSON.parse(event.data)
        console.log('new meesssage--------->',newNotification)
        
        if (newNotification.type === 'notification' ) {
          console.log('ckeck',newNotification)
          setNotification((prevNotifications) => [...prevNotifications,newNotification.payload])
          dispatch(clearNotifications())
          dispatch(addNotification(newNotification.payload))
          
 // This will log the length of the array
          
        }
      }

      socket.onclose = (event) => {
        console.log('Websocket connection closed' , event)
      }

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
  
      
    }
    
  }
  
  
  
  ,[user])

 const notifications = useSelector(state=>state.authentication_user.notifications);
 
 
  

  console.log('notifications display',notifications)
  const handleLogout = useLogout();

  const removeNotification = (notificationIdToRemove) => {
    setNotification((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationIdToRemove
      )
    )
  }

  return (
    <div style={{ backgroundColor: 'rgb(38, 38, 38)', height: '300px' }} className=' bg-customColor text-white flex flex-col justify-center  my-10 rounded-2xl'>
      <Link to='/'>
        <div style={{ marginTop: '10px', marginLeft:'25%' }}>
          <HomeIcon className='icon-sidebar'/>
          <span className='menusidebar-text ml-3'>Home</span>
        </div>
      </Link>
      
      <NavLink to={'/searchpage/'}>
        <div style={{ marginTop: '20px' , marginLeft:'25%'}}>
           <SearchIcon className='icon-sidebar'/>
           <span className='menusidebar-text ml-3'>Search</span>
           </div>
      </NavLink>


      <NavLink to={'/messages'}>
        <div style={{ marginTop: '20px', marginLeft:'25%' }}>
           <ChatIcon className='icon-sidebar'/>
           <span className='menusidebar-text ml-3'>Chat</span>
           </div>
      </NavLink>

      <NavLink to={'/notification/'}>
        <div style={{ marginTop: '20px', marginLeft:'25%' }}>
           <NotificationsActiveIcon className='icon-sidebar'/>
           <span className='menusidebar-text ml-3'>Notifications</span>
           </div>
      </NavLink>

      <div style={{ marginTop: '20px', marginLeft:'25%' }}>
           <LogoutIcon className='icon-sidebar'/>
           <span className='menusidebar-text ml-3'>Logout</span>
           </div>

    </div>



  );
};

export default MenuSideBar;
