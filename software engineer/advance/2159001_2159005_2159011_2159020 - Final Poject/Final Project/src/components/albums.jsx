import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import Sidebar from "./Sidebar";
import { reducerCases } from "../utils/Constants";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";



export default function Albums() {
  const [{ token }, dispatch] = useStateProvider();

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

  const location = useLocation();
  const albumsData = location.state?.albumsData || [];
  console.log(albumsData);
  return (
    <Container>
      <Navbar className="navbar"/>
      <div className="main-content">
        <Sidebar className="sidebar"/> 
        <div className="content">
          {albumsData.map((album, i) => (
            <Card key={album.id} className="card">
              <a href={album.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                <Card.Img src={album.images[0].url} alt={album.name} />
              </a>
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer className="beetify__footer"/>
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
    // Add any additional styles for your sidebar here
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center; // Center the cards horizontally
    align-content: flex-start; // Align the cards to the top
    gap: 1rem;
    padding: 1rem; // Add padding around the content area
  }

  .card {
    width: calc(25% - 1rem); // Adjust the width as necessary
    margin-bottom: 1rem; // Add space below each card
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

  .beetify__footer {
    width: 100%;
    background-color: #333;
    color: white;
    // Add any additional styles for your footer here
  }
`;