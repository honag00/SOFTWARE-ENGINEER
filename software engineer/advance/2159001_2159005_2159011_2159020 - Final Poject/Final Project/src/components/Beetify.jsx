import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Body from "./Body";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";




export default function Beetify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();

  const handleScroll = () => {
    const scrollTop = bodyRef.current.scrollTop;
    setNavBackground(scrollTop >= 100);
    setHeaderBackground(scrollTop >= 268);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        const userInfo = {
          userId: data.id,
          userUrl: data.external_urls.spotify,
          name: data.display_name,
        };
        dispatch({ type: reducerCases.SET_USER, userInfo });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    getUserInfo();
  }, [dispatch, token]);

  useEffect(() => {
    const getPlaybackState = async () => {
      try {
        const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });
        dispatch({
          type: reducerCases.SET_PLAYER_STATE,
          playerState: data.is_playing,
        });
      } catch (error) {
        console.error("Error fetching playback state:", error);
      }
    };
    getPlaybackState();
  }, [dispatch, token]);

  return (
    <Container>
      <div className="beetify__body">
        <Sidebar /> 
        <div className="body" ref={bodyRef} onScroll={handleScroll}>
          <Navbar navBackground={navBackground} />
          <div className="body__contents">
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="beetify__footer">
        <Footer />
      </div>
    </Container>
  );
}


const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15vh;

  .beetify__body {
    display: grid;
    grid-template-columns: 1fr auto 1fr; 
    justify-content: center; 
    align-items: center; 
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: #fcc700;
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0.7rem;
        max-height: 2rem;
        &-thumb {
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  }
`;







