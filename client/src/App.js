import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Freelancer from './pages/freelancer';
import Metamask from './pages/metamask';
import Dashboard from './pages/dashboard';
import Owner from './pages/owner';
import Freelancer2 from './pages/freelancer2';
import Freelancer3 from './pages/freelancer3';

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
        <Route path="/owner" element={<Freelancer /> } />
        {/* <Route path="/owner" element={<Owner />} /> */}
        <Route path="/freelancer" element={<Freelancer3 />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
