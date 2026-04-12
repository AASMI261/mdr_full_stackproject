import React, { useState } from "react";
import timeAgo from "./timeAgo";

function App() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all"); // all | unread
  const [selectedNotification, setSelectedNotification] = useState(null);

   // Sample Notification Data
   const initialNotifications = [
  {
    id: 1,
    title: "⚠️ New MDR Case Detected",
    message: "Patient ID: PT-104 tested MDR positive in Ward 3A.",
    unread: true,
    time: new Date(Date.now() - 5 * 60 * 1000) // 5 min ago
  },
  {
    id: 2,
    title: "🔴 High-Risk Contact Identified",
    message: "Nurse ID NR-221 had direct exposure to MDR patient.",
    unread: true,
    time: new Date(Date.now() - 45 * 60 * 1000) // 45 min ago
  },
  {
    id: 3,
    title: "🟡 Isolation Needed",
    message: "Room 12B marked for urgent isolation due to exposure.",
    unread: false,
    time: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 4,
    title: "📞 Voice Screening Update",
    message: "Patient CT-552 shows mild symptoms during call bot check.",
    unread: false,
    time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  }
];

// ✅ useState instead of plain const
const [notifications, setNotifications] = useState(initialNotifications);
  
  
  // Filter logic
  const filteredData =
  activeTab === "all"
    ? notifications
    : activeTab === "unread"
    ? notifications.filter((n) => n.unread)
    : notifications.filter((n) => !n.unread); // ✅ read


      // When user clicks a notification -> mark as read and open detail
      const handleMarkAsRead = (notifId) => {setNotifications((prev) =>prev.map((n) =>
       n.id === notifId ? { ...n, unread: false } : n));
      };
      
       // If user clicked a notification → show detail page
       if (selectedNotification) {
  return (
    <div style={{ padding: "30px" }}>
      <button onClick={() => setSelectedNotification(null)}>⬅ Back</button>
      <h2>{selectedNotification.title}</h2>
      <p>{selectedNotification.message}</p>

      {/* ✅ Add this button */}
      {selectedNotification.unread && (
        <button
          onClick={() => {
            handleMarkAsRead(selectedNotification.id);
            setSelectedNotification({ ...selectedNotification, unread: false });
          }}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"}}>Mark as Read</button>
        )}
       </div>
      );
       }


       return (
      <div style={{ padding: "30px" }}>

      {/* Notification Button */}
    <button
    onClick={() => setOpen(true)}
    style={{
    width: "50px",
    height: "50px",
    fontSize: "22px",
    borderRadius: "15px",
    cursor: "pointer",
    border: "1px solid #ccc",
    background: "#fff",
     position: "absolute",   // ✅ change from relative → absolute
        top: 20,                // distance from top
        right: 20 
    }}
     >
    🔔
    {notifications.filter(n => n.unread).length > 0 && (
      <span style={{
      position: "absolute",
      top: 0,
      right: 0,
      background: "red",
      color: "white",
      borderRadius: "50%",
      padding: "2px 6px",
      fontSize: "12px"
      }}>
      {notifications.filter(n => n.unread).length}
       </span>
       )}
       </button>
      

      {/* Overlay */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end", // rectangle comes from bottom
            zIndex: 999
          }}
        >
             {/* Bottom Rectangle */}
          <div
            style={{
              width: "400px",
              height: "80vh",
              background: "#fff",
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              padding: "20px",
              boxShadow: "0 -4px 15px rgba(0,0,0,0.3)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto" 
            }}
          >

            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px"
              }}
            >
               <h2 style={{ margin: 0 }}>Notification</h2>

              <button
                onClick={() => setOpen(false)}
                style={{
                  fontSize: "26px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                ×
              </button>
            </div>

            {/* ALL / UNREAD Buttons */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px"
              }}
            >
              <button
                onClick={() => setActiveTab("all")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: activeTab === "all" ? "#000" : "#eaeaea",
                  color: activeTab === "all" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                All
              </button>
            <button 
              onClick={() => setActiveTab("read")}
              style={{
              flex: 1,
              padding: "10px",
              background: activeTab === "read" ? "#000" : "#eaeaea",
              color: activeTab === "read" ? "#fff" : "#000",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600"
             }}>
             Read
            </button>
                <button
                onClick={() => setActiveTab("unread")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: activeTab === "unread" ? "#000" : "#eaeaea",
                  color: activeTab === "unread" ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Unread
              </button>
            </div>

            {/* Notification List */}
            {filteredData.length === 0 ? (
              <p style={{ color: "#777" }}>No notifications right now</p>
            ) : (
              filteredData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNotification(item)}
                  style={{
                    padding: "12px",
                    borderBottom: "1px solid #ddd",
                    cursor: "pointer",
                    background: item.unread ? "#f8f8f8" : "#fff"
                  }}
                >
                  <strong>{item.title}</strong>
                  <p style={{ margin: 0, color: "#666" }}>{item.message}</p>
                  <p style={{
                     fontSize: "12px",
                     color: "#888",
                     textAlign: "right",
                     marginTop: "5px" }}>
                   {timeAgo(item.time)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default App;