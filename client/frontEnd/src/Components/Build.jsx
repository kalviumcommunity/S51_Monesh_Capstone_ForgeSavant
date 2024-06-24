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
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold,} from "@google/generative-ai";
import APIKey from "../APIKey";

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

  const [PSUSuggest, setPSUSuggest] = useState("")

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
    (data, setSelected, stage, nextModalSetter) => async (event) => {
      const selected = data.find((obj) => obj._id === event.target.value);
      setSelected(selected);
      updateImage(stage);
      nextModalSetter(true);

      if (stage === "ram"){
        const psuSuggestion = await run(`processor: ${selectedProcessor.name}\nmotherboard: ${selectedMotherboard.name}\ngpu: ${selectedGPU.name}`);
        setPSUSuggest(psuSuggestion.trim())
      }
    };

  const filterData = (data, criteria) => {
    return data.filter(criteria);
  };
  
  const genAI = new GoogleGenerativeAI(APIKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction: "Return just the value of PSU wattage recommended no need of explanation or any extra words. example: \"650\" note the value must be max watt",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run(prompt) {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "processor: Intel Core i9-12900k\nMotherboard: ASUS ROG Strix Z690-E Gaming\nGPU: Nvidia Geforce RTX 3080"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "850W \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text()
    console.log(response);
    return response
  }

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
                {filterData(storageData, (storage) => storage.specifications.interface === "NVMe").map((storage, index) => (
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
                {filterData(storageData, (storage) => storage.specifications.interface === "SATA").map((storage, index) => (
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
                {filterData(smpsData, (smps) => {
                  const smpsPSU = parseInt(smps.specifications.wattage)
                  const comparePSU = parseInt(PSUSuggest)
                  console.log(PSUSuggest)
                  return smpsPSU <= comparePSU && smpsPSU >= comparePSU - 100
                }).map((smps, index) => (
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
          <div id="cpu">CPU:<br/><br/> {selectedProcessor.name}</div>
          <div id="motherboard">Motherboard:<br/><br/> {selectedMotherboard.name}</div>
          <div id="gpu">GPU:<br/><br/> {selectedGPU.name}</div>
          <div id="storage">Storage:<br/><br/> {selectedStorage.name}</div>
          <div id="storage">Secondary Storage:<br/><br/> {selectedSecondStorage.name}</div>
          <div id="ram">RAM:<br/><br/> {selectedRAM.name}</div>
          <div id="smps">SMPS:<br/><br/> {selectedSMPS.name}</div>
          <div id="cabinet">Cabinet:<br/><br/> {selectedCabinet.name}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Build;
