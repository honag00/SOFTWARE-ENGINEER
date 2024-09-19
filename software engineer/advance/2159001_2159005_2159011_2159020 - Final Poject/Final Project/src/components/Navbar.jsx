import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdHomeFilled, MdOutlinePeople  } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import BeetifyLogo from '../picture/Beetifylogo.png';
import { reducerCases } from "../utils/Constants";
import { Link, useHistory } from "react-router-dom";



const Header = ({ navBackground }) => {
  let artistId;
  const history = useHistory();
  const [{ token, userInfo },dispatch] = useStateProvider();
  const [searchInput, setSearchInput] = React.useState("");

  const handleEnterKey = async (event) => {
    if (event.key === "Enter") {
      console.log("Search for:", searchInput);

      try {
        const response = await axios.get(
          `https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        artistId = data.artists.items[0]?.id;
        console.log(artistId);
        dispatch({ type: reducerCases.SET_ARTISTS, selectedArtist: artistId });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
        const returnedAlbum = await axios.get(
          `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&market=VN&limit=10`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
        ); 
        console.log(artistId);
        console.log(returnedAlbum.data.items)
        // setAlbumItems(returnedAlbum.data.items);
        //  console.log(setAlbumItems.data);
        history.push({
          pathname: "/albums",
          state: { albumsData: returnedAlbum.data.items },
        });


    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  return (
    <Container navBackground={navBackground}>
      <div className="top__links">
        <div className="logo">
          <img src={BeetifyLogo} alt="beetify" />
        </div>
        <ul>
          <li
            onClick={() => history.push("/Beetify")} 
          >
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li
            onClick={() => history.push("/AboutUs")} 
          >
            <MdOutlinePeople />
            <span>About us</span>
          </li>
          <li
            onClick={() => history.push("/FollowArtists")} 
          >
            <IoLibrary />
            <span>Your Library</span>
          </li>
        </ul>
      </div>
      <div className="search__bar">
        <FaSearch />
        <input
          type="text"
          placeholder="Enter Artist name"
          onKeyDown={handleEnterKey}
          onChange={handleInputChange}
        />
      </div>
      <div className="avatar">
        <a href={userInfo?.userUrl}>
          <CgProfile />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </Container>
  );
};



const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  transition: 0.3s ease-in-out;
  background-color: ${({ navBackground }) =>
    navBackground ? "#fcc700" : "none"};

  .top__links {
    display: flex;
    align-items: center;
    

    .logo {
      margin-right: 2rem;
      img {
        max-width: 50px;
        height: auto;
      }
    }

    ul {
      list-style-type: none;
      display: flex;
      gap: 2rem;
      li {
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #fcc700;
        }
      }
    }
  }

  .search__bar {
    background-color: white;
    width: 30%;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;

    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
  }

  .avatar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: white;
      font-weight: bold;
      svg {
        font-size: 1.3rem;
        background-color: #282828;
        padding: 0.2rem;
        border-radius: 1rem;
        color: #c7c5c5;
      }
    }
  }
`;
export default Header;
