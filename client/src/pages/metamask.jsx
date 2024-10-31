
import React from 'react'
import { useEffect, useState } from 'react';
import { Container, Header, Content, Button, Navbar, Panel, Stack,Footer,Modal,ButtonToolbar} from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import 'rsuite/dist/rsuite.min.css'; // Import rsuite CSS
import { stringifyReactNode } from 'rsuite/esm/internals/utils';
import CustomFooter from '../components/footer';
import './Metamask.css'; // Import the CSS file


const Metamask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [account, setAccount] = useState(null);

  useEffect(() => {
      const storedUserData = localStorage.getItem("userData");
      console.log(storedUserData);
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log("User Data on Dashboard:", userData);
      } else {
        console.log("No user data found in localStorage.");
      }
    if (typeof window.ethereum !== 'undefined') {
      setIsMetaMaskInstalled(true);
    } else {
      // Redirect to MetaMask download if not installed
      window.location.href = 'https://metamask.io/download.html';
    }
  }, []);

  const connectMetaMask = async () => {
    try {
      // Request account access if MetaMask is installed
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      const userAccount = accounts[0];
      setAccount(userAccount);

      // Log account details to the console and store in localStorage
      console.log("Connected MetaMask Account:", userAccount);
      localStorage.setItem("metaMaskAccount", userAccount);

      // Redirect to next page after login
      // console.log("Connected to MetaMask with account: ", accounts[0]);
      window.location.href = '/dashboard';

    } catch (error) {
      console.error("User rejected the connection request", error);
    }
  };

  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const proceedToDashboard = () => {
    window.location.href = '/dashboard'; // Navigate to the dashboard
    handleClose(); // Close the modal
  };

  return (
//satyam:
//     <Container style={{ height: '100vh' }}>
//       <Content>
//         <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
//           <Panel bordered style={{ textAlign: 'center', width: 400 }}>
//             {isMetaMaskInstalled ? (
//               <div>
//                 <h1>Welcome to MetaMask Login</h1>
//                 {account ? (
//                   <div>
//                     <p>Connected Account: {account}</p>
//                     <Button onClick={() => window.location.href = '/dashboard'}>Proceed to Next Page</Button>
//                   </div>
//                 ) : (
//                   <Button onClick={connectMetaMask}>Connect with MetaMask</Button>
//                 )}
//               </div>
//             ) : (
//               <p>Redirecting to install MetaMask...</p>
//             )}
//           </Panel>
//         </Stack>
//       </Content>
//     </Container>
//   );
// }

// export default Metamask;

    <>
    <Container 
      style={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', // Center contents vertically
        alignItems: 'center', // Center contents horizontally
        backgroundColor: '#f5f5f5', // Light background color
        padding: '20px',
      }}
    >
      <Header>
        <h1 style={{ color: '#4CAF50', animation: 'fadeIn 1s ease-in-out' }}>Welcome to MetaMask Login</h1>
      </Header>
      <Content style={{ textAlign: 'center', marginTop: '20px', animation: 'slideIn 0.5s ease-in-out' }}>
        {isMetaMaskInstalled ? (
          <div>
            {account ? (
              <div>
                <Button 
                  appearance="primary" 
                  size="lg" // Large size button
                  onClick={handleOpen} // Open modal on button click
                  style={{ marginTop: '10px' }}
                >
                  Proceed to Dashboard
                </Button>
                {/* Modal for confirming navigation */}
                <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
                  <Modal.Body className="modal-body">
                    <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
                    You are about to proceed to the dashboard. Are you sure you want to continue?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={proceedToDashboard} appearance="primary">
                      Yes
                    </Button>
                    <Button onClick={handleClose} appearance="subtle">
                      Cancel
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : (
              <Button 
                appearance="default" 
                size="lg" // Large size button
                onClick={connectMetaMask}
                style={{ marginTop: '10px', backgroundColor: '#4CAF50', color: 'white' }}
              >
                Connect with MetaMask
              </Button>
            )}
          </div>
        ) : (
          <Modal backdrop="static" role="alertdialog" open onClose={handleClose} size="xs">
            <Modal.Body className="modal-body">
              <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />
              Redirecting to install MetaMask...
            </Modal.Body>
          </Modal>
        )}

      </Content>
    </Container>
      <CustomFooter />
      </>
  );
};

export default Metamask;

