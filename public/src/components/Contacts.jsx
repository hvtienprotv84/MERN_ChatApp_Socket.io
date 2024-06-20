import React, { useState, useEffect } from 'react'
import styled from "styled-components"
import Logo from '../assets/logo_1.png'
import '../index.css'
import { MdRefresh } from "react-icons/md";
export default function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, contact) => { 
        setCurrentSelected(index);
        changeChat(contact);
    };
    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <a href='/' className='container_brand'>
                        <div className="brand">
                            <img src={Logo} alt="logo"/>
                            <h3>HVT - Chat PUBLIC</h3>
                        </div>
                        </a>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div
                                         className={`contact ${
                                            index === currentSelected ? "selected" : ""
                                            }`}
                                             key={contact._id}
                                              onClick={()=>changeCurrentChat(index,contact)}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                        <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h2>{currentUserName}</h2>
                                            </div>
                        </div>
                        <div className='button_refresh'>
                        <div className='hover_button_refresh'>
                        <a href='/'>
                         <MdRefresh  className='icon_refresh'/>
                        </a>
                        </div>
                        </div>
            
                    </Container>
                )
            }
        </>
    )
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  border: 2px #0ed1ed dashed;
  border-right: none;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      background-color: #1e0d6a;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      border: 2px #0ed1ed dashed;
      .avatar {
        margin-left: 10px;
        img {
          height: 3rem;
        }
      }
      .username {
        margin-left: -5px;
        font-size: 20px;
        h3 {
          color: white;
          text-transform: capitalize;
        }
      }
    }
    .selected {
      /* background-color: #9a86f3; */
      background-color: #f50000;
    }
  }
  .current-user {
    /* background-color: #0d0d30; */
    background-color: #2cd92e;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    border: 2px #3fff41 dashed;
    border-right: none;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      margin-left:-20px;
      font-size: 26px;
      margin-top:10px;
      h2 {
        color: white;
        text-transform: capitalize;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
  .container_brand{
    margin-top:15px;
    text-decoration: none;
  }
`;

