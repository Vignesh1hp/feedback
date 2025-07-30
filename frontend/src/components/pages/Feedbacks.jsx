import { useEffect, useState } from "react";
import "./Feedbacks.css";
// feedback page
const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = () => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  };
  // handling deleting feedback
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      try {
        await fetch(`http://localhost:8080/api/feedback/${id}`, {
          method: "DELETE",
        });
        fetchFeedbacks();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };
  // handling update feedback datas
  const handleUpdate = async (id) => {
    const existing = feedbacks.find((f) => f._id === id);

    const updatedName = prompt("Enter new name:", existing.name);
    const updatedEmail = prompt("Enter new email:", existing.email);
    const updatedContact = prompt("Enter new contact:", existing.contact);
    const updatedRating = prompt("Enter rating (1-5):", existing.rating);
    const updatedRecommend = prompt("Recommend? (Yes/No):", existing.recommend);
    const updatedMessage = prompt("Enter message:", existing.message);

    const errors = [];

    if (!updatedName || updatedName.trim() === "")
      errors.push("Name is required");
    if (!updatedEmail || !/^\S+@\S+\.\S+$/.test(updatedEmail))
      errors.push("Valid email required");
    if (updatedContact && !/^\d{10}$/.test(updatedContact))
      errors.push("Contact must be 10 digits");
    if (
      !updatedRating ||
      isNaN(updatedRating) ||
      updatedRating < 1 ||
      updatedRating > 5
    )
      errors.push("Rating must be between 1 and 5");
    if (!updatedRecommend) errors.push("Recommendation is required");
    if (updatedMessage && updatedMessage.length > 300)
      errors.push("Message max 300 characters");

    if (errors.length > 0) {
      alert("Validation errors:\n" + errors.join("\n"));
      return;
    }

    try {
      await fetch(`http://localhost:8080/api/feedback/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: updatedName,
          email: updatedEmail,
          contact: updatedContact,
          rating: updatedRating,
          recommend: updatedRecommend,
          message: updatedMessage,
        }),
      });
      fetchFeedbacks();
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  const filteredFeedbacks = feedbacks
    .filter(
      (f) =>
        (f.name || "").toLowerCase().includes(search.toLowerCase()) ||
        (f.email || "").toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = (a[sortField] || "").toString().toLowerCase();
      const valueB = (b[sortField] || "").toString().toLowerCase();
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="container">
      <h2>Submitted Feedback</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="rating">Rating</option>
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
            <th>Recommend</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((fb) => (
            <tr key={fb._id}>
              <td>{fb.name || "-"}</td>
              <td>{fb.email || "-"}</td>
              <td>{fb.contact || "-"}</td>
              <td>{fb.rating ?? "-"}</td>
              <td>{fb.recommend || "-"}</td>
              <td>{fb.message || "-"}</td>
              <td>
                <button
                  className="btn update"
                  onClick={() => handleUpdate(fb._id)}
                >
                  Update
                </button>
                <button
                  className="btn delete"
                  onClick={() => handleDelete(fb._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feedbacks;
