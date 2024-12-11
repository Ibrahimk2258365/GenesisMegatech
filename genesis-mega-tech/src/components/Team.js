import React, { useEffect, useState } from "react";
import { getTeam } from "../services/api";
import './Team.css';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeam();
        setTeamMembers(data);
      } catch (err) {
        setError("Failed to fetch team members. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return <div className="loading">Loading team members...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="team-page">
      <section className="team-header">
        <h2>Our Team</h2>
        <p>Meet the passionate individuals who power our vision and success.</p>
      </section>

      <section className="team-grid">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <div key={member._id} className="team-card">
              <div className="image-container">
                <img
                  src={`http://localhost:5001${member.profilePictureUrl || "/uploads/default.jpg"}`}
                  alt={member.name}
                  className="team-image"
                />
              </div>
              <h3 className="team-name">{member.name}</h3>
              <p className="team-position">{member.designation}</p>
              <button
                className="view-profile"
                onClick={() => alert(`Viewing profile of ${member.name}`)}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p className="no-members">No team members found.</p>
        )}
      </section>
    </div>
  );
};

export default Team;
