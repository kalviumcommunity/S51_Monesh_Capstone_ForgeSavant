import React, { useState } from "react";
import Processor from "./Processor";
import Motherboard from "./Motherboard";
import GraphicsCard from "./GraphicsCard";
import RAM from "./RAM";
import Storage from "./Storage";
import SMPS from "./SMPS";
import Cabinet from "./Cabinet";
import CompatibilityPage from "./CompatibilityPage";

const Build = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedComponents, setSelectedComponents] = useState({
        processor: null,
        motherboard: null,
        graphicsCard: null,
        ram: null,
        storage: null,
        smps: null,
        cabinet: null,
    });

    const handleProcessorSelect = (processor) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            processor,
        }));
        setCurrentStep(2);
    };

    const handleMotherboardSelect = (motherboard) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            motherboard,
        }));
        setCurrentStep(3);
    };

    const handleGraphicsCardSelect = (graphicsCard) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            graphicsCard,
        }));
        setCurrentStep(4);
    };

    const handleRAMSelect = (ram) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            ram,
        }));
        setCurrentStep(5);
    };

    const handleStorageSelect = (storage) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            storage,
        }));
        setCurrentStep(6);
    };

    const handleSMPSSelect = (smps) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            smps,
        }));
        setCurrentStep(7);
    };

    const handleCabinetSelect = (cabinet) => {
        setSelectedComponents((prevSelected) => ({
            ...prevSelected,
            cabinet,
        }));
        setCurrentStep(8);
    };

    // If all components are selected, redirect to compatibility page
    if (currentStep === 8) {
        return <CompatibilityPage selectedComponents={selectedComponents} />;
    }

    // Render the corresponding component based on the current step
    switch (currentStep) {
        case 1:
            return <Processor onSelect={handleProcessorSelect} />;
        case 2:
            return <Motherboard onSelect={handleMotherboardSelect} />;
        case 3:
            return <GraphicsCard onSelect={handleGraphicsCardSelect} />;
        case 4:
            return <RAM onSelect={handleRAMSelect} />;
        case 5:
            return <Storage onSelect={handleStorageSelect} />;
        case 6:
            return <SMPS onSelect={handleSMPSSelect} />;
        case 7:
            return <Cabinet onSelect={handleCabinetSelect} />;
        default:
            return null;
    }
};

export default Build;
