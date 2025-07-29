import React from "react";

const Home = () => {
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
      </form>
    </div>
  );
};

export default Home;
