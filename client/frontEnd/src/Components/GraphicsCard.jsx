import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const GraphicsCard = () => {
    const [gpu, setGpu] = useState([]);
    const [selectedGpu, setSelectedGpu] = useState(null);

    useEffect(() => {
        const fetchGpu = async () => {
            try {
                const response = await axios.get('http://localhost:5000/GPU');
                setGpu(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchGpu();
    }, []);

    const handleGpuClick = (selectedGpu) => {
        setSelectedGpu(selectedGpu);
    };

    // Function to close the detailed view
    const closeDetails = () => {
        setSelectedGpu(null);
    };

    return (
        <>
            <div className="gpu">
                {gpu.map(gpu => (
                    <div key={gpu._id} className="gpucomp" onClick={() => handleGpuClick(gpu)}>
                        <div className="gpu-image"><img src={gpu.image_url} alt={gpu.name} /></div>
                        <div className="gpu-details">
                            <h3>{gpu.name}</h3>
                            <p>Type: {gpu.type}</p>
                            <p>Manufacturer: {gpu.manufacturer}</p>
                            <p>Price: ${gpu.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedGpu && (
                <div className="detailed-view">
                    <div className="detailed-content">
                        <div className="detailed-image">
                            <img src={selectedGpu.image_url} alt={selectedGpu.name} />
                        </div>
                        <div className="detailed-details">
                            <h2>{selectedGpu.name}</h2>
                            <p>Type: {selectedGpu.type}</p>
                            <p>Manufacturer: {selectedGpu.manufacturer}</p>
                            <p>Price: ${selectedGpu.price}</p>
                            <button onClick={closeDetails}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GraphicsCard;
