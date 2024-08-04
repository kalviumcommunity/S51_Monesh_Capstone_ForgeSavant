import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/Profile.css'; // Import the CSS file

const Profile = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://s51-monesh-capstone-forgesavant.onrender.com/saves2');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://s51-monesh-capstone-forgesavant.onrender.com/delsaves/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const filterData = (data, criteria) => {
    return data.filter(criteria);
  };

  const email = localStorage.getItem('email');
  const filteredData = filterData(data, (datas) => datas.email === email);

  console.log('Email:', email); // Debugging log
  console.log('Data:', data); // Debugging log
  console.log('Filtered Data:', filteredData); // Debugging log

  return (
    <div className='profile-page'>
      {loading ? (
        <div>Loading...</div>
      ) : filteredData.length > 0 ? (
        <div className="grid-container">
          {filteredData.map((item, index) => (
            <div key={index} className="grid-item">
              <div className='item-image'>
                <img src={item.image} alt="" />
              </div>
              <div className='item-list'>
                <div>
                  <p>Processor:</p>
                  <p>Motherboard:</p>
                  <p>Graphic-Card:</p>
                  <p>Cinebench:</p>
                  <p>Cyberpunk:</p>
                </div>
                <div>
                  <p>{item.cpu}</p>
                  <p>{item.motherboard}</p>
                  <p>{item.gpu}</p>
                  <p>{item.cinebench} Score</p>
                  <p>{item.cyberpunk} FPS</p>
                </div>
                <div className='crud'>
                  <button onClick={() => handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='empty'><Link to="/build"><div className='no-data'>Start Forging your PC...</div></Link></div>
      )}
    </div>
  );
};

export default Profile;
