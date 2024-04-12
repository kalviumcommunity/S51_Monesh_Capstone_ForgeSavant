import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const Storage = () => {
    const [storage, setStorage] = useState([]);
    const [selectedStorage, setSelectedStorage] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchStorage = async () => {
            try {
                const response = await axios.get('http://localhost:5000/storage');
                setStorage(response.data);
            } catch (err) {
                console.error("Error fetching data", err);
            }
        };
        fetchStorage();
    }, []);

    const handleProductClick = (storage) => {
        setSelectedStorage(storage);
    };

    const closeDetails = () => {
        setSelectedStorage(null);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredStorage = storage.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 id="storage">Storage</h1>
            <div className="search">
                <input
                    type="text"
                    placeholder="Search by Storage Name"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button className="search-btn" type="submit">Search</button>
            </div>
            <div className="storage">
                {filteredStorage.map(storageItem => (
                    <div key={storageItem._id} className="storageComp" onClick={() => handleProductClick(storageItem)}>
                        <div id="image"><img src={storageItem.image_url} alt="" /></div>
                        <div id="storageDetails">
                            <h3>{storageItem.name}</h3>
                            <p>Manufacturer: {storageItem.manufacturer}</p>
                            <p>Capacity: {storageItem.specifications.capacity}</p>
                            <p>Price: ${storageItem.price}</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedStorage && (
                <div className="detailed-view">
                    <div className="detailed-image">
                        <img src={selectedStorage.image_url} alt={selectedStorage.name} />
                    </div>
                    <div className="detailed-details">
                        <h2>{selectedStorage.name}</h2>
                        <p>Type: {selectedStorage.type}</p>
                        <p>Manufacturer: {selectedStorage.manufacturer}</p>
                        <p>Price: ${selectedStorage.price}</p>
                        <p>Capacity: {selectedStorage.specifications.capacity}</p>
                        <button onClick={closeDetails}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Storage;
