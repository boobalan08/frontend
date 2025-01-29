import React, { useState } from "react";
import Upload from "../components/Upload";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

const Home = () => {
  const [activeTab, setActiveTab] = useState("bulkUpload");

  return (
    <div className="container-fluid">
      <Navbar />
      {/* Tabs */}
      <ul className="nav nav-tabs mt-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "bulkUpload" ? "active" : ""}`}
            onClick={() => setActiveTab("bulkUpload")}
          >
            Bulk File Upload
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "chatRoom" ? "active" : ""}`}
            onClick={() => setActiveTab("chatRoom")}
          >
            Chat Room
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-4">
        {activeTab === "bulkUpload" && <Upload />}

        {activeTab === "chatRoom" && <Chat />}
      </div>
    </div>
  );
};

export default Home;
