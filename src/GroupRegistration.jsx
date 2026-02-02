import React, { useState } from "react";
import "./GroupRegistration.css";

const GroupRegistration = () => {
  const REGISTRATION_CLOSED = true;
  const REGISTRATION_CLOSED_MESSAGE =
    "No more registration allowed contact authority..";

  // REPLACE THIS WITH YOUR ACTUAL APPS SCRIPT URL
  const APPS_SCRIPT_URL = import.meta.env?.VITE_APPS_SCRIPT_URL;

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

    if (REGISTRATION_CLOSED) {
      setMessage({ text: REGISTRATION_CLOSED_MESSAGE, type: "error" });
      return;
    }

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
    <div className="gr-page">
      <div className="gr-card">
        <div className="gr-header">
          <h1 className="gr-title">Project Group Registration</h1>
          <p className="gr-subtitle">
            Register your team of 4 students (1 Leader + 3 Members)
          </p>

          {REGISTRATION_CLOSED && (
            <div className="gr-closedBanner">{REGISTRATION_CLOSED_MESSAGE}</div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="gr-form">
          {/* Role Selection */}

          {/* Leader Fields */}
          <div className="gr-section">
            <div className="gr-sectionHeader">
              <h3 className="gr-sectionTitle">Leader Information</h3>
              <span className="gr-sectionHint">Required</span>
            </div>

            <div className="gr-grid2">
              <div className="gr-field">
                <label className="gr-label">Leader Name *</label>
                <input
                  type="text"
                  name="leaderName"
                  value={formData.leaderName}
                  onChange={handleInputChange}
                  required
                  disabled={loading || REGISTRATION_CLOSED}
                  className="gr-input"
                  placeholder="Enter leader's full name"
                />
              </div>

              <div className="gr-field">
                <label className="gr-label">Leader Register Number *</label>
                <input
                  type="text"
                  name="leaderRegNo"
                  value={formData.leaderRegNo}
                  onChange={handleInputChange}
                  required
                  disabled={loading || REGISTRATION_CLOSED}
                  className="gr-input"
                  placeholder="e.g., 22410..."
                />
              </div>
            </div>
          </div>

          {/* Member Fields */}
          <div className="gr-section">
            <div className="gr-sectionHeader">
              <h3 className="gr-sectionTitle">Team Members</h3>
              <span className="gr-sectionHint">
                Fill both fields, or leave both empty
              </span>
            </div>

            {/* Member 1 */}
            <div className="gr-member">
              <h4 className="gr-memberTitle">Member 1</h4>
              <div className="gr-grid2">
                <div className="gr-field">
                  <label className="gr-label">Name</label>
                  <input
                    type="text"
                    name="member1Name"
                    value={formData.member1Name}
                    onChange={handleInputChange}
                    disabled={loading || REGISTRATION_CLOSED}
                    className="gr-input"
                    placeholder="Enter member's full name"
                  />
                </div>

                <div className="gr-field">
                  <label className="gr-label">Register Number</label>
                  <input
                    type="text"
                    name="member1RegNo"
                    value={formData.member1RegNo}
                    onChange={handleInputChange}
                    disabled={loading || REGISTRATION_CLOSED}
                    className="gr-input"
                    placeholder="e.g., 22410..."
                  />
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="gr-member">
              <h4 className="gr-memberTitle">Member 2</h4>
              <div className="gr-grid2">
                <div className="gr-field">
                  <label className="gr-label">Name</label>
                  <input
                    type="text"
                    name="member2Name"
                    value={formData.member2Name}
                    onChange={handleInputChange}
                    disabled={loading || REGISTRATION_CLOSED}
                    className="gr-input"
                    placeholder="Enter member's full name"
                  />
                </div>

                <div className="gr-field">
                  <label className="gr-label">Register Number</label>
                  <input
                    type="text"
                    name="member2RegNo"
                    value={formData.member2RegNo}
                    onChange={handleInputChange}
                    disabled={loading || REGISTRATION_CLOSED}
                    className="gr-input"
                    placeholder="e.g., 22410..."
                  />
                </div>
              </div>
            </div>

            {/* Member 3 */}
            <div className="gr-member">
              <h4 className="gr-memberTitle">Member 3</h4>
              <div className="gr-grid2">
                <div className="gr-field">
                  <label className="gr-label">Name</label>
                  <input
                    type="text"
                    name="member3Name"
                    value={formData.member3Name}
                    onChange={handleInputChange}
                    disabled={loading || REGISTRATION_CLOSED}
                    className="gr-input"
                    placeholder="Enter member's full name"
                  />
                </div>

                <div className="gr-field">
                  <label className="gr-label">Register Number</label>
                  <input
                    type="text"
                    name="member3RegNo"
                    value={formData.member3RegNo}
                    onChange={handleInputChange}
                    disabled={loading || REGISTRATION_CLOSED}
                    className="gr-input"
                    placeholder="e.g., 22410..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="gr-actions">
            <button
              type="submit"
              disabled={loading || REGISTRATION_CLOSED}
              className="gr-button"
            >
              {REGISTRATION_CLOSED
                ? "Registration Closed"
                : loading
                  ? "Submitting..."
                  : "Register Group"}
            </button>
          </div>

          {/* Message Display */}
          {message.text && (
            <div
              className={`gr-message ${
                message.type === "success"
                  ? "gr-messageSuccess"
                  : "gr-messageError"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>
      </div>

      <div className="gr-watermark">created by Priyanshu Pattanayak</div>
    </div>
  );
};

export default GroupRegistration;
