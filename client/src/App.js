import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Freelancer from './pages/freelancer';
import Metamask from './pages/metamask';
import Dashboard from './pages/dashboard';
import Owner from './pages/owner';
import Freelancer2 from './pages/freelancer2';
import Freelancer3 from './pages/freelancer3';
import ExistingJobs from './components/existingjob';
import JobDetails from './pages/jobdetails';
import Owner_projects from './pages/owner_projects';
// import Project_description from './pages/project_description';
import Profile from './pages/profile';
import EditJob from './components/editJob';

//import Contributor from './pages/contributor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Login />} />
        {/* <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Metamask />} />
        <Route path="/metamask" element={<Metamask />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/owner" element={<Owner /> } />
        {/* <Route path="/owner" element={<Owner />} /> */}
        <Route path="/freelancer" element={<Freelancer2 />} />
        {/* <Route path="/" element={<ExistingJobs />} /> */}
        <Route path="/job/:jobId" element={<JobDetails />} />
        <Route path="/owner_projects" element={<Owner_projects />} />
        <Route path="/project_description" element={<JobDetails/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit_job" element={<EditJob />} />

        
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
