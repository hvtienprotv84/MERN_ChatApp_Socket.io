import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import '../index.css';
export default function Logout() {
  const navigate = useNavigate();
  const handleClick =  () => {

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="hover_logout">
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
    </div>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  /* background-color: #9a86f3; */
  background-color: #0062FF;
  border: 2px white dashed;
  margin-top: 11px;
  margin-right: -15px;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }

`;