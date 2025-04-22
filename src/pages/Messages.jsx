import { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(saved.reverse()); // عرض الأحدث أولاً
  }, []);

  return (
    <div className="container py-5">
      <h3 className="text-center mb-4">Your Messages to the Doctor</h3>

      {messages.length === 0 ? (
        <p className="text-muted text-center">No messages sent yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Sent At</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg, index) => (
                <tr key={msg.id}>
                  <td>{index + 1}</td>
                  <td>{formatSubject(msg.subject)}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.id).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};


const formatSubject = (subject) => {
  switch (subject) {
    case "blood_sugar": return "Blood Sugar";
    case "blood_pressure": return "Blood Pressure";
    case "medications": return "Medications";
    default: return "Other";
  }
};

export default Messages;
