// Feedbacks.jsx
import { useEffect, useState } from "react";

const Feedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/feedback")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched feedbacks:", data);
        setFeedbacks(data);
      })
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  const filteredFeedbacks = feedbacks
    .filter((f) =>
      (f.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (f.email || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = (a[sortField] || "").toString().toLowerCase();
      const valueB = (b[sortField] || "").toString().toLowerCase();
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submitted Feedback</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border p-2 rounded"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="rating">Rating</option>
        </select>
        <select
          className="border p-2 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <table className="w-full border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Rating</th>
            <th className="p-2">Recommend</th>
            <th className="p-2">Message</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((fb) => (
            <tr key={fb._id} className="border-t">
              <td className="p-2">{fb.name || "-"}</td>
              <td className="p-2">{fb.email || "-"}</td>
              <td className="p-2">{fb.contact || "-"}</td>
              <td className="p-2">{fb.rating ?? "-"}</td>
              <td className="p-2">{fb.recommend || "-"}</td>
              <td className="p-2">{fb.message || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Feedbacks;
