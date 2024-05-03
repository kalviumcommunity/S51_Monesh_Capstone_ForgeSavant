import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../Styles/Build.css';
import pc from "../assets/custom-gaming-pc.png";

const Build = () => {
    const [gpuData, setGpuData] = useState([]);
    const [cpuData, setCpuData] = useState([]);
    const [cabinetData, setCabinetData] = useState([]);
    const [storageData, setStorageData] = useState([]);
    const [smpsData, setSmpsData] = useState([]);
    const [motherboardData, setMotherboardData] = useState([]);
    const [ramData, setRamData] = useState([]);

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
                    ramResponse
                ] = await Promise.all([
                    axios.get('http://localhost:5000/GPU'),
                    axios.get('http://localhost:5000/CPU'),
                    axios.get('http://localhost:5000/cabinet'),
                    axios.get('http://localhost:5000/storage'),
                    axios.get('http://localhost:5000/smps'),
                    axios.get('http://localhost:5000/motherboard'),
                    axios.get('http://localhost:5000/ram')
                ]);

                setGpuData(gpuResponse.data);
                setCpuData(cpuResponse.data);
                setCabinetData(cabinetResponse.data);
                setStorageData(storageResponse.data);
                setSmpsData(smpsResponse.data);
                setMotherboardData(motherboardResponse.data);
                setRamData(ramResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return(
        <React.Fragment>
            <div className="Build_Page">
                <div className="Build-Title">
                    <h1><span id="gold">Forge</span> Arena</h1>
                    <h3>Start Forging your Dream PC</h3>
                </div>
                <div className="Build-Area">
                    <div className="selection">Choose Platform</div>
                    <div className="pc-img"><img src={pc} alt="" /></div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Build;
