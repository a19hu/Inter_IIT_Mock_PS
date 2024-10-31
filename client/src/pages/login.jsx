import React, { useEffect, useState } from 'react';
import {
  Container,
  Header,
  Content,
  Button,
  Navbar,
  Panel,
  Stack,
} from 'rsuite';
import { FaGithub } from 'react-icons/fa';

const CLIENT_ID = "Ov23liM0IKevXYNvjh2J";

function loginWithGithub() {
  const scope = "user:email"; // Specify the scopes
  window.location.assign(`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${scope}`);
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
    }).then(async (data) => {
      console.log("User data retrieved:", JSON.stringify(data, null, 2)); // Log user data as JSON
      setUserData(data);
      // Store user data in localStorage
      localStorage.setItem("userData", data);

      // Fetch user emails
      const emailResponse = await fetch('https://api.github.com/user/emails', {
        method: 'GET',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("accessToken")
        }
      });

      const emails = await emailResponse.json();
      console.log("User emails:", JSON.stringify(emails, null, 2)); // Log emails in JSON format
    });
  }

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

  // Log userData when it changes
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      console.log("User Data:", JSON.stringify(userData, null, 2));
    }
  }, [userData]);

  return (
    <Container style={{ height: '100vh' }}>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar>
      </Header>
      <Content>
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
          <Panel header="Sign in" bordered style={{ width: 400 }}>
            {
              localStorage.getItem("accessToken") ? 
                <>
                  <h1>We have the access token</h1>
                  <Button onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("userData"); setRenderer(!renderer); }}>
                    Log out
                  </Button>

                  <h3>Get User Data from GitHub API</h3>
                  <Button onClick={getUserData}>Get Data</Button>
                  {Object.keys(userData).length !== 0 ? 
                    <>
                      <h4>Hey there {userData.login}</h4>
                      <img width="100px" height="100px" src={userData.avatar_url} alt="User avatar" />
                      <a href={userData.html_url} style={{ color: "black" }}>Link to the GitHub profile</a>
                    </>
                    :
                    null
                  }
                </>
                :
                <>
                  <Button endIcon={<FaGithub />} onClick={loginWithGithub}>
                    Continue with Github
                  </Button>
                </>
            }
          </Panel>
        </Stack>
      </Content>
    </Container>
  );
};

export default Login;
