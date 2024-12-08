import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/api';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchAllUsers();
        setUsers(users);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    getUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>User List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} style={styles.tr}>
              <td style={styles.td}>{user.name}</td>
              <td style={styles.td}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    margin: '20px auto',
    maxWidth: '600px',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
  th: {
    backgroundColor: '#f4f4f4',
    color: '#333',
    padding: '10px',
    border: '1px solid #ddd',
  },
  tr: {
    transition: 'background-color 0.3s',
  },
  td: {
    padding: '10px',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  trHover: {
    backgroundColor: '#f9f9f9',
    cursor: 'pointer',
  },
};

export default UserList;
