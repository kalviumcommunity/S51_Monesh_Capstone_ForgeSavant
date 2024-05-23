import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Build.css";
import pc from "../assets/custom-gaming-pc.png";
import processorImg from "../assets/Processor-Background-PNG-Image.png";
import motherboardImg from "../assets/Motherboard-PNG.png";
import graphicCardImg from "../assets/graphics-card-image.png";
import storageImg from "../assets/pngwing.com.png";
import RAMImg from "../assets/RAM-Memory-Transparent.png";
import SmpsImg from "../assets/SMPS-image.png";

const imagePaths = {
  processor: processorImg,
  motherboard: motherboardImg,
  gpu: graphicCardImg,
  storage: storageImg,
  ram: RAMImg,
  smps: SmpsImg,
};

const Build = () => {
  const [gpuData, setGpuData] = useState([]);
  const [cpuData, setCpuData] = useState([]);
  const [cabinetData, setCabinetData] = useState([]);
  const [storageData, setStorageData] = useState([]);
  const [smpsData, setSmpsData] = useState([]);
  const [motherboardData, setMotherboardData] = useState([]);
  const [ramData, setRamData] = useState([]);

  const [platform, setPlatform] = useState("");
  const [selectedProcessor, setSelectedProcessor] = useState({ name: "" });
  const [selectedMotherboard, setSelectedMotherboard] = useState({ name: "" });
  const [selectedGPU, setSelectedGPU] = useState({ name: "" });
  const [selectedStorage, setSelectedStorage] = useState({ name: "" });
  const [selectedSecondStorage, setSelectedSecondStroge] = useState({ name: "" });
  const [selectedRAM, setSelectedRAM] = useState({ name: "" });
  const [selectedSMPS, setSelectedSMPS] = useState({ name: "" });
  const [selectedCabinet, setSelectedCabinet] = useState({ name: "" });

  const [showProcessorModal, setShowProcessorModal] = useState(false);
  const [showMotherboardModal, setShowMotherboardModal] = useState(false);
  const [showGPUModal, setShowGPUModal] = useState(false);
  const [showStorageModal, setShowStorageModal] = useState(false);
  const [showSecondStorageModal, setShowSecondStorageModal] = useState(false);
  const [showRAMModal, setShowRAMModal] = useState(false);
  const [showSMPSModal, setShowSMPSModal] = useState(false);
  const [showCabinetModal, setShowCabinetModal] = useState(false);

  const [currentImage, setCurrentImage] = useState(pc);

  const updateImage = (stage) => {
    setCurrentImage(imagePaths[stage] || pc);
  };

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
    updateImage("processor");
    setPlatform(selectedPlatform);
    setShowProcessorModal(true);
  };

  const handleComponentSelect =
    (data, setSelected, stage, nextModalSetter) => (event) => {
      const selected = data.find((obj) => obj._id === event.target.value);
      setSelected(selected);
      updateImage(stage);
      nextModalSetter(true);
    };

  const filterData = (data, criteria) => {
    return data.filter(criteria);
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
              <h2>Choose Platform</h2>
              <div>
                <p className="sel" onClick={() => handlePlatformSelect("AMD")}>
                  AMD
                </p>
                <p
                  className="sel"
                  onClick={() => handlePlatformSelect("Intel")}
                >
                  INTEL
                </p>
              </div>
            </div>
          ) : (
            <div className="selection">{selectedProcessor && <p>Done!</p>}</div>
          )}
          <div className="pc-img">
            <img src={currentImage} alt="PC" />
          </div>
        </div>

        {/* Modals */}
        {showProcessorModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <h2>Choose Processor</h2>
              <div className="selection-container">
                <select
                  onChange={handleComponentSelect(
                    cpuData,
                    setSelectedProcessor,
                    "motherboard",
                    setShowMotherboardModal
                  )}
                  value="default"
                >
                  <option
                    disabled
                    label="Available Processor"
                    value="default"
                  />
                  {filterData(
                    cpuData,
                    (processor) =>
                      processor.manufacturer.toLowerCase() ===
                      platform.toLowerCase()
                  ).map((processor, index) => (
                    <option key={index} value={processor._id}>
                      {processor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {showMotherboardModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <h2>Choose Motherboard</h2>
              <select
                onChange={handleComponentSelect(
                  motherboardData,
                  setSelectedMotherboard,
                  "gpu",
                  setShowGPUModal
                )}
                value="default"
              >
                <option label="Available Motherboards" value="default" />
                {filterData(
                  motherboardData,
                  (motherboard) =>
                    motherboard.specifications.socket ===
                    selectedProcessor.specifications.socket
                ).map((motherboard, index) => (
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
                onChange={handleComponentSelect(
                  gpuData,
                  setSelectedGPU,
                  "storage",
                  setShowStorageModal
                )}
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
                onChange={handleComponentSelect(
                  storageData,
                  setSelectedStorage,
                  "storage",
                  setShowSecondStorageModal
                )}
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

        {showSecondStorageModal && (
          <div className="modal">
            <div className="modal-content processor-modal">
              <h2>Choose Secondary Storage</h2>
              <select
                onChange={handleComponentSelect(
                  storageData,
                  setSelectedSecondStroge,
                  "ram",
                  setShowRAMModal
                )}
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
                onChange={handleComponentSelect(
                  ramData,
                  setSelectedRAM,
                  "smps",
                  setShowSMPSModal
                )}
                value="default"
              >
                <option disabled label="Available RAM" value="default" />
                {filterData(
                  ramData,
                  (ram) =>
                    ram.specifications.type ===
                    selectedMotherboard.specifications.ram_type
                ).map((ram, index) => (
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
                onChange={handleComponentSelect(
                  smpsData,
                  setSelectedSMPS,
                  "cabinet",
                  setShowCabinetModal
                )}
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
                onChange={handleComponentSelect(
                  cabinetData,
                  setSelectedCabinet,
                  "",
                  () => {}
                )}
                value="default"
              >
                <option disabled label="Available Cabinet" value="default" />
                {filterData(cabinetData, (cabinet) =>
                  cabinet.specifications.motherboard_support.includes(
                    selectedMotherboard.specifications.form_factor
                  )
                ).map((cabinet, index) => (
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
