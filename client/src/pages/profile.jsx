import React from 'react';
import './profile.css'; 
const Profile = () => {
    const user = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        location: "New York, USA",
        profilePicture: "https://via.placeholder.com/150",
        bio: "Full Stack Developer specializing in React and Node.js.",
        experience: "5 years",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
        projects: [
            { name: "E-commerce Website", link: "#" },
            { name: "Social Media App", link: "#" },
            { name: "Portfolio Website", link: "#" },
        ]
    };

    return (
        <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
                <img src={user.profilePicture} alt="Profile" className="profile-picture" />
                <div className="profile-info">
                    <h1>{user.name}</h1>
                    <p>{user.bio}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Location:</strong> {user.location}</p>
                    <p><strong>Experience:</strong> {user.experience}</p>
                </div>
            </div>

            {/* Skills Section */}
            <div className="skills-section">
                <h2>Skills</h2>
                <ul>
                    {user.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                    ))}
                </ul>
            </div>

            {/* Projects Section */}
            <div className="projects-section">
                <h2>Projects</h2>
                <ul>
                    {user.projects.map((project, index) => (
                        <li key={index}>
                            <a href={project.link}>{project.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
