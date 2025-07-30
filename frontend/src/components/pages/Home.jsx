import { useState } from "react";
import { FaStar } from "react-icons/fa";
import "./Home.css";
const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const Home = () => {
  const stars = Array(5).fill(0);

  const [currentValue, setCurrentValue] = useState(0);

  const [hoverValue, setHoverValue] = useState(undefined);

  const handleClick = (value) => {
    setCurrentValue(value);
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleMouseHover = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };
  // state management for form datas
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
  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms first.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Feedback submitted successfully!");
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
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold underline">FeedBack Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Your emailID"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="contact">Phone</label>
          <input
            type="text"
            name="contact"
            placeholder="Enter Phone Number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="feedbackType">Feedback Type</label>
          <select
            name="feedbackType"
            id="feedbackType"
            value={formData.feedbackType}
            onChange={handleChange}
          >
            <option value="bugReport">Bug Report</option>

            <option value="suggestion">Suggestion</option>

            <option value="generalFeedback">General Feedback</option>
          </select>
        </div>

        <div>
          <label htmlFor="ratings">Ratings</label>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                style={{
                  marginRight: 10,
                  cursor: "pointer",
                }}
                color={
                  (hoverValue || currentValue) > index
                    ? colors.orange
                    : colors.grey
                }
                onClick={() => {
                  handleClick(index + 1);
                }}
                onMouseOver={() => {
                  handleMouseHover(index + 1);
                }}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>

        <div>
          <label htmlFor="recommend">Would you recommend us?</label>
          <input
            type="radio"
            name="recommend"
            id="recommend"
            value="Yes"
            checked={formData.recommend === "Yes"}
            onChange={handleChange}
          />
          Yes
          <br />
          <input
            type="radio"
            name="recommend"
            id="recommend"
            value="No"
            checked={formData.recommend === "No"}
            onChange={handleChange}
          />
          No
        </div>

        <div className="contact-methods">
          <label htmlFor="contactMethods">Contact Methods</label>
          <input
            type="checkbox"
            name="contactMethods"
            value="Email"
            onChange={handleChange}
          />
          Email
          <br />
          <input
            type="checkbox"
            name="contactMethods"
            value="phone"
            onChange={handleChange}
          />
          Phone
          <br />
          <input
            type="checkbox"
            name="contactMethods"
            value="whatsapp"
            onChange={handleChange}
          />
          Whatsapp
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <br />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Enter a message"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
          />
          I agree to the terms and conditions
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Home;
