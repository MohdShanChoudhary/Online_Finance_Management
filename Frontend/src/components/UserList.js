// UserList.js
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users');
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edit/${userId}`);
  };

  const filteredUsers = filter === 'All' ? users : users.filter((user) => user.transactionType === filter);

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Client List');

    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Phone', key: 'phone', width: 15 },
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Type', key: 'transactionType', width: 10 },
      { header: 'Amount', key: 'amount', width: 12 },
      { header: 'Payable', key: 'payableAmount', width: 12 },
      { header: 'Received', key: 'receivedAmount', width: 12 },
      { header: 'Pending', key: 'pendingAmount', width: 12 },
      { header: 'Remarks', key: 'remarks', width: 25 },
      { header: 'Date', key: 'date', width: 15 }
    ];

    filteredUsers.forEach((user) => {
      worksheet.addRow({
        name: user.name,
        phone: user.phone,
        email: user.email,
        transactionType: user.transactionType,
        amount: user.amount,
        payableAmount: user.payableAmount || '-',
        receivedAmount: user.receivedAmount || '-',
        pendingAmount: user.pendingAmount,
        remarks: user.remarks,
        date: new Date(user.date).toLocaleDateString()
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    saveAs(blob, 'clients.xlsx');
  };

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <h2 className="card-title">Client Ledger</h2>
          <p className="card-subtitle">A consistent money-themed dashboard for your client records with responsive layout.</p>
        </div>
      </div>

      <div className="actions-row">
        <div className="filter-row">
          <label className="field-label" htmlFor="filter">Filter</label>
          <select id="filter" className="select-field" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>
        <button type="button" className="button secondary" onClick={exportToExcel}>Export to Excel</button>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Payable</th>
              <th>Received</th>
              <th>Pending</th>
              <th>Remarks</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="11" className="no-data">No clients available. Add a client to begin.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.transactionType}</td>
                  <td>{user.amount}</td>
                  <td>{user.payableAmount || '-'}</td>
                  <td>{user.receivedAmount || '-'}</td>
                  <td>{user.pendingAmount}</td>
                  <td>{user.remarks}</td>
                  <td>{new Date(user.date).toLocaleDateString()}</td>
                  <td>
                    <button type="button" className="button secondary" onClick={() => handleEdit(user._id)}>Edit</button>
                    <button type="button" className="button danger" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
