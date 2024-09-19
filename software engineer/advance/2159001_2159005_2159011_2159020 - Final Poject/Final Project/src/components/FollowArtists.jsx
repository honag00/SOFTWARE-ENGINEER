import React, { useEffect, useRef,useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Card } from "react-bootstrap";

export default function FollowArtists() {
  const [{ token, followingArtist }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const bodyRef = useRef();

  const handleScroll = () => {
    const scrollTop = bodyRef.current.scrollTop;
    setNavBackground(scrollTop >= 100);
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
    const getFollowingArtists = async () => {
      try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me/following?type=artist&limit=20",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data.artists !== "") {
          const followingArtist = response.data.artists.items.map((item) => ({
            id: item.id,
            name: item.name,
            followers: item.followers,
            genres: item.genres,
            popularity: item.popularity,
            uri: item.external_urls.spotify,
            image: item.images && item.images.length > 0 ? item.images[0].url : null,
          }));
          dispatch({ type: reducerCases.SET_FOLLOW_ARTISTS, followingArtist });
        } else {
          dispatch({ type: reducerCases.SET_FOLLOW_ARTISTS, followingArtist: null });
        }
      } catch (error) {
        console.error("Error fetching following artists:", error);
      }
    };
    getFollowingArtists();
  }, [token, dispatch]);

  return (
    <Container>
      <div className="body" ref={bodyRef} onScroll={handleScroll}>
          <Navbar navBackground={navBackground} />
      </div>
      <div className="main-content">
        <Sidebar className="sidebar" />
        <div className="content">
          {followingArtist && followingArtist.length > 0 ? (
            followingArtist.map((artist) => (
              <Card key={artist.id} className="card">
                <a href={artist.uri} target="_blank" rel="noopener noreferrer">
                  <Card.Img variant="top" src={artist.image} />
                </a>
                <Card.Body>
                  <Card.Title>{artist.name}</Card.Title>
                  <Card.Text>
                    Followers: {artist.followers.total}<br />
                    Genres: {artist.genres.join(", ")}<br />
                    Popularity: {artist.popularity}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No artists followed</p>
          )}
        </div>
      </div>
      <div className="beetify__footer">
        <Footer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: #fcc700;
  
  .navbar {
    width: 100%;
  }

  .main-content {
    flex: 1;
    display: flex;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: #fcc700;
  }

  .sidebar {
    width: 200px;
    flex-shrink: 0;
    background-color: #333;
    color: white;
    padding: 1rem;
  }

  .content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: flex-start;
    gap: 1rem;
    padding: 1rem;
  }

  .card {
    width: calc(25% - 1rem);
    margin-bottom: 1rem;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    background-color: #fff;

    &:hover {
      transform: translateY(-5px);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .card-body {
      padding: 1rem;
      text-align: center;
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }
  }
`;