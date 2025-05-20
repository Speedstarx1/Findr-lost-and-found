import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    matricNumber: '',
    userName: '',
    password: '',
    EmailAddress: '',
    department: '',
    faculty: '',
  });

  const faculties = ['Engineering', 'Science', 'Arts', 'Medicine', 'Law', 'Business', 'Education'];
  const departments = {
    Engineering: ['Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering', 'Computer Engineering'],
    Science: ['Physics', 'Chemistry', 'Biology', 'Mathematics',"Computer Sciences"],
    Arts: ['History', 'Literature', 'Philosophy', 'Languages'],
    Medicine: ['Medicine', 'Nursing', 'Pharmacy', 'Public Health'],
    Law: ['Criminal Law', 'Civil Law', 'International Law', 'Corporate Law'],
    Business: ['Accounting', 'Marketing', 'Management', 'Finance'],
    Education: ['Early Childhood', 'Primary Education', 'Secondary Education', 'Educational Leadership'],
  };

  const getDepartments = () => {
    if (!formData.faculty) return [];
    return departments[formData.faculty] || [];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('https://findr-spring-sea-9539.fly.dev/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful');
        navigate('/sign-in');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Create an account</h2>
      <p className={styles.subtitle}>Enter your details to join Findr</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div>
            <label>User Name</label>
            <input name="userName" value={formData.userName} onChange={handleChange} required />
          </div>
          
        </div>
        <div className={styles.row}>
          
          <div>
            <label>Matric Number</label>
            <input name="matricNumber" value={formData.matricNumber} onChange={handleChange} required />
          </div>
        </div>
        <div>
        <label>Email address</label>
        <input name="emailAddress" value={formData.EmailAddress} onChange={handleChange} required />
        </div>
       
        <div className={styles.row}>
          <div>
            <label>Faculty</label>
            <select name="faculty" value={formData.faculty} onChange={handleChange} required>
              <option value="">Select Faculty</option>
              {faculties.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required disabled={!formData.faculty}>
              <option value="">Select Department</option>
              {getDepartments().map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
