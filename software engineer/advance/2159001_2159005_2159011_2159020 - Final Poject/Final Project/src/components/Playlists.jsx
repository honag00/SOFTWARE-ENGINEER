import axios from "axios";
import React, { useEffect } from "react";
import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import { MdOutlinePlaylistPlay } from "react-icons/md";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();


  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response);
      const { items } = response.data;
      // console.log(items);
      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
      //console.log(items.length);
      // localStorage.setItem("PlaylistCount", items.length);

    };
    getPlaylistData();
  }, [token, dispatch]);

  // const PlaylistsCount = localStorage.getItem("PlaylistCount");


  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };
  


  return (
    <Container>
      <nav>
        <ul>
          {playlists.map(({ name, id }) => {
            return (
              <li key={id} onClick={() => changeCurrentPlaylist(id)}>
                  {name}
                  <div className="playlist-icon">
                    <MdOutlinePlaylistPlay />
                  </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </Container>
  );
}

// const Container = styled.div`

//   color: #b3b3b3;
//   height: 100%;
//   overflow: hidden;
//   nav{
//     ul {
//       list-style-type: none;
//       display: flex;
//       flex-direction: column;
//       gap: 1rem;
//       padding: 1rem;
//       height: 55vh;
      // max-height: 100%;
      // overflow: auto;
//       &::-webkit-scrollbar {
//         width: 0.7rem;
//         &-thumb {
//           background-color: rgba(255, 255, 255, 0.6);
//         }
//       }
//       li {
//         transition: 0.3s ease-in-out;
//         cursor: pointer;
//         &:hover {
//           color: white;
//         }
//       }
//     }
//   }
// `;


const Container = styled.div`
  *, *:before, *:after {
    box-sizing: border-box;
  }

  :after {
    content: "";
  }

  section {
    position: relative;
    left: 100px;
  }

  h1 {
    margin: 80px 0 10px 0;
    font-size: 52px;
    font-family: 'Montserrat', sans-serif;
    text-transform: uppercase;
    text-shadow: 1px 1px 0px #DC143C, 2px 2px 0px #DC143C, 3px 3px 0px #DC143C, 4px 4px 0px #DC143C;
  }

  h2 {
    font-size: 24px;
  }

  body {
    padding: 100px 0;
    background: lightblue;
    color: white;
    max-width: 640px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    line-height: 1.4;
    font-smoothing: anti-aliased;
  }

  nav {
    float: left;
    position: relative;
    top: 0;
    left: 0;
    background: transparent;
    
  }

  nav ul {
    text-align: center;
    max-height: 55vh; 
    overflow: auto; 
    padding: 0; 
    margin: 0; 
  }

  nav ul::-webkit-scrollbar {
    width: 0; 
  }

  nav ul li {
    position: relative;
    width: 70px;
    cursor: pointer;
    background: crimson;
    text-transform: uppercase;
    transition: all .4s ease-out;
    
  }

  nav ul li:after {
    position: absolute;
    background: white;
    color: crimson;
    top: 0;
    left: 70px;
    width: 70px;
    height: 100%;
    opacity: .5;
    transform: perspective(400px) rotateY(90deg);
    transform-origin: 0 100%;
    transition: all .4s ease-out;
    
  }


  nav ul li:hover {
    transform: translateX(-70px);
  }

  nav ul li:hover:after {
    opacity: 1;
    transform: perspective(400px) rotateY(0deg) scale(1);
  }

  nav ul li > div {
    display: inline-block;
    padding: 25px 0;
    background: transparent;
  }

  nav ul li div {
    
    position: relative;
  }

  .roof {
    width: 0;
    height: 0;
    top: 2px;
    border-style: solid;
    border-width: 0 21px 15px 21px;
    border-color: transparent transparent #ffffff transparent;
  }

  .roof-edge {
    position: absolute;
    z-index: 20;
    left: -17px;
    top: 3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 17px 12px 17px;
    border-color: transparent transparent crimson transparent;
  }

  .roof-edge:after {
    position: absolute;
    left: -14.5px;
    top: 3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 14.5px 10px 14.5px;
    border-color: transparent transparent white transparent;
  }

  .front {
    position: relative;
    top: 3px;
    width: 28.5px;
    height: 20px;
    margin: 0 auto;
    background: white;
  }

  .front:after {
    position: absolute;
    background: crimson;
    width: 11px;
    height: 13px;
    bottom: 0;
    left: 9px;
  }

  .head {
    width: 32px;
    height: 35px;
    background: white;
    border-radius: 8px;
  }

  .head:after {
    width: 4px;
    height: 10px;
    background: white;
    position: absolute;
    border-radius: 4px 0 0 4px;
    top: 21px;
    left: 14px;
    transform: rotate(270deg);
  }

  .eyes {
    width: 8px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 5px;
    background: crimson;
  }

  .eyes:after {
    width: 8px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 14px;
    background: crimson;
  }

  .beard {
    width: 32px;
    height: 17px;
    background: crimson;
    border: 2px solid white;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0 0 8px 8px;
  }

  .beard:after {
    position: absolute;
    top: -2px;
    left: 11px;
    background: white;
    width: 6px;
    height: 4px;
    border-left: 1px solid crimson;
    border-right: 1px solid crimson;
  }

  .paper {
    position: relative;
    height: 32px;
    width: 29px;
    background: white;
    border: 2px solid white;
  }

  .paper:after {
    position: absolute;
    top: 1px;
    left: 0;
    width: 25px;
    height: 29px;
    background: white;
    border-top: 4px solid crimson;
  }

  .lines {
    position: absolute;
    top: 36px;
    left: 5px;
    width: 11px;
    box-shadow: 0 0 0 1px crimson;
  }

  .lines:after {
    position: absolute;
    top: 4px;
    left: 3px;
    width: 14px;
    box-shadow: 0 0 0 1px crimson;
  }

  .lines:nth-child(2) {
    position: absolute;
    top: 44px;
    left: 8px;
    width: 11px;
  }

  .lines:nth-child(2):after {
    position: absolute;
    top: 4px;
    left: -3px;
    width: 11px;
  }

  .lines:nth-child(3) {
    position: absolute;
    .top: 52px;
    left: 8px;
    width: 14px;
  }
  
  .lines:nth-child(3):after {
    display: none;
  }
  
  .mail-base {
    position: relative;
    width: 32px;
    height: 18px;
    background: white;
  }
  
  .mail-top {
    position: absolute;
    z-index: 20;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    transform: rotate(180deg);
    border-style: solid;
    border-width: 0 16px 11px 16px;
    border-color: transparent transparent crimson transparent;
  }
  
  .mail-top:after {
    position: absolute;
    z-index: 20;
    left: -16px;
    top: 3px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 16px 9px 16px;
    border-color: transparent transparent white transparent;
  }
  `;  
  




  
  
  

