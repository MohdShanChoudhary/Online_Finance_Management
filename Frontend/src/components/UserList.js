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
    if (window.confirm('Are you sure you want to delete this user?')) {
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

  const filteredUsers = filter === 'All' ? users : users.filter(user => user.transactionType === filter);

  // Excel export function
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
    <div style={{ maxWidth: '95%', margin: '20px auto', padding: '20px', background: '#f2f2f2', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Client List</h2>

      <label>Filter: </label>
      <select onChange={(e) => setFilter(e.target.value)} value={filter}>
        <option value="All">All</option>
        <option value="Buy">Buy</option>
        <option value="Sell">Sell</option>
      </select>

      <button
        onClick={exportToExcel}
        style={{ marginLeft: '15px', padding: '5px 15px', cursor: 'pointer' }}
      >
        Export to Excel
      </button>

      <table border="1" cellPadding="8" style={{ marginTop: '15px', width: '100%', background: '#fff' }}>
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
          {filteredUsers.map((user) => (
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
                <button onClick={() => handleEdit(user._id)}>Edit</button>
                <button onClick={() => handleDelete(user._id)} style={{ marginLeft: '5px' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
