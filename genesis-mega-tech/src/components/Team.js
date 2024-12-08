import React, { useEffect, useState } from 'react';
import { getTeam } from '../services/api'; // Import the API function

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeam(); // Fetch team data from API
        setTeamMembers(data);
      } catch (err) {
        setError('Failed to fetch team members. Please try again later.');
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <div className="loading">Loading team members...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="centered-content">
      <h2>Our Team</h2>
      <p>Meet the dedicated team members who drive our success.</p>

      <div className="team-members" style={styles.teamMembers}>
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div key={member._id} className="team-member" style={styles.teamMember}>
             <img
               src={`http://localhost:5001${member.profilePictureUrl || '/uploads/default.jpg'}`}

                 alt={member.name}
  style={styles.teamMemberImage}
/>

              <h3 style={styles.teamMemberName}>{member.name}</h3>
              <p style={styles.teamMemberPosition}>{member.designation}</p>
            </div>
          ))
        ) : (
          <p style={styles.noMembers}>No team members found.</p>
        )}
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  teamMembers: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
    marginTop: '2rem',
  },
  teamMember: {
    textAlign: 'center',
    maxWidth: '200px',
  },
  teamMemberImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '50%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
  },
  teamMemberName: {
    fontSize: '1.25rem',
    margin: '0.5rem 0',
  },
  teamMemberPosition: {
    fontSize: '1rem',
    color: '#777',
  },
  noMembers: {
    fontSize: '1rem',
    color: '#555',
  },
};

export default Team;
