import { useEffect, useState } from "react";
import "./Feedbacks.css";

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

  const handleUpdate = async (id) => {
    const updatedName = prompt("Enter new name:");
    const updatedEmail = prompt("Enter new email:");

    if (updatedName && updatedEmail) {
      try {
        await fetch(`http://localhost:8080/api/feedback/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: updatedName, email: updatedEmail }),
        });
        fetchFeedbacks();
      } catch (error) {
        console.error("Update error:", error);
      }
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
