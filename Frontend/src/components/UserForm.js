import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      phone: '',
      email: '',
      transactionType: 'Buy',
      amount: '',
      payableAmount: '',
      receivedAmount: '',
      pendingAmount: 0,
      remarks: ''
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedData = {
      ...formData,
      [name]: value
    };

    if (
      name === 'amount' ||
      name === 'payableAmount' ||
      name === 'receivedAmount' ||
      name === 'transactionType'
    ) {
      const amount = parseFloat(updatedData.amount) || 0;
      const payable = parseFloat(updatedData.payableAmount) || 0;
      const received = parseFloat(updatedData.receivedAmount) || 0;

      if (updatedData.transactionType === 'Buy') {
        updatedData.pendingAmount = payable - amount;
      } else {
        updatedData.pendingAmount = amount - received;
      }
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        await axios.post('http://localhost:5000/api/users', formData);
        alert("✅ Client added successfully!");
        navigate('/users');
      }
    } catch (error) {
      alert(error.response?.data?.message || "❌ Submission failed");
      console.error(error);
    }
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: '30px auto',
      padding: '30px',
      borderRadius: '12px',
      backgroundColor: '#f4f4f4',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '20px',
      color: '#333'
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px'
    },
    textarea: {
      width: '100%',
      padding: '10px',
      height: '80px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      fontSize: '16px',
      marginBottom: '15px'
    },
    radioGroup: {
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'center',
      gap: '20px'
    },
    submitBtn: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '16px',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{initialData ? 'Edit Client' : 'Client Detail Entry'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <div style={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="transactionType"
              value="Buy"
              checked={formData.transactionType === 'Buy'}
              onChange={handleChange}
            /> Buy
          </label>
          <label>
            <input
              type="radio"
              name="transactionType"
              value="Sell"
              checked={formData.transactionType === 'Sell'}
              onChange={handleChange}
            /> Sell
          </label>
        </div>

        <input
          type="number"
          name="amount"
          placeholder="Amount (₹)"
          value={formData.amount}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {formData.transactionType === 'Buy' ? (
          <input
            type="number"
            name="payableAmount"
            placeholder="Payable Amount"
            value={formData.payableAmount}
            onChange={handleChange}
            style={styles.input}
          />
        ) : (
          <input
            type="number"
            name="receivedAmount"
            placeholder="Received Amount"
            value={formData.receivedAmount}
            onChange={handleChange}
            style={styles.input}
          />
        )}

        <input
          type="number"
          name="pendingAmount"
          placeholder="Pending Amount"
          value={formData.pendingAmount}
          readOnly
          style={{ ...styles.input, backgroundColor: '#e9ecef' }}
        />

        <textarea
          name="remarks"
          placeholder="Remarks"
          value={formData.remarks}
          onChange={handleChange}
          style={styles.textarea}
        />

        <button type="submit" style={styles.submitBtn}>
          {initialData ? 'Update' : 'Submit'}
        </button>

        {onCancel && (
          <button type="button" onClick={onCancel} style={{ ...styles.submitBtn, backgroundColor: '#dc3545', marginTop: '10px' }}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
