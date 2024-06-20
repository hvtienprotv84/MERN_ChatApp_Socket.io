import React from 'react'
import styled from 'styled-components'
import Robot from "../assets/robot.gif"

export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={Robot} alt="welcome" />
        <h1>
            Xin Chào!, <span>{currentUser.username}.</span>
        </h1>
        <h2>Vui lòng chọn một cuộc trò chuyện để bắt đầu Nhắn tin.</h2>
    </Container>
  )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
border: 2px #0ed1ed dashed;
img{
    height: 20rem;
}
span{
    /* color: #4e00ff; */
    color: #00ff00;
    text-transform: capitalize;
}
`;