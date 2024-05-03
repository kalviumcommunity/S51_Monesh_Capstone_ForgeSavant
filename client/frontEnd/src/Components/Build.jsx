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
                const gpuResponse = await axios.get('http://localhost:5000/GPU');
                setGpuData(gpuResponse.data);

                const cpuResponse = await axios.get('http://localhost:5000/CPU');
                setCpuData(cpuResponse.data);

                const cabinetResponse = await axios.get('http://localhost:5000/cabinet');
                setCabinetData(cabinetResponse.data);

                const storageResponse = await axios.get('http://localhost:5000/storage');
                setStorageData(storageResponse.data);

                const smpsResponse = await axios.get('http://localhost:5000/smps');
                setSmpsData(smpsResponse.data);

                const motherboardResponse = await axios.get('http://localhost:5000/motherboard');
                setMotherboardData(motherboardResponse.data);

                const ramResponse = await axios.get('http://localhost:5000/ram');
                setRamData(ramResponse.data);
                console.log(cabinetData)
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
