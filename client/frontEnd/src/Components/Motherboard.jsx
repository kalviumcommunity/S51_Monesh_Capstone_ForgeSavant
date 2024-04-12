import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const Motherboard = () => {
    const [motherboards, setMotherboards] = useState([]);
    const [selectedMotherboard, setSelectedMotherboard] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchMotherboards = async () => {
            try {
                const response = await axios.get('http://localhost:5000/motherboard');
                setMotherboards(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchMotherboards();
    }, []);

    const handleProductClick = (motherboard) => {
        setSelectedMotherboard(motherboard);
    };

    const closeDetails = () => {
        setSelectedMotherboard(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMotherboards = motherboards.filter((mb) =>
        mb.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="motherboards">Motherboards</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Motherboard Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="motherboards">
                {filteredMotherboards.map(mb => (
                    <div key={mb._id} className="mbcomp" onClick={() => handleProductClick(mb)}>
                        <div id="image"><img src={mb.image_url} alt="" /></div>
                        <div id="mbDetails">
                            <h3>{mb.name}</h3>
                            <p>Manufacturer: {mb.manufacturer}</p>
                            <p>Price: ${mb.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedMotherboard && (
                <div className="detailed-view">
                    <div className="detailed-image">
                        <img src={selectedMotherboard.image_url} alt={selectedMotherboard.name} />
                    </div>
                    <div className="detailed-details">
                        <h2>{selectedMotherboard.name}</h2>
                        <p>Type: {selectedMotherboard.type}</p>
                        <p>Manufacturer: {selectedMotherboard.manufacturer}</p>
                        <p>Price: ${selectedMotherboard.price}</p>
                        <p>Socket: {selectedMotherboard.specifications.socket}</p>
                        <p>Form Factor: {selectedMotherboard.specifications.form_factor}</p>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Motherboard;
