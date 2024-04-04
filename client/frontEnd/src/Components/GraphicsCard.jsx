import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const GraphicsCard = () => {
    const [ gpu, setgpu ] = useState([])

    useEffect(() => {
        const fetchgpu = async () => {
            try{
                const response = await axios.get('http://localhost:5000/GPU');
                setgpu(response.data)
            } catch (err) {
                console.error("Error fetching data", err);
            }
        }
        fetchgpu()
    },[])

    return(
        <>
            <div className="gpu">
                {gpu.map(gpu =>(
                    <div key={gpu._id} className="gpucomp">
                        <div id="image"><img src={gpu.image_url} alt={gpu.name} /></div>
                        <div id="gpuDetails">
                            <h3>{gpu.name}</h3>
                            <p>Type: {gpu.type}</p>
                            <p>Manufacturer: {gpu.manufacturer}</p>
                            <p>Price: ${gpu.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default GraphicsCard;