import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Button,
  Panel,
  Stack,
} from 'rsuite';
import { FaGithub } from 'react-icons/fa';
import CustomFooter from '../components/footer';
import './Login.css'; // Import the CSS file

const CLIENT_ID = "Ov23liM0IKevXYNvjh2J";

function loginWithGithub() {
  const scope = "user:email"; // Specify the scopes
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${scope}`);
}

const Login = () => {
  const [renderer, setRenderer] = useState(false);
  const [userData, setUserData] = useState({});

  async function getUserData() {
    await fetch('http://localhost:4000/getUserData', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    }).then(response => {
      return response.json();
    }).then(async (data) => {
      console.log("User data retrieved:", JSON.stringify(data, null, 2)); // Log user data as JSON
      setUserData(data);
      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(data));
    });
  }

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    if (codeParam && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        await fetch('http://localhost:4000/getAccessToken?code=' + codeParam, {
          method: 'GET',
        }).then(response => {
          return response.json();
        }).then(data => {
          if (data.access_token) {
            localStorage.setItem("accessToken", data.access_token);
            setRenderer(!renderer);
          }
        });
      }
      getAccessToken();
    }
  }, []);

  // Log userData when it changes
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      console.log("User Data:", JSON.stringify(userData, null, 2));
    }
  }, [userData]);

  return (
    <Container style={{ height: '100vh' }}>
      <Content>
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
          {/* Welcome message */}
          <h2 
            style={{
              fontSize: '2em',
              color: '#ff5722', // Initial text color
              animation: 'colorChange 3s infinite',
              transform: 'scale(1)',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Welcome Coder, Here you go!
          </h2>
          
          {/* Sign in panel */}
          <Panel 
            header={<h2 style={{ display: "flex", justifyContent: "center", textAlign: 'center', fontSize: '1.8em', color: '#333' }}>Sign in</h2>} 
            bordered 
            style={{
              width: 450,
              padding: '25px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              transition: 'box-shadow 0.3s ease',
              margin: '0 auto'
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)'}
          >
            {
              localStorage.getItem("accessToken") ? 
              <>
                <h1 style={{ color: '#4CAF50', fontSize: '1.6em', marginBottom: '25px' }}>We have the access token</h1>
                
                <Button 
                  onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("userData");
                    setRenderer(!renderer);
                  }} 
                  style={{
                    backgroundColor: '#f44336',
                    color: '#fff',
                    marginBottom: '25px',
                    padding: '12px 18px',
                    fontSize: '1.1em',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Log out
                </Button>

                <h3 style={{ color: '#333', fontSize: '1.3em' }}>Get User Data from GitHub API</h3>
                <Button 
                  onClick={getUserData} 
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    marginTop: '15px',
                    padding: '12px 18px',
                    fontSize: '1.1em',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Get Data
                </Button>

                {Object.keys(userData).length !== 0 && (
                  <>
                    <h4 style={{ color: '#555', marginTop: '18px', fontSize: '1.2em' }}>Hey there {userData.login}</h4>
                    <img 
                      width="120px" 
                      height="120px" 
                      src={userData.avatar_url} 
                      style={{ borderRadius: '50%', marginTop: '12px', border: '2px solid #333' }}
                      alt="User avatar"
                    />
                    <a 
                      href={userData.html_url} 
                      style={{
                        color: '#0366d6', 
                        marginTop: '12px', 
                        display: 'block',
                        textDecoration: 'none',
                        fontSize: '1.1em',
                      }}
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Link to the GitHub profile
                    </a>
                  </>
                )}
              </>
              :
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button 
                  endIcon={<FaGithub />} 
                  onClick={loginWithGithub} 
                  style={{
                    backgroundColor: '#333',
                    color: '#fff',
                    padding: '12px 18px',
                    fontSize: '1.1em',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#555';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#333';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Continue with Github
                </Button>
              </div>
            }
          </Panel>
        </Stack>
      </Content>
      <CustomFooter/>
    </Container>
  );
};

export default Login;
