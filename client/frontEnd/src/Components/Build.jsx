import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Build.css";
import pc from "../assets/custom-gaming-pc.png";

const Build = () => {
  const [gpuData, setGpuData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [cabinetData, setCabinetData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [smpsData, setSmpsData] = useState([]);
  const [motherboardData, setMotherboardData] = useState([]);
  const [ramData, setRamData] = useState([]);

  const [platform, setPlatform] = useState("");
  const [selectedProcessor, setSelectedProcessor] = useState("");
  const [showProcessorModal, setShowProcessorModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          gpuResponse,
          cpuResponse,
          cabinetResponse,
          storageResponse,
          smpsResponse,
          motherboardResponse,
          ramResponse,
        ] = await Promise.all([
          axios.get("http://localhost:5000/GPU"),
          axios.get("http://localhost:5000/CPU"),
          axios.get("http://localhost:5000/cabinet"),
          axios.get("http://localhost:5000/storage"),
          axios.get("http://localhost:5000/smps"),
          axios.get("http://localhost:5000/motherboard"),
          axios.get("http://localhost:5000/ram"),
        ]);

        setGpuData(gpuResponse.data);
        setCpuData(cpuResponse.data);
        setCabinetData(cabinetResponse.data);
        setStorageData(storageResponse.data);
        setSmpsData(smpsResponse.data);
        setMotherboardData(motherboardResponse.data);
        setRamData(ramResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePlatformSelect = (selectedPlatform) => {
    setPlatform(selectedPlatform);
  };

  const handleProcessorSelect = (selectedProcessor) => {
    setSelectedProcessor(selectedProcessor);
    setShowProcessorModal(false); // Hide processor selection modal after processor is selected
  };

  return (
    <React.Fragment>
      <div className="Build_Page">
        <div className="Build-Title">
          <h1>
            <span id="gold">Forge</span> Arena
          </h1>
          <h3>Start Forging your Dream PC</h3>
        </div>
        <div className="Build-Area">
          {/* Render platform selection div or select processor button based on platform state */}
          {platform === "" ? (
            <>
              <div
                className="selection"
                onClick={() => handlePlatformSelect("AMD")}
              >
                Choose AMD
              </div>
              <div
                className="selection"
                onClick={() => handlePlatformSelect("Intel")}
              >
                Choose INTEL
              </div>
            </>
          ) : (
            <button
              className="processor-select-btn selection"
              onClick={() => setShowProcessorModal(true)}
            >
              Select Processor
            </button>
          )}
          <div className="pc-img">
            <img src={pc} alt="" />
          </div>
        </div>
      </div>

      {showProcessorModal && (
        <div className="modal">
          <div className="modal-content processor-modal">
            <span
              className="close"
              onClick={() => setShowProcessorModal(false)}
            >
              &times;
            </span>
            <h2>Choose Processor</h2>
            <select onChange={(e) => handleProcessorSelect(e.target.value)}>
              {/* Render processor options based on selected platform */}
              {cpuData
                .filter(
                  (processor) =>
                    processor.manufacturer.toLowerCase() ===
                    platform.toLowerCase()
                ) // Case insensitive comparison
                .map((processor) => (
                  <option key={processor._id.$oid} value={processor.name}>
                    {processor.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Build;
