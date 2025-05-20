import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/Home/Home';
import ReportedItems from './components/founditems/ReportedItems';
import ReportFound from './components/lostitems/ReportFound'; 
import ReportLost from './components/lostitems/ReportLost';
import './App.css'; // Import your global styles here
import Register from './components/auth/Register';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path="/" element={<Home />} />
        {/* <Route path='/report-lost' element={<ReportLostItem />} /> */}
        <Route path="/report-lost" element={<ReportLost />} />
        <Route path="/report-found" element={<ReportFound />} />
        <Route path="/reported-items" element={<ReportedItems />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
