import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import BeetifyLogo from '../picture/Beetifylogo.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useHistory } from "react-router-dom";

export default function AboutUs() {
  const [{ token }, dispatch] = useStateProvider();
  const [currentSlide, setCurrentSlide] = useState(0);
  const history = useHistory();

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 100, 
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, 
    afterChange: (current) => setCurrentSlide(current)
  };

  const ProgressBar = styled.div`
  width: ${currentSlide === 0 ? '33.33%' : currentSlide === 1 ? '66.66%' : '100%'};
  height: 5px;
  background-color: #1db954;
  transition: width 0.5s ease;
  animation: ${keyframes`
    from { width: ${currentSlide === 0 ? '0%' : currentSlide === 1 ? '33.33%' : '66.66%'}; }
    to { width: ${currentSlide === 0 ? '33.33%' : currentSlide === 1 ? '66.66%' : '100%'}; }
  `} 1s linear;
`;

  return (
    <Container>
      <Navbar className="navbar" />
      <Sidebar className="sidebar" />
      <Content>
        <AboutSection>
          <h1>About Us</h1>
          <img src={BeetifyLogo} alt="Beetify Logo" />
          <p>
            At Our Music Player App, we strive to provide the ultimate music listening experience.
            Our goal is to make discovering and enjoying music easier and more enjoyable for everyone.
          </p>
          <CenteredButton onClick={() => history.push("/Beetify")}>See Our Features</CenteredButton>
        </AboutSection>
        <SliderContainer>
          <Slider {...settings}>
            <Slide>
              <div class="flex-item-10 flexsplit-66">
                <h2>Purpose of Beetify</h2>
                <p>Explore the endless variety of music, powered by Spotify api data.</p>
              </div>
              <img src="https://imagekit.gallup.com/fusion/WWWV7CORP/16f37533-9e21-463e-ae4f-981eabb62720.jpg" alt="Slide 1" />
            </Slide>
            <Slide>
              <div class="flex-item-10 flexsplit-66">
                <h2>Discover New Music</h2>
                <p>Explore curated playlists and recommendations tailored to your taste.</p>
              </div>
              <img src="https://imagekit.gallup.com/fusion/WWWV7CORP/73e06c76-d952-4ec6-af4e-568631c5f65b.jpg" alt="Slide 2" />
            </Slide>
            <Slide>
              <div class="flex-item-10 flexsplit-66">
                <h2>Personalized Experience</h2>
                <p>Customize your listening experience with personalized playlists and recommendations.</p>
              </div>
              <img src="https://imagekit.gallup.com/fusion/WWWV7CORP/b1d1ca0f-36b6-4811-8acd-d6fd2083fef3.jpg" alt="Slide 3" />
            </Slide>
          </Slider>
          <ProgressBar className="progressBar" />
        </SliderContainer>
        <ContactUsForm>
          <form>
            <h2>Contact Us</h2>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Enter your name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" placeholder="Enter your email" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" rows="4" placeholder="Enter your message"></textarea>

            <button type="submit">Send Message</button>
          </form>
        </ContactUsForm>
      </Content>
      <Footer />
    </Container>
  );
}

const Container = styled.div`
  max-width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: #fcc700;
  color: black;
`;

const CenteredButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 15px 30px;
  background-color: #1db954;
  color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #1ed760;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const Content = styled.div``;

const Slide = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }

  .flex-item-10 {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    color: #fff;
    text-align: center;
    max-width: 80%;
    z-index: 2;
  }
`;

const AboutSection = styled.div`
  text-align: center;
  margin: 40px 0;
  padding: 0 15px; // Add padding for smaller screens
`;

const ContactUsForm = styled.div`
  margin-top: 40px;

  form {
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
    background-color: #a2d2ff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    h2 {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }

    label {
      display: block;
      margin-bottom: 10px;
      color: #555;
    }

    input,
    textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1rem;
      background: #bde0fe;
      font-weight: bold;
      font-style: italic;
    }

    button {
      display: block;
      width: 100%;
      padding: 10px;
      background-color: #1db954;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    button:hover {
      background-color: #1ed760;
    }
  }
`;
