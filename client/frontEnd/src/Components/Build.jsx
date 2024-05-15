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
  const [selectedProcessor, setSelectedProcessor] = useState({
    name: "",
  });
  const [selectedMotherboard, setSelectedMotherboard] = useState({
    name: "",
  });
  const [selectedGPU, setSelectedGPU] = useState({
    name: "",
  });
  const [selectedStorage, setSelectedStorage] = useState({
    name: "",
  });
  const [selectedRAM, setSelectedRAM] = useState({
    name: "",
  });
  const [selectedSMPS, setSelectedSMPS] = useState({
    name: "",
  });
  const [selectedCabinet, setSelectedCabinet] = useState({
    name: "",
  });

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
    setShowProcessorModal(true);
  };

  const handleProcessorSelect = (SelectedProcessor) => {
    setSelectedProcessor(cpuData.find((obj) => obj._id === SelectedProcessor));
    console.log(cpuData.find((obj) => obj._id === SelectedProcessor));
    setShowProcessorModal(false);
    setShowMotherboardModal(true);
  };

  const handleMotherboardSelect = (SelectedMotherboard) => {
    setSelectedMotherboard(
      motherboardData.find((obj) => obj._id === SelectedMotherboard)
    );
    console.log(motherboardData.find((obj) => obj._id === SelectedMotherboard));
    setShowMotherboardModal(false);
    setShowGPUModal(true);
  };

  const handleGPUSelect = (SelectedGPU) => {
    setSelectedGPU(gpuData.find((obj) => obj._id === SelectedGPU));
    console.log(gpuData.find((obj) => obj._id === SelectedGPU));
    setShowGPUModal(false);
    setShowStorageModal(true);
  };

  const handleStorageSelect = (SelectedStorage) => {
    setSelectedStorage(storageData.find((obj) => obj._id === SelectedStorage));
    console.log(storageData.find((obj) => obj._id === SelectedStorage));
    setShowStorageModal(false);
    setShowRAMModal(true);
  };

  const handleRAMSelect = (SelectedRAM) => {
    setSelectedRAM(ramData.find((obj) => obj._id === SelectedRAM));
    console.log(ramData.find((obj) => obj._id === SelectedRAM));
    setShowRAMModal(false);
    setShowSMPSModal(true);
  };

  const handleSMPSSelect = (SelectedSMPS) => {
    setSelectedSMPS(smpsData.find((obj) => obj._id === SelectedSMPS));
    console.log(smpsData.find((obj) => obj._id === SelectedSMPS));
    setShowSMPSModal(false);
    setShowCabinetModal(true);
  };

  const handleCabinetSelect = (SelectedCabinet) => {
    setSelectedCabinet(cabinetData.find((obj) => obj._id === SelectedCabinet));
    console.log(cabinetData.find((obj) => obj._id === SelectedCabinet));
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
            <div className="selection">{selectedProcessor && <p>Done!</p>}</div>
          )}
          <div className="pc-img">
            <img src={pc} alt="" />
          </div>
        </div>

        {/* Modals */}
        {showProcessorModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <h2>Choose Processor</h2>

              <select
                onChange={(e) => handleProcessorSelect(e.target.value)}
                value="default"
              >
                <option disabled label="Available Processor" value="default" />

                {cpuData
                  .filter(
                    (processor) =>
                      processor.manufacturer.toLowerCase() ===
                      platform.toLowerCase()
                  )
                  .map((processor, index) => (
                    <option key={index} value={processor._id}>
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
              <h2>Choose Motherboard</h2>
              <select
                onChange={(e) => handleMotherboardSelect(e.target.value)}
                value="default"
              >
                <option label="Available Motherboards" value="default" />
                {motherboardData.filter((motherboard) => motherboard.specifications.socket === selectedProcessor.specifications.socket).map((motherboard, index) => (
                  <option key={index} value={motherboard._id}>
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
              <h2>Choose GPU</h2>
              <select
                onChange={(e) => handleGPUSelect(e.target.value)}
                defaultValue="Choose GPU"
                value="default"
              >
                <option disabled label="Available GPU" value="default" />
                {gpuData.map((gpu, index) => (
                  <option key={index} value={gpu._id}>
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
              <h2>Choose Storage</h2>
              <select
                onChange={(e) => handleStorageSelect(e.target.value)}
                value="default"
              >
                <option disabled label="Available Storage" value="default" />
                {storageData.map((storage, index) => (
                  <option key={index} value={storage._id}>
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
              <h2>Choose RAM</h2>
              <select
                onChange={(e) => handleRAMSelect(e.target.value)}
                value="default"
              >
                <option disabled label="Available RAM" value="default" />
                {ramData.filter((ram) => ram.specifications.type === selectedMotherboard.specifications.ram_type).map((ram, index) => (
                  <option key={index} value={ram._id}>
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
              <h2>Choose SMPS</h2>
              <select
                onChange={(e) => handleSMPSSelect(e.target.value)}
                value="default"
              >
                <option disabled label="Available SMPS" value="default" />
                {smpsData.map((smps, index) => (
                  <option key={index} value={smps._id}>
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
              <h2>Choose Cabinet</h2>
              <select
                onChange={(e) => handleCabinetSelect(e.target.value)}
                value="default"
              >
                <option disabled label="Available Cabinet" value="default" />
                {cabinetData.filter((cabinet) => (cabinet.specifications.motherboard_support).includes(selectedMotherboard.specifications.form_factor)).map((cabinet, index) => (
                  <option key={index} value={cabinet._id}>
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
          <p id="cpu">CPU: {selectedProcessor.name}</p>
          <p id="motherboard">Motherboard: {selectedMotherboard.name}</p>
          <p id="gpu">GPU: {selectedGPU.name}</p>
          <p id="storage">Storage: {selectedStorage.name}</p>
          <p id="ram">RAM: {selectedRAM.name}</p>
          <p id="smps">SMPS: {selectedSMPS.name}</p>
          <p id="cabinet">Cabinet: {selectedCabinet.name}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Build;
