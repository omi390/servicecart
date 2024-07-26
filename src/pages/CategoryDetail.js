// File: src/components/CategoryList.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryDetail = () => {
    const {id} = useParams();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id);
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`https://myservicecart.com/crm/api/v1/customer/tendor/${id}`);
       
        setCategories(response.data.content);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

  return (
    <div>
      <h1>Categories</h1>
      <ul>
    {categories.name}
      </ul>
    </div>
  );
};

export default CategoryDetail;
