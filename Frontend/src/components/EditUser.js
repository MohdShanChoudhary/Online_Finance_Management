// components/EditUser.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm from './UserForm';

const EditUser = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users`);
        const user = res.data.find((u) => u._id === id);
        setUserData(user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedData);
      alert("✅ Client updated successfully!");
      navigate('/users');
    } catch (err) {
      alert("❌ Update failed");
      console.error(err);
    }
  };

  return userData ? (
    <UserForm
      initialData={userData}
      onSubmit={handleUpdate}
      onCancel={() => navigate('/users')}
    />
  ) : (
    <p style={{ textAlign: 'center', padding: '40px' }}>Loading...</p>
  );
};

export default EditUser;
