import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const GraphicsCard = () => {
    const [gpu, setGpu] = useState([]);
    const [selectedGpu, setSelectedGpu] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const closeDetails = () => {
        setSelectedGpu(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredGpu = gpu.filter((gpu) =>
        gpu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="graphic">Graphic Cards</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Graphic Card Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="gpu">
                {filteredGpu.map(gpu => (
                    <div key={gpu._id} className="gpucomp" onClick={() => handleGpuClick(gpu)}>
                        <div className="gpu-image"><img src={gpu.image_url} alt="" /></div>
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
