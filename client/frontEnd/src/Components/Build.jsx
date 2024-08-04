import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Build.css";
import pc from "../assets/custom-gaming-pc.png";
import processorImg from "../assets/Processor-Background-PNG-Image.png";
import motherboardImg from "../assets/Motherboard-PNG.png";
import graphicCardImg from "../assets/graphics-card-image.png";
import storageImg from "../assets/pngwing.com.png";
import RAMImg from "../assets/RAM-Memory-Transparent.png";
import SmpsImg from "../assets/SMPS-image.png";
import Button from "@mui/material/Button";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import APIKey from "../APIKey";
import { selectClasses } from "@mui/material";

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
  const [selectedSecondStorage, setSelectedSecondStroge] = useState({
    name: "",
  });
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

  const [message, setMessage] = useState("");

  const [PSUSuggest, setPSUSuggest] = useState("");

  const [scores, setScores] = useState({});

  const navigate = useNavigate();

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
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/GPU"),
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/CPU"),
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/cabinet"),
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/storage"),
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/smps"),
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/motherboard"),
          axios.get("https://s51-monesh-capstone-forgesavant.onrender.com/ram"),
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

  const handleComponentSelect = (data, setSelected) => async (event) => {
    const selected = data.find((obj) => obj._id === event.target.value);
    setSelected(selected);

    if (setSelected === setSelectedCabinet){
      setCurrentImage(selected.image_url);
    }
  };

  const apiSearch = async () => {
    const psuSuggestion = await run(
      `processor: ${selectedProcessor.name}\nmotherboard: ${selectedMotherboard.name}\ngpu: ${selectedGPU.name}`
    );
    const performance = await runPerformance(
      `cpu: ${selectedProcessor.name}, gpu: ${selectedMotherboard.name}, motherboard: ${selectedGPU.name}`
    );
    setPSUSuggest(psuSuggestion.trim());
    setScores(performance);
  };

  const handleNext = (currModal, nextModal, image) => {
    currModal(false);
    nextModal(true);
    updateImage(image);
  };

  const filterData = (data, criteria) => {
    return data.filter(criteria);
  };

  //PSU Generate
  const genAI = new GoogleGenerativeAI(APIKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction:
      'Return just the value of PSU wattage recommended no need of explanation or any extra words. example: "650" note the value must be max watt',
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
            {
              text: "processor: Intel Core i9-12900k\nMotherboard: ASUS ROG Strix Z690-E Gaming\nGPU: Nvidia Geforce RTX 3080",
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: "750W - 850W \n" }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const response = result.response.text();
    console.log(response);
    return response;
  }

  //Performance generate
  const modelPerformance = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
    systemInstruction:
      "Using the components detail give the cinebench score and fps in cyberpunk game. Output example: cinebench: 7000, cyberpunk: 87 (don't give in string format)",
  });

  const generationConfigPerformance = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  async function runPerformance(prompt) {
    const chatSession = modelPerformance.startChat({
      generationConfig: generationConfigPerformance,
      history: [
        {
          role: "user",
          parts: [
            {
              text: "cpu: Intel Core i9-12900K, gpu: Nvidia GeForce RTX 3080, motherboard: ASUS ROG Strix Z690-E Gaming",
            },
          ],
        },
        {
          role: "model",
          parts: [{ text: '{"cinebench": 25000, "cyberpunk": 100}\n' }],
        },
      ],
    });

    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();

    try {
      const responseObject = JSON.parse(responseText);
      return responseObject;
    } catch (error) {
      console.error("Failed to parse response as JSON:", error);
      return null;
    }
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");

    if (!email) {
      setMessage("Login to save");
      console.log(message);
    } else {
      try {
        const response = await axios.post("https://s51-monesh-capstone-forgesavant.onrender.com/saves", {
          cpu: selectedProcessor.name,
          motherboard: selectedMotherboard.name,
          gpu: selectedGPU.name,
          primaryStorage: selectedStorage.name,
          secondaryStorage: selectedSecondStorage.name,
          ram: selectedRAM.name,
          powerSupply: selectedSMPS.name,
          cabinet: selectedCabinet.name,
          email: email,
          cinebench: scores.cinebench,
          cyberpunk: scores.cyberpunk,
          image: selectedCabinet.image_url,
        });

        console.log("Response Status:", response.status);

        if (response.status === 201) {
          console.log("Saved successfully");
          navigate("/profile");
        } else {
          console.log("Unexpected response status:", response.status);
        }
      } catch (err) {
        console.error("Error during save:", err);
      }
    }
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
        <div className="Build-Content">
          <div className="Build-Area">
            {platform === "" ? (
              <div className="selection">
                <h2>Choose Platform</h2>
                <div>
                  <p
                    className="sel"
                    onClick={() => handlePlatformSelect("AMD")}
                  >
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
              <>
                {showProcessorModal && (
                  <div className="modal-content selection">
                    <h2>Choose Processor</h2>
                    <select
                      onChange={handleComponentSelect(
                        cpuData,
                        setSelectedProcessor
                      )}
                    >
                      <option
                        // disabled
                        label="Available Processor"
                        // value="default"
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
                    {selectedProcessor.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleNext(
                              setShowProcessorModal,
                              setShowMotherboardModal,
                              "motherboard"
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showMotherboardModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose Motherboard</h2>
                    <select
                      onChange={handleComponentSelect(
                        motherboardData,
                        setSelectedMotherboard
                      )}
                    >
                      <option label="Available Motherboards" />
                      {filterData(
                        motherboardData,
                        (motherboard) =>
                          motherboard.specifications.socket ===
                          selectedProcessor.specification.socket
                      ).map((motherboard, index) => (
                        <option key={index} value={motherboard._id}>
                          {motherboard.name}
                        </option>
                      ))}
                    </select>
                    {selectedMotherboard.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleNext(
                              setShowMotherboardModal,
                              setShowGPUModal,
                              "gpu"
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showGPUModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose GPU</h2>
                    <select
                      onChange={handleComponentSelect(gpuData, setSelectedGPU)}
                    >
                      <option label="Available GPU" />
                      {gpuData.map((gpu, index) => (
                        <option key={index} value={gpu._id}>
                          {gpu.name}
                        </option>
                      ))}
                    </select>
                    {selectedGPU.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleNext(
                              setShowGPUModal,
                              setShowStorageModal,
                              "storage"
                            );
                            apiSearch();
                          }}
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showStorageModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose Storage</h2>
                    <select
                      onChange={handleComponentSelect(
                        storageData,
                        setSelectedStorage
                      )}
                    >
                      <option label="Available Storage" />
                      {filterData(
                        storageData,
                        (storage) => storage.specifications.interface === "NVMe"
                      ).map((storage, index) => (
                        <option key={index} value={storage._id}>
                          {storage.name}
                        </option>
                      ))}
                    </select>
                    {selectedStorage.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleNext(
                              setShowStorageModal,
                              setShowSecondStorageModal,
                              "storage"
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showSecondStorageModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose Secondary Storage</h2>
                    <select
                      onChange={handleComponentSelect(
                        storageData,
                        setSelectedSecondStroge
                      )}
                    >
                      <option label="Available Storage" />
                      {filterData(
                        storageData,
                        (storage) => storage.specifications.interface === "SATA"
                      ).map((storage, index) => (
                        <option key={index} value={storage._id}>
                          {storage.name}
                        </option>
                      ))}
                    </select>
                    {selectedSecondStorage.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleNext(
                              setShowSecondStorageModal,
                              setShowRAMModal,
                              "ram"
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showRAMModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose RAM</h2>
                    <select
                      onChange={handleComponentSelect(ramData, setSelectedRAM)}
                    >
                      <option label="Available RAM" />
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
                    {selectedRAM.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleNext(
                              setShowRAMModal,
                              setShowSMPSModal,
                              "smps"
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showSMPSModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose SMPS</h2>
                    <select
                      onChange={handleComponentSelect(
                        smpsData,
                        setSelectedSMPS
                      )}
                    >
                      <option label="Available SMPS" />
                      {filterData(smpsData, (smps) => {
                        const smpsPSU = parseInt(smps.specification.wattage);
                        const comparePSU = parseInt(PSUSuggest);
                        console.log(PSUSuggest);
                        return (
                          smpsPSU <= comparePSU && smpsPSU >= comparePSU - 100
                        );
                      }).map((smps, index) => (
                        <option key={index} value={smps._id}>
                          {smps.name}
                        </option>
                      ))}
                    </select>
                    {selectedSMPS.name != "" ? (
                      <div className="next">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() =>
                            handleNext(
                              setShowSMPSModal,
                              setShowCabinetModal,
                              "cabinet"
                            )
                          }
                        >
                          next
                        </Button>
                      </div>
                    ) : (
                      <div className="next">
                        <Button variant="outlined" color="primary">
                          next
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {showCabinetModal && (
                  <div className="modal-content processor-modal selection">
                    <h2>Choose Cabinet</h2>
                    <select
                      onChange={
                        handleComponentSelect(cabinetData, setSelectedCabinet)
                      }
                    >
                      <option label="Available Cabinet" />
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
                    {selectedCabinet.name != "" ? (
                      <div className="done">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSave}
                        >
                          Done!
                        </Button>
                      </div>
                    ) : (
                      <div className="done">
                        <Button variant="outlined" color="primary">
                          Done
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="pc-img">
            <img src={currentImage} alt="PC" />
            {showProcessorModal && selectedProcessor.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Cores:</p>
                  <p>Threads:</p>
                </div>
                <div>
                  <p>{selectedProcessor.name}</p>
                  <p>{selectedProcessor.specification.cores}</p>
                  <p>{selectedProcessor.specification.threads}</p>
                </div>
              </div>
            )}
            {showMotherboardModal && selectedMotherboard.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Chipset:</p>
                  <p>Lan:</p>
                  <p>Usb Ports:</p>
                </div>
                <div>
                  <p>{selectedMotherboard.name}</p>
                  <p>{selectedMotherboard.specifications.chipset}</p>
                  <p>{selectedMotherboard.specifications.lan}</p>
                  <p>{selectedMotherboard.specifications.usb_ports}</p>
                </div>
              </div>
            )}
            {showGPUModal && selectedGPU.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Core Count:</p>
                  <p>Memory:</p>
                  <p>TDP:</p>
                </div>
                <div>
                  <p>{selectedGPU.name}</p>
                  <p>{selectedGPU.specifications.core_count}</p>
                  <p>{selectedGPU.specifications.memory}</p>
                  <p>{selectedGPU.specifications.tdp}</p>
                </div>
              </div>
            )}
            {showStorageModal && selectedStorage.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Capacity:</p>
                  <p>Speed:</p>
                  <p>Warranty:</p>
                </div>
                <div>
                  <p>{selectedStorage.name}</p>
                  <p>{selectedStorage.specifications.capacity}</p>
                  <p>{selectedStorage.specifications.speed}</p>
                  <p>{selectedStorage.specifications.warranty}</p>
                </div>
              </div>
            )}
            {showSecondStorageModal && selectedSecondStorage.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Capacity:</p>
                  <p>Speed:</p>
                  <p>Warranty:</p>
                </div>
                <div>
                  <p>{selectedSecondStorage.name}</p>
                  <p>{selectedSecondStorage.specifications.capacity}</p>
                  <p>{selectedSecondStorage.specifications.speed}</p>
                  <p>{selectedSecondStorage.specifications.warranty}</p>
                </div>
              </div>
            )}
            {showRAMModal && selectedRAM.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Capacity:</p>
                  <p>Type:</p>
                  <p>Speed:</p>
                </div>
                <div>
                  <p>{selectedRAM.name}</p>
                  <p>{selectedRAM.specifications.capacity}</p>
                  <p>{selectedRAM.specifications.type}</p>
                  <p>{selectedRAM.specifications.speed}</p>
                </div>
              </div>
            )}
            {showSMPSModal && selectedSMPS.name && (
              <div className="list">
                <div>
                  <p>Name:</p>
                  <p>Wattage:</p>
                  <p>Efficiency:</p>
                  <p>Fan Size:</p>
                </div>
                <div>
                  <p>{selectedSMPS.name}</p>
                  <p>{selectedSMPS.specification.wattage}</p>
                  <p>{selectedSMPS.specification.efficiency}</p>
                  <p>{selectedSMPS.specification.fan_size}</p>
                </div>
              </div>
            )}
            {showCabinetModal && selectedCabinet.name && ( <div className="list">
              <div>
                <p>Name:</p>
                <p>Manufacturer:</p>
                <p>Form Factor:</p>
              </div>
              <div>
                <p>{selectedCabinet.name}</p>
                <p>{selectedCabinet.manufacturer}</p>
                <p>{selectedCabinet.specifications.form_factor}</p>
              </div>
            </div> )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Build;
