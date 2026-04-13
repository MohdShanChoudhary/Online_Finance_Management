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
        alert('Client added successfully!');
        navigate('/users');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Submission failed');
      console.error(error);
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">{initialData ? 'Edit Client' : 'Client Entry'}</h2>
          <p className="card-subtitle">Capture the account details with precision and a consistent money theme.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label className="field-label">Client Name</label>
            <input className="input-field" type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="field">
            <label className="field-label">Phone Number</label>
            <input className="input-field" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="field">
            <label className="field-label">Email</label>
            <input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="field">
            <label className="field-label">Transaction Type</label>
            <select className="select-field" name="transactionType" value={formData.transactionType} onChange={handleChange}>
              <option value="Buy">Buy</option>
              <option value="Sell">Sell</option>
            </select>
          </div>
          <div className="field">
            <label className="field-label">Amount</label>
            <input className="input-field" type="number" name="amount" value={formData.amount} onChange={handleChange} required />
          </div>
          {formData.transactionType === 'Buy' ? (
            <div className="field">
              <label className="field-label">Payable Amount</label>
              <input className="input-field" type="number" name="payableAmount" value={formData.payableAmount} onChange={handleChange} />
            </div>
          ) : (
            <div className="field">
              <label className="field-label">Received Amount</label>
              <input className="input-field" type="number" name="receivedAmount" value={formData.receivedAmount} onChange={handleChange} />
            </div>
          )}
          <div className="field">
            <label className="field-label">Pending Amount</label>
            <input className="input-field" type="number" name="pendingAmount" value={formData.pendingAmount} readOnly />
          </div>
        </div>

        <div className="field" style={{ marginTop: '22px' }}>
          <label className="field-label">Remarks</label>
          <textarea className="textarea-field" name="remarks" value={formData.remarks} onChange={handleChange} />
        </div>

        <div className="actions-row" style={{ marginTop: '26px' }}>
          <button type="submit" className="button">{initialData ? 'Update Client' : 'Save Client'}</button>
          {onCancel && (
            <button type="button" className="button secondary" onClick={onCancel}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserForm;
