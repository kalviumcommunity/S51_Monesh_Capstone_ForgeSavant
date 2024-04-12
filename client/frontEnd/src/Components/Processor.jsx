import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const Processor = ({ onSelect }) => {
    const [cpu, setCpu] = useState([]);
    const [selectedCpu, setSelectedCpu] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleProductClick = (selectedCpu) => {
        setSelectedCpu(selectedCpu);
    };

    const handleSelect = () => {
        onSelect(selectedCpu);
    };

    const closeDetails = () => {
        setSelectedCpu(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCpu = cpu.filter((cpu) =>
        cpu.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="processor">Processors</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Processor Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="cpu">
                {filteredCpu.map(cpu => (
                    <div key={cpu._id} className="cpucomp" onClick={() => handleProductClick(cpu)}>
                        <div id="image"><img src={cpu.image_url} alt="" /></div>
                        <div id="cpuDetails">
                            <h3>{cpu.name}</h3>
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
                        <p>Cores: {selectedCpu.specifications.cores}</p>
                        <p>Threads: {selectedCpu.specifications.threads}</p>
                        <button onClick={handleSelect}>Select</button>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Processor;
