// src/pages/ReportLost.jsx
import React from 'react';
import LostFoundForm from '../data/LostFoundForm';
// This component is for reporting lost items
// It imports the LostFoundForm component and passes "lost" as the type prop

const ReportLost = () => {
  return <LostFoundForm type="lost" />;
};

export default ReportLost;
