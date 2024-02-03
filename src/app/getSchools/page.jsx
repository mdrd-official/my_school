"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/');
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
        setError('Error fetching schools. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Schools List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {schools.map((school) => (
          <div key={school.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '200px' }}>
            <img src={school.image} alt={school.name} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <p style={{ fontSize: '16px', fontWeight: 'bold', margin: '5px 0' }}>{school.name}</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>Address: {school.address}</p>
            <p style={{ fontSize: '14px', margin: '5px 0' }}>City: {school.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSchools;
