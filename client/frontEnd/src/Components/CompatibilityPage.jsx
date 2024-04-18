import React, { useState, useEffect } from "react";
import "../Styles/compatibilityPage.css";

const CompatibilityPage = ({ selectedComponents }) => {
    const [compatibilityResult, setCompatibilityResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkCompatibility = () => {
            try {
                setLoading(true);
                const compatible = [];
                const incompatible = [];

                // Processor and Motherboard Compatibility Check
                if (selectedComponents.processor && selectedComponents.motherboard) {
                    const processorSocket = selectedComponents.processor.specifications.socket;
                    const motherboardSocket = selectedComponents.motherboard.specifications.socket;

                    if (processorSocket === motherboardSocket) {
                        compatible.push(selectedComponents.processor);
                    } else {
                        incompatible.push(selectedComponents.processor);
                    }
                }

                // Graphics Card and Motherboard Compatibility Check
                if (selectedComponents.graphicsCard && selectedComponents.motherboard) {
                    const pcie = selectedComponents.motherboard.specifications.pcie_slots;

                    if(pcie){
                        compatible.push(selectedComponents.graphicsCard);
                    }else{
                        incompatible.push(selectedComponents.graphicsCard);
                    }
                }

                // SSD and Motherboard Compatibility Check
                if (selectedComponents.storage && selectedComponents.motherboard) {
                    const ssdInterface = selectedComponents.storage.specifications.interface;
                    const motherboardM2 = selectedComponents.motherboard.specifications.m2_slots;
                    const motherboardSATA = selectedComponents.motherboard.specifications.sata_ports;

                    if(motherboardM2 && ssdInterface === "NVMe"){
                        compatible.push(selectedComponents.storage);
                    }else if (motherboardSATA && ssdInterface === "SATA"){
                        compatible.push(selectedComponents.storage);
                    }else{
                        incompatible.push(selectedComponents.storage);
                    }
                }

                // RAM and Motherboard Compatibility Check
                if (selectedComponents.ram && selectedComponents.motherboard) {
                    const ramType = selectedComponents.ram.specifications.type;
                    const motherboardRamType = selectedComponents.motherboard.specifications.ram_type;

                    if (ramType === motherboardRamType) {
                        compatible.push(selectedComponents.ram);
                    } else {
                        incompatible.push(selectedComponents.ram);
                    }
                }

                // SMPS and Cabinet Compatibility Check
                if (selectedComponents.smps && selectedComponents.cabinet) {
                    const smpsFormFactor = selectedComponents.smps.specifications.form_factor;
                    const cabinetSmpsFormFactor = selectedComponents.cabinet.specifications.motherboard_support;
                    const cabinetFormFactor = cabinetSmpsFormFactor.split(", ");

                    if (cabinetFormFactor.includes(smpsFormFactor)) {
                        compatible.push(selectedComponents.smps);
                    } else {
                        incompatible.push(selectedComponents.smps);
                    }
                }

                // Motherboard and Cabinet Compatibility Check
                if (selectedComponents.motherboard && selectedComponents.cabinet) {
                    const motherboardFormFactors = selectedComponents.motherboard.specifications.form_factor;
                    const cabinetMotherboardFormFactor = selectedComponents.cabinet.specifications.motherboard_support;
                    const cabinetFormFactor = cabinetMotherboardFormFactor.split(", ");

                    if (cabinetFormFactor.includes(motherboardFormFactors)) {
                        compatible.push(selectedComponents.motherboard);
                        compatible.push(selectedComponents.cabinet);
                    } else {
                        incompatible.push(selectedComponents.motherboard);
                        incompatible.push(selectedComponents.cabinet);
                    }
                }

                // Simulate loading delay
                setTimeout(() => {
                    setCompatibilityResult({ compatible, incompatible });
                    setLoading(false);
                }, 1000);
            } catch (error) {
                setError("Error checking compatibility. Please try again later.");
                setLoading(false);
            }
        };

        checkCompatibility();
    }, [selectedComponents]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="compatibility-page">
            <h1 className="compatibility-header">Compatibility Results</h1>
            <div className="compatibility-container">
                {compatibilityResult ? (
                    <div className="compatibility-results">
                        <div className="compatible-components">
                            <h2 className="compatibility-subheader">Compatible Components:</h2>
                            <ul className="component-list">
                                {compatibilityResult.compatible.map((component, index) => (
                                    <li key={index} className="component">{component.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="incompatible-components">
                            <h2 className="compatibility-subheader">Incompatible Components:</h2>
                            <ul className="component-list">
                                {compatibilityResult.incompatible.map((component, index) => (
                                    <li key={index} className="component">{component.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="no-results">No compatibility results available.</div>
                )}
            </div>
        </div>
    );
};

export default CompatibilityPage;
