import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignInForm.module.css';

const SignInForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userOrMatric: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('https://findr-spring-sea-9539.fly.dev/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.userOrMatric,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed. Please try again.');
      }

      const userData = await response.json();
      console.log(userData);
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', userData.token); // You might need to check how the token is returned

      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>



      
      <div className={styles.header}>
        <h2 className={styles.title}>Sign In</h2>
        <p className={styles.subtitle}>Enter your credentials to access your account</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="userOrMatric" className={styles.label}>
            Username or Matric Number
          </label>
          <input
            id="userOrMatric"
            name="userOrMatric"
            type="text"
            value={formData.userOrMatric}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Enter your username or matric number"
          />
        </div>

        <div className={styles.fieldGroup}>
          <div className={styles.labelRow}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <button type="button" className={styles.forgotBtn}>
              Forgot password?
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.input}
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default SignInForm;
