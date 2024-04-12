import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const SMPS = ({ onSelect }) => {
    const [smpsList, setSMPSList] = useState([]);
    const [selectedSMPS, setSelectedSMPS] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchSMPSList = async () => {
            try {
                const response = await axios.get('http://localhost:5000/smps');
                setSMPSList(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchSMPSList();
    }, []);

    const handleProductClick = (smps) => {
        setSelectedSMPS(smps);
    };

    const handleSelect = () => {
        onSelect(selectedSMPS);
    };

    const closeDetails = () => {
        setSelectedSMPS(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredSMPSList = smpsList.filter((smps) =>
        smps.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="smps">SMPS (Power Supply)</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by SMPS Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="smps-list">
                {filteredSMPSList.map(smps => (
                    <div key={smps._id} className="smps-comp" onClick={() => handleProductClick(smps)}>
                        <div className="smps-image"><img src={smps.image_url} alt="" /></div>
                        <div className="smps-details">
                            <h3>{smps.name}</h3>
                            <p>Manufacturer: {smps.manufacturer}</p>
                            <p>Wattage: {smps.specifications.wattage}</p>
                            <p>Price: ${smps.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedSMPS && (
                <div className="detailed-view">
                    <div className="detailed-image">
                        <img src={selectedSMPS.image_url} alt={selectedSMPS.name} />
                    </div>
                    <div className="detailed-details">
                        <h2>{selectedSMPS.name}</h2>
                        <p>Manufacturer: {selectedSMPS.manufacturer}</p>
                        <p>Wattage: {selectedSMPS.specifications.wattage}</p>
                        <p>Price: ${selectedSMPS.price}</p>
                        <button onClick={handleSelect}>Select</button>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SMPS;
