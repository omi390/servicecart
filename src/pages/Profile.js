// src/App.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const initialProfile = {
  picture: 'https://via.placeholder.com/150',
  name: 'John Doe',
  address: '123 Main St',
  mobile: '123-456-7890',
  email: 'john.doe@example.com',
};

function Profile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...initialProfile });

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, picture: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app">
      <div className="profile-header">
        <img src={profile.picture} alt="Profile" className="profile-picture" />
        <h1 className="profile-name">{profile.name}</h1>
      </div>
      {isEditing ? (
        <form className="profile-form" onSubmit={handleSave}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <label>
            Mobile:
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <label>
            Profile Picture:
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      )}
    </div>
  );
}

const styles = `
.app {
  text-align: center;
  padding: 20px;
}

.profile-header {
  text-align: center;
  margin-bottom: 20px;
}

.profile-picture {
  border-radius: 50%;
  width: 150px;
  height: 150px;
}

.profile-name {
  font-size: 2em;
  margin-top: 10px;
}

.profile-form {
  max-width: 500px;
  margin: 0 auto;
}

.profile-form label {
  display: block;
  margin-bottom: 15px;
}

.profile-form input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.profile-form button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
`;

function insertStyles() {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styles));
  document.head.appendChild(style);
}

insertStyles();

export default Profile;
