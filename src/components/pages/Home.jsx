import React, { use, useState } from "react";
import { FaStar } from "react-icons/fa";

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
  };

  const handleMouseHover = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeave = (value) => {
    setHoverValue(undefined);
  };
  return (
    <div className="container">
      <h1>FeedBack Form</h1>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Enter Your name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Your emailID" />
        </div>
        <div>
          <label htmlFor="contact">Name</label>
          <input type="text" name="contact" placeholder="Enter Phone Number" />
        </div>

        <div>
          <label htmlFor="feedbackType">Feedback Type</label>
          <select name="feedbackType" id="feedbackType">
            <option value="bugReport">Bug Report</option>

            <option value="suggestion">Suggestion</option>

            <option value="generalFeedback">General Feedback</option>
          </select>
        </div>

        <div className="star">
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
                onMouseOver={()=>{
                  handleMouseHover(index+1)
                }}
                onMouseLeave={handleMouseLeave}
              />
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default Home;
