import { useState, useEffect } from "react";

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    backgroundColor: "white",
  },
  radioGroup: {
    marginBottom: "10px",
  },
  radioLabel: {
    marginRight: "20px",
    cursor: "pointer",
  },
  checkbox: {
    marginRight: "5px",
    cursor: "pointer",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    fontSize: "16px",
  },
  savedUsers: {
    marginTop: "30px",
  },
  userCard: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "15px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  userInfo: {
    margin: "5px 0",
  },
};

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    city: "",
    isMarried: false,
  });

  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setSavedUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUsers = [...savedUsers, formData];
    localStorage.setItem("users", JSON.stringify(newUsers));
    setSavedUsers(newUsers);

    setFormData({
      name: "",
      email: "",
      gender: "",
      city: "",
      isMarried: false,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>User Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Gender:</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="male"
                checked={formData.gender === "male"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              />
              Male
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="female"
                checked={formData.gender === "female"}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
              Female
            </label>
          </div>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>City:</label>
          <select
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            style={styles.select}
          >
            <option value="">Select a city</option>
            <option value="new-york">New York</option>
            <option value="london">London</option>
            <option value="tokyo">Tokyo</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.radioLabel}>
            <input
              type="checkbox"
              checked={formData.isMarried}
              onChange={(e) =>
                setFormData({ ...formData, isMarried: e.target.checked })
              }
              style={styles.checkbox}
            />
            Married
          </label>
        </div>

        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <div style={styles.savedUsers}>
        <h2 style={styles.title}>Saved Users:</h2>
        <div>
          {savedUsers.map((user, index) => (
            <div key={index} style={styles.userCard}>
              <p style={styles.userInfo}>
                <strong>Name:</strong> {user.name}
              </p>
              <p style={styles.userInfo}>
                <strong>Email:</strong> {user.email}
              </p>
              <p style={styles.userInfo}>
                <strong>Gender:</strong> {user.gender}
              </p>
              <p style={styles.userInfo}>
                <strong>City:</strong> {user.city}
              </p>
              <p style={styles.userInfo}>
                <strong>Married:</strong> {user.isMarried ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
