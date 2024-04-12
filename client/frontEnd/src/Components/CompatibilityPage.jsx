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

                // Check if both processor and motherboard are selected
                if (selectedComponents.processor && selectedComponents.motherboard) {
                    const processorSocket = selectedComponents.processor.specifications.socket;
                    const motherboardSocket = selectedComponents.motherboard.specifications.socket;

                    // Example compatibility check: Processor and motherboard sockets match
                    if (processorSocket === motherboardSocket) {
                        compatible.push(selectedComponents.processor);
                        compatible.push(selectedComponents.motherboard);
                    } else {
                        incompatible.push(selectedComponents.processor);
                        incompatible.push(selectedComponents.motherboard);
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
    