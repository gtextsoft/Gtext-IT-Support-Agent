import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import WelcomePage from "./pages/WelcomePage";
import Complaint from "./pages/Complaint";
import Delete from "./pages/Delete";
import Zoom from "./pages/Zoom";
import Suggestion from "./pages/Suggestion";
import ScheduleMeeting from "./pages/ScheduleMeeting";
import LeadChecker from "./pages/LeadChecker";
import QRGenerator from "./pages/QRGenerator";
import DemoVideo from "./pages/DemoVideo";
import CreateMailAndERPBar from "./pages/CreateMailandERPBar";
import DeactivateEmployeeMail from "./pages/DeactivateEmployeeMail";

const App = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/create" element={<CreateMailAndERPBar />} />
          <Route path="/deactivate" element={<DeactivateEmployeeMail />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/zoom" element={<Zoom />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
          <Route path="/lead-checker" element={<LeadChecker />} />
          <Route path="/qr-generator" element={<QRGenerator />} />
          <Route path="/demo-video" element={<DemoVideo />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
