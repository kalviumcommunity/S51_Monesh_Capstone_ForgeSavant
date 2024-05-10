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
  const [selectedMotherboard, setSelectedMotherboard] = useState("");
  const [selectedGPU, setSelectedGPU] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedSMPS, setSelectedSMPS] = useState("");
  const [selectedCabinet, setSelectedCabinet] = useState("");

  const [showProcessorModal, setShowProcessorModal] = useState(false);
  const [showMotherboardModal, setShowMotherboardModal] = useState(false);
  const [showGPUModal, setShowGPUModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showRAMModal, setShowRAMModal] = useState(false);
  const [showSMPSModal, setShowSMPSModal] = useState(false);
  const [showCabinetModal, setShowCabinetModal] = useState(false);

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
    setShowProcessorModal(false);
    setShowMotherboardModal(true);
  };

  const handleMotherboardSelect = (selectedMotherboard) => {
    setSelectedMotherboard(selectedMotherboard);
    setShowMotherboardModal(false);
    setShowGPUModal(true);
  };

  const handleGPUSelect = (selectedGPU) => {
    setSelectedGPU(selectedGPU);
    setShowGPUModal(false);
    setShowStorageModal(true);
  };

  const handleStorageSelect = (selectedStorage) => {
    setSelectedStorage(selectedStorage);
    setShowStorageModal(false);
    setShowRAMModal(true);
  };

  const handleRAMSelect = (selectedRAM) => {
    setSelectedRAM(selectedRAM);
    setShowRAMModal(false);
    setShowSMPSModal(true);
  };

  const handleSMPSSelect = (selectedSMPS) => {
    setSelectedSMPS(selectedSMPS);
    setShowSMPSModal(false);
    setShowCabinetModal(true);
  };

  const handleCabinetSelect = (selectedCabinet) => {
    setSelectedCabinet(selectedCabinet);
    setShowCabinetModal(false);
    // You can perform any final actions here, like displaying a summary or submitting the build configuration
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
          {platform === "" ? (
            <div className="selection">
              <p className="sel" onClick={() => handlePlatformSelect("AMD")}>
                Choose AMD
              </p>
              <p className="sel" onClick={() => handlePlatformSelect("Intel")}>
                Choose INTEL
              </p>
            </div>
          ) : (
            <div className="selection">
              {!selectedProcessor && (
                <p
                  className="selection"
                  onClick={() => setShowProcessorModal(true)}
                >
                  Select Processor
                </p>
              )}
              {selectedProcessor && <p>Done!</p>}
            </div>
          )}
          <div className="pc-img">
            <img src={pc} alt="" />
          </div>
        </div>

        {/* Modals */}
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
                {cpuData
                  .filter(
                    (processor) =>
                      processor.manufacturer.toLowerCase() ===
                      platform.toLowerCase()
                  )
                  .map((processor) => (
                    <option key={processor._id.$oid} value={processor.name}>
                      {processor.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        )}

        {showMotherboardModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <span
                className="close"
                onClick={() => setShowMotherboardModal(false)}
              >
                &times;
              </span>
              <h2>Choose Motherboard</h2>
              <select onChange={(e) => handleMotherboardSelect(e.target.value)}>
                {motherboardData.map((motherboard) => (
                  <option key={motherboard._id.$oid} value={motherboard.name}>
                    {motherboard.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {showGPUModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <span className="close" onClick={() => setShowGPUModal(false)}>
                &times;
              </span>
              <h2>Choose GPU</h2>
              <select onChange={(e) => handleGPUSelect(e.target.value)}>
                {gpuData.map((gpu) => (
                  <option key={gpu._id.$oid} value={gpu.name}>
                    {gpu.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {showStorageModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <span
                className="close"
                onClick={() => setShowStorageModal(false)}
              >
                &times;
              </span>
              <h2>Choose Storage</h2>
              <select onChange={(e) => handleStorageSelect(e.target.value)}>
                {storageData.map((storage) => (
                  <option key={storage._id.$oid} value={storage.name}>
                    {storage.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {showRAMModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <span className="close" onClick={() => setShowRAMModal(false)}>
                &times;
              </span>
              <h2>Choose RAM</h2>
              <select onChange={(e) => handleRAMSelect(e.target.value)}>
                {ramData.map((ram) => (
                  <option key={ram._id.$oid} value={ram.name}>
                    {ram.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {showSMPSModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <span className="close" onClick={() => setShowSMPSModal(false)}>
                &times;
              </span>
              <h2>Choose SMPS</h2>
              <select onChange={(e) => handleSMPSSelect(e.target.value)}>
                {smpsData.map((smps) => (
                  <option key={smps._id.$oid} value={smps.name}>
                    {smps.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {showCabinetModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <span
                className="close"
                onClick={() => setShowCabinetModal(false)}
              >
                &times;
              </span>
              <h2>Choose Cabinet</h2>
              <select onChange={(e) => handleCabinetSelect(e.target.value)}>
                {cabinetData.map((cabinet) => (
                  <option key={cabinet._id.$oid} value={cabinet.name}>
                    {cabinet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="specs-page">
        <div className="specs">
          <p id="cpu">CPU: {selectedProcessor}</p>
          <p id="motherboard">Motherboard: {selectedMotherboard}</p>
          <p id="gpu">GPU: {selectedGPU}</p>
          <p id="storage">Storage: {selectedStorage}</p>
          <p id="ram">RAM: {selectedRAM}</p>
          <p id="smps">SMPS: {selectedSMPS}</p>
          <p id="cabinet">Cabinet: {selectedCabinet}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Build;
