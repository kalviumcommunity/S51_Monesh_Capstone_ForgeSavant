import { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/products.css';

const Processor = () => {
    const [ cpu, setCpu ] = useState([])

    useEffect(() => {
        const fetchCpu = async () => {
            try{
                const response = await axios.get('http://localhost:5000/CPU');
                setCpu(response.data)
            } catch (err) {
                console.error("Error fetching data", err);
            }
        }
        fetchCpu()
    },[])

    return(
        <>
            <div className="cpu">
                {cpu.map(cpu =>(
                    <div key={cpu._id} className="cpucomp">
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
        </>
    )
}

export default Processor;