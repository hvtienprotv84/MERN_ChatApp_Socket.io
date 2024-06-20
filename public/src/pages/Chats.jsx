import styled from "styled-components"
import { useState, useEffect , useRef} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";


export default function Chats() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  

  useEffect( ()=>{
    const navigationTo = async () => {
      if (!localStorage.getItem('chat-app-user'))
      {
        navigate("/login");
      }
      else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    }
    navigationTo();
   }, []);

   useEffect(()=>{
    if(currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
   },[currentUser]);

  useEffect( () => {
    const getCurrentUser = async()=>{
      if( currentUser)  {
      if(currentUser.isAvatarImageSet){
        const data = await  axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else{
        navigate('/setAvatar');
      }
    }
    }
      getCurrentUser();
  }, [currentUser]);

  const handleChatChange = (chat) =>{
    setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser}  changeChat={handleChatChange}/>
        { isLoaded &&
          currentChat === undefined ?
           <Welcome currentUser={currentUser}/> : 
          <ChatContainer currentChat={currentChat} socket={socket} currentUser={currentUser} />
        }
      </div>
      <div id="copyright_chats" className='copyright'>&copy;	Mọi Bản Quyền Thuộc Về <a href='https://github.com/hvtienprotv84'><p> Huỳnh Vĩnh Tiến</p></a></div>

    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  /* background-color: #131324; */
  background-image: url('https://i.pinimg.com/originals/8e/46/15/8e46150f790fbefe438d9c2767c32ad1.gif');
  background-size: auto;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
  .copyright{
    color:white;
    font-size: 20px;
    margin-top: 620px;
    position: absolute;
    font-family: "Playwrite NG Modern", cursive;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    display: flex;
    flex-direction: row;
  
  }
  .copyright p{
    font-weight: bold;
    color:red;
    font-family: "Playwrite NG Modern", cursive;
    font-optical-sizing: auto;
    font-weight: none;
    font-style: normal;
    font-size:none;
    margin-left: 10px;
  }
  .copyright a{
    text-decoration: none;
  }
  #copyright_chats{
    top:40px;
  }
`;
