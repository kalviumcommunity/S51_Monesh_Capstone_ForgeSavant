import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const RAM = () => {
    const [ramList, setRAMList] = useState([]);
    const [selectedRAM, setSelectedRAM] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchRAMList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/ram');
                setRAMList(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchRAMList();
    }, []);

    const handleProductClick = (ram) => {
        setSelectedRAM(ram);
    };

    const closeDetails = () => {
        setSelectedRAM(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRAMList = ramList.filter((ram) =>
        ram.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="ram">RAM (Memory)</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by RAM Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="ram-list">
                {filteredRAMList.map(ram => (
                    <div key={ram._id} className="ram-comp" onClick={() => handleProductClick(ram)}>
                        <div className="ram-image"><img src={ram.image_url} alt="" /></div>
                        <div className="ram-details">
                            <h3>{ram.name}</h3>
                            <p>Manufacturer: {ram.manufacturer}</p>
                            <p>Capacity: {ram.specifications.capacity}</p>
                            <p>Price: ${ram.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedRAM && (
                <div className="detailed-view">
                    <div className="detailed-image">
                        <img src={selectedRAM.image_url} alt={selectedRAM.name} />
                    </div>
                    <div className="detailed-details">
                        <h2>{selectedRAM.name}</h2>
                        <p>Manufacturer: {selectedRAM.manufacturer}</p>
                        <p>Capacity: {selectedRAM.specifications.capacity}</p>
                        <p>Speed: {selectedRAM.specifications.speed}</p>
                        <p>Price: ${selectedRAM.price}</p>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default RAM;
