import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const Cabinet = ({ onSelect }) => {
    const [cabinets, setCabinets] = useState([]);
    const [selectedCabinet, setSelectedCabinet] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCabinets = async () => {
            try {
                const response = await axios.get('http://localhost:5000/cabinet');
                setCabinets(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchCabinets();
    }, []);

    const handleProductClick = (cabinet) => {
        setSelectedCabinet(cabinet);
    };

    const handleSelect = () => {
        onSelect(selectedCabinet);
    };

    const closeDetails = () => {
        setSelectedCabinet(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCabinets = cabinets.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="cabinet">Cabinets</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Cabinet Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="cabinet-list">
                {filteredCabinets.map(cabinet => (
                    <div key={cabinet._id} className="cabinet-comp" onClick={() => handleProductClick(cabinet)}>
                        <div className="cabinet-image"><img src={cabinet.image_url} alt="" /></div>
                        <div className="cabinet-details">
                            <h3>{cabinet.name}</h3>
                            <p>Manufacturer: {cabinet.manufacturer}</p>
                            <p>Type: {cabinet.type}</p>
                            <p>Price: ${cabinet.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedCabinet && (
                <div className="detailed-view">
                    <div className="detailed-image">
                        <img src={selectedCabinet.image_url} alt={selectedCabinet.name} />
                    </div>
                    <div className="detailed-details">
                        <h2>{selectedCabinet.name}</h2>
                        <p>Manufacturer: {selectedCabinet.manufacturer}</p>
                        <p>Type: {selectedCabinet.type}</p>
                        <p>Price: ${selectedCabinet.price}</p>
                        <button onClick={handleSelect}>Select</button>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Cabinet;
