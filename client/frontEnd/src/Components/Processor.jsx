import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const Processor = () => {
    const [cpu, setCpu] = useState([]);
    const [selectedCpu, setSelectedCpu] = useState(null);

    useEffect(() => {
        const fetchCpu = async () => {
            try {
                const response = await axios.get('http://localhost:5000/CPU');
                setCpu(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchCpu();
    }, []);

    // Function to handle click on a product
    const handleProductClick = (cpu) => {
        setSelectedCpu(cpu);
    };

    // Function to close the detailed view
    const closeDetails = () => {
        setSelectedCpu(null);
    };

    return (
        <>
            <div className="cpu">
                {cpu.map(cpu => (
                    <div key={cpu._id} className="cpucomp" onClick={() => handleProductClick(cpu)}>
                        <div id="image"><img src={cpu.image_url} alt={cpu.name} /></div>
                        <div id="cpuDetails">
                            <h3>{cpu.name}</h3>
                            <p>Type: {cpu.type}</p>
                            <p>Manufacturer: {cpu.manufacturer}</p>
                            <p>Price: ${cpu.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCpu && (
                <div className="detailed-view">
                    <div className="detailed-image">
                        <img src={selectedCpu.image_url} alt={selectedCpu.name} />
                    </div>
                    <div className="detailed-details">
                        <h2>{selectedCpu.name}</h2>
                        <p>Type: {selectedCpu.type}</p>
                        <p>Manufacturer: {selectedCpu.manufacturer}</p>
                        <p>Price: ${selectedCpu.price}</p>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Processor;
