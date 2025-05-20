import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import { registerUser } from "../services/userService";
import styles from "./AuthPages.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  // const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    matriculationNo: "",
    telephoneNo: "",
    password: "",
    
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

   
    console.log("Form data:", formData);
    // const { name, email, matriculationNo, telephoneNo, password } = formData;
  //  try {
  //     await registerUser(formData);
  //     const { token, user } = await loginUser(email, password);
  // login(token, user); // from AuthContext
 
  //     navigate("/dashboard"); // or wherever you want to redirect
  //   } catch (err) {
  //     console.error("Registration error:", err.message);
  //     setError(err.message);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
 try {
      const res = await fetch('https://findr-spring-sea-9539.fly.dev/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert('Registration successful');
         navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      alert('An error occurred: ' + err.message);
    } finally {
      setLoading(false);
    }


  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.logo}>
          <h1>Findr</h1>
          <p>Campus Lost & Found System</p>
        </div>

        <h2 className={styles.authTitle}>Create your account</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.authForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="matriculationNo">Matriculation Number</label>
              <input
                type="text"
                id="matriculationNo"
                name="matriculationNo"
                value={formData.matriculationNo}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="telephoneNo">Telephone Number</label>
              <input
                type="tel"
                id="telephoneNo"
                name="telephoneNo"
                value={formData.telephoneNo}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
          </div>

          

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className={styles.authFooter}>
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
