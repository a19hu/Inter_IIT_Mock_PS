import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Button,
  Panel,
  Stack,
} from 'rsuite';
import { FaGithub } from 'react-icons/fa';
import './Login.css'; // Import the CSS file

const CLIENT_ID = "Ov23liM0IKevXYNvjh2J";

function loginWithGithub() {
  window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
}

const Login = () => {
  const [renderer, setRenderer] = useState(false);
  const [userData, setUserData] = useState({});

  async function getUserData() {
    await fetch('http://172.31.6.92:4000/getUserData', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("accessToken")
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      console.log(data);
      setUserData(data);
    });
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get('code');

    if (codeParam && (localStorage.getItem("accessToken") === null)) {
      async function getAccessToken() {
        await fetch('http://172.31.6.92:4000/getAccessToken?code=' + codeParam, {
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

  return (
    <Container 
      className="container" 
      style={{ backgroundColor: '#5D3FD3', height: '100vh' }} // Change to a desired color
    >
      <Content>
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
          <h2 className="tagline">Welcome Coder, Start from here</h2>
          <Panel header={<h2 className="panel-header">Sign in</h2>} bordered style={{ width: 400 }}>
            {
              localStorage.getItem("accessToken") ? 
              <>
                <h1>We have the access token</h1>
                <Button onClick={() => { localStorage.removeItem("accessToken"); setRenderer(!renderer); }}>
                  log out
                </Button>
  
                <h3>Get User Data from GitHub API</h3>
                <Button onClick={getUserData}>Get Data</Button>
                {Object.keys(userData).length !== 0 &&
                  <>
                    <h4>Hey there {userData.login}</h4>
                    <img width="100px" height="100px" src={userData.avatar_url} alt="User Avatar" />
                    <a href={userData.html_url} style={{ color: "white" }}>Link to the GitHub profile</a>
                  </>
                }
              </>
              :
              <>
                <div className="button-container">
                  <Button className="button" endIcon={<FaGithub />} onClick={loginWithGithub}>
                    Continue with Github
                  </Button>
                </div>
              </>
            }
          </Panel>
        </Stack>
      </Content>
    </Container>
  );
};

export default Login;
