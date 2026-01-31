import React, { useState } from "react";

const GroupRegistration = () => {
  // REPLACE THIS WITH YOUR ACTUAL APPS SCRIPT URL
  const APPS_SCRIPT_URL =import.meta.env?.VITE_APPS_SCRIPT_URL;


  const [formData, setFormData] = useState({
    leaderName: "",
    leaderRegNo: "",
    member1Name: "",
    member1RegNo: "",
    member2Name: "",
    member2RegNo: "",
    member3Name: "",
    member3RegNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.leaderName.trim() || !formData.leaderRegNo.trim()) {
      setMessage({
        text: "Leader Name and Register Number are required",
        type: "error",
      });
      return false;
    }

    const memberPairs = [
      {
        label: "Member 1",
        name: formData.member1Name,
        regNo: formData.member1RegNo,
      },
      {
        label: "Member 2",
        name: formData.member2Name,
        regNo: formData.member2RegNo,
      },
      {
        label: "Member 3",
        name: formData.member3Name,
        regNo: formData.member3RegNo,
      },
    ];

    const incompleteMembers = memberPairs
      .filter(({ name, regNo }) => {
        const hasName = Boolean(name?.trim());
        const hasReg = Boolean(regNo?.trim());
        return (hasName && !hasReg) || (!hasName && hasReg);
      })
      .map(({ label }) => label);

    if (incompleteMembers.length > 0) {
      setMessage({
        text: `${incompleteMembers.join(
          ", ",
        )}: Please fill both Name and Register Number (or leave both empty).`,
        type: "error",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Note: no-cors means we can't read the response
      // But if no error is thrown, submission was successful
      setMessage({
        text: "Group registered successfully! Your group has been created.",
        type: "success",
      });

      // Reset form
      setFormData({
        leaderName: "",
        leaderRegNo: "",
        member1Name: "",
        member1RegNo: "",
        member2Name: "",
        member2RegNo: "",
        member3Name: "",
        member3RegNo: "",
      });
    } catch (_error) {
      console.error(_error);
      setMessage({
        text: "Submission failed. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Project Group Registration</h1>
        <p style={styles.subtitle}>
          Register your team of 4 students (1 Leader + 3 Members)
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Role Selection */}


          {/* Leader Fields */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Leader Information</h3>
            <div style={styles.formGroup}>
              <label style={styles.label}>Leader Name *</label>
              <input
                type="text"
                name="leaderName"
                value={formData.leaderName}
                onChange={handleInputChange}
                required
                style={styles.input}
                placeholder="Enter leader's full name"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Leader Register Number *</label>
              <input
                type="text"
                name="leaderRegNo"
                value={formData.leaderRegNo}
                onChange={handleInputChange}
                required
                style={styles.input}
                placeholder="e.g., 2021001"
              />
            </div>
          </div>

          {/* Member Fields */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              Team Members (make sure to have 4 members, unless leave fields empty)
            </h3>

            {/* Member 1 */}
            <div style={styles.memberGroup}>
              <h4 style={styles.memberTitle}>Member 1</h4>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="member1Name"
                  value={formData.member1Name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter member's full name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Register Number</label>
                <input
                  type="text"
                  name="member1RegNo"
                  value={formData.member1RegNo}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 2021002"
                />
              </div>
            </div>

            {/* Member 2 */}
            <div style={styles.memberGroup}>
              <h4 style={styles.memberTitle}>Member 2</h4>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="member2Name"
                  value={formData.member2Name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter member's full name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Register Number</label>
                <input
                  type="text"
                  name="member2RegNo"
                  value={formData.member2RegNo}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 2021003"
                />
              </div>
            </div>

            {/* Member 3 */}
            <div style={styles.memberGroup}>
              <h4 style={styles.memberTitle}>Member 3</h4>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  name="member3Name"
                  value={formData.member3Name}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Enter member's full name"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Register Number</label>
                <input
                  type="text"
                  name="member3RegNo"
                  value={formData.member3RegNo}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., 2021004"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {}),
            }}
          >
            {loading ? "Submitting..." : "Register Group"}
          </button>

          {/* Message Display */}
          {message.text && (
            <div
              style={{
                ...styles.message,
                ...(message.type === "success"
                  ? styles.messageSuccess
                  : styles.messageError),
              }}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>

      <div style={styles.watermark}>created by Priyanshu Pattanayak</div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
    paddingBottom: "70px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "8px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    textAlign: "center",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  section: {
    backgroundColor: "#f9fafb",
    padding: "20px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "15px",
    marginTop: "0",
  },
  memberGroup: {
    marginBottom: "20px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e5e7eb",
  },
  memberTitle: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#6b7280",
    marginBottom: "10px",
    marginTop: "0",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "6px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    outline: "none",
  },
  select: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    boxSizing: "border-box",
    backgroundColor: "white",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    marginTop: "10px",
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
    cursor: "not-allowed",
  },
  message: {
    padding: "12px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    marginTop: "10px",
    textAlign: "center",
  },
  messageSuccess: {
    backgroundColor: "#d1fae5",
    color: "#065f46",
    border: "1px solid #6ee7b7",
  },
  messageError: {
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    border: "1px solid #fca5a5",
  },

  watermark: {
    position: "fixed",
    left: 0,
    right: 0,
    bottom: "10px",
    textAlign: "center",
    fontSize: "12px",
    color: "#6b7280",
    opacity: 0.9,
    pointerEvents: "none",
    userSelect: "none",
  },
};

export default GroupRegistration;

// https://script.google.com/macros/s/AKfycbwyM1eDHG4Inbgyd4Xhmx6jLkHAHFDJtMZH-0hf48XbWyQJ76TsSofUzSU3ttckHUnf/exec

// AKfycbwyM1eDHG4Inbgyd4Xhmx6jLkHAHFDJtMZH-0hf48XbWyQJ76TsSofUzSU3ttckHUnf
