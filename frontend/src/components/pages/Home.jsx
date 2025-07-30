import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Home = () => {
  const navigate = useNavigate();
  const stars = Array(5).fill(0);

  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    feedbackType: "",
    rating: 0,
    recommend: "",
    contactMethods: [],
    message: "",
    agreeToTerms: false,
  });

  const handleClick = (value) => {
    setCurrentValue(value);
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleMouseHover = (value) => setHoverValue(value);
  const handleMouseLeave = () => setHoverValue(undefined);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "contactMethods") {
      setFormData((prev) => ({
        ...prev,
        contactMethods: checked
          ? [...prev.contactMethods, value]
          : prev.contactMethods.filter((v) => v !== value),
      }));
    } else if (type === "checkbox" && name === "agreeToTerms") {
      setFormData((prev) => ({ ...prev, agreeToTerms: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const err = {};

    if (!formData.name.trim()) err.name = "Name is required";
    if (!formData.email) err.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      err.email = "Invalid email";

    if (formData.contact && !/^\d{10}$/.test(formData.contact))
      err.contact = "Contact must be 10 digits";

    if (!formData.feedbackType) err.feedbackType = "Feedback type is required";
    if (!formData.rating || formData.rating < 1)
      err.rating = "Rating is required";

    if (!formData.recommend) err.recommend = "Recommendation is required";

    if (formData.message.length > 300)
      err.message = "Message must be under 300 characters";

    if (!formData.agreeToTerms)
      err.agreeToTerms = "You must agree to the terms";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          contact: "",
          feedbackType: "",
          rating: 0,
          recommend: "",
          contactMethods: [],
          message: "",
          agreeToTerms: false,
        });
        setCurrentValue(0);
        setErrors({});
        navigate("/feedback");
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h1>FeedBack Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>

        <div>
          <label>Feedback Type</label>
          <select
            name="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="bugReport">Bug Report</option>
            <option value="suggestion">Suggestion</option>
            <option value="generalFeedback">General Feedback</option>
          </select>
          {errors.feedbackType && (
            <span className="error">{errors.feedbackType}</span>
          )}
        </div>
        <br />
        <div className="form-group">
          <label>Ratings</label>
          <div className="star-ratings">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                style={{ marginRight: 10, cursor: "pointer" }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                onClick={() => handleClick(index + 1)}
                onMouseOver={() => handleMouseHover(index + 1)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            {errors.rating && <span className="error">{errors.rating}</span>}
          </div>
        </div>

        <div className="form-group inline">
          <label>Would you recommend us?</label>
          <label>
            <input
              type="radio"
              name="recommend"
              value="Yes"
              checked={formData.recommend === "Yes"}
              onChange={handleChange}
            />{" "}
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="recommend"
              value="No"
              checked={formData.recommend === "No"}
              onChange={handleChange}
            />{" "}
            No
          </label>

          {errors.recommend && (
            <span className="error">{errors.recommend}</span>
          )}
        </div>

        <div className="form-group inline contact-methods">
          <label>Contact Methods</label>
          <label>
            <input
              type="checkbox"
              name="contactMethods"
              value="Email"
              onChange={handleChange}
              checked={formData.contactMethods.includes("Email")}
            />
            Email
          </label>
          <label>
            <input
              type="checkbox"
              name="contactMethods"
              value="phone"
              onChange={handleChange}
              checked={formData.contactMethods.includes("phone")}
            />
            Phone
          </label>

          <label>
            <input
              type="checkbox"
              name="contactMethods"
              value="whatsapp"
              onChange={handleChange}
              checked={formData.contactMethods.includes("whatsapp")}
            />
            Whatsapp
          </label>
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Enter your message (max 300 chars)"
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <div className="form-group inline">
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            I agree to the terms and conditions
          </label>

          {errors.agreeToTerms && (
            <span className="error">{errors.agreeToTerms}</span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
