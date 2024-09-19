import React from "react";
import styled from "styled-components";
import BeetifyLogo from '../picture/Beetifylogo.png'

export default function Login() {
  const handleClick = async () => {
    const client_id = "ad015457441642cd9e5fec40499adb5d";
    const redirect_uri = "http://localhost:3000/beetify";
    const api_uri = "https://accounts.spotify.com/authorize";
    const scope = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-read-playback-position",
      "user-top-read",
      "user-follow-read",
    ];
    
    window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };

  return (
    <Container>
      <img
        src={BeetifyLogo} alt="beetify" 
      />
      <button onClick={handleClick}>Connect Beetify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #fcc700;
  gap: 5rem;
  img {
    height: 50vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #fcc700;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
