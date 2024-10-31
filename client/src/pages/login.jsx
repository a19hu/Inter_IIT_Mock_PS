import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Button,
  Panel,
  Stack,
} from 'rsuite';


import { FaGithub, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
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

    /*  sahil
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
          </Panel> */

    <Container style={{ height: '100vh' }}>
      {/* <Header>
        <Navbar appearance="inverse">
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar>
      </Header> */}
      <Content>
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
{/* // <<<<<<< feature-branch-name ,satyam
//           <Panel header="Sign in" bordered style={{ width: 400 }}>
//             {
//               localStorage.getItem("accessToken") ? 
//                 <>
//                   <h1>We have the access token</h1>
//                   <Button onClick={() => { localStorage.removeItem("accessToken"); localStorage.removeItem("userData"); setRenderer(!renderer); }}>
//                     Log out
//                   </Button>

//                   <h3>Get User Data from GitHub API</h3>
//                   <Button onClick={getUserData}>Get Data</Button>
//                   {Object.keys(userData).length !== 0 ? 
//                     <>
//                       <h4>Hey there {userData.login}</h4>
//                       <img width="100px" height="100px" src={userData.avatar_url} alt="User avatar" />
//                       <a href={userData.html_url} style={{ color: "black" }}>Link to the GitHub profile</a>
//                     </>
//                     :
//                     null
//                   }
//                 </>
//                 :
//                 <>
//                   <Button endIcon={<FaGithub />} onClick={loginWithGithub}>
//                     Continue with Github
//                   </Button>
//                 </>
//             }
//           </Panel> */}

        <Panel 
  header={<h2 style={{ display:"flex",justifyContent:"center",textAlign: 'center', fontSize: '1.8em', color: '#333' }}>Sign in</h2>} 
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

      {Object.keys(userData).length !== 0 ? (
        <>
          <h4 style={{ color: '#555', marginTop: '18px', fontSize: '1.2em' }}>Hey there {userData.login}</h4>
          <img 
            width="120px" 
            height="120px" 
            src={userData.avatar_url} 
            style={{ borderRadius: '50%', marginTop: '12px', border: '2px solid #333' }}
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
      ) : (
        <>
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
