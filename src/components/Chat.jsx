import React, { useEffect, useState, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import { baseUrl } from "../Api";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [userStatuses, setUserStatuses] = useState({});

  // Fetch User and Users List
  const fetchUserData = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("⚠️ No token found, cannot fetch user data.");
      return;
    }
    try {
      const [userRes, usersRes] = await Promise.all([
        fetch(`${baseUrl}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${baseUrl}/messages/users`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const userData = await userRes.json();
      const usersData = await usersRes.json();

      if (userData.success) setUserId(userData.user.id);
      if (usersData.success) setUsers(usersData.users);
    } catch (error) {
      console.error("❌ Error fetching user/messages:", error);
    }
  }, []);

  // Fetch messages for selected user
  const fetchMessages = useCallback(async () => {
    if (!selectedUser) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${baseUrl}/messages?userId=${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setMessages(data.messages);
        scrollToBottom();
      }
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
    }
  }, [selectedUser]);

  // Initialize Socket Connection
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    // Prevent multiple socket connections
    if (!socketRef.current) {
      const socket = io("http://localhost:4000", { query: { token } });
      socketRef.current = socket;

      socket.on("connect", () => console.log("✅ Socket connected."));
      socket.on("disconnect", () => console.warn("⚠️ Socket disconnected."));
      socket.on("userStatus", ({ userId, status }) => {
        setUserStatuses((prev) => ({ ...prev, [userId]: status }));
      });
      socket.on("privateMessage", (newMessage) => {
        if (
          newMessage.senderId === selectedUser?.id ||
          newMessage.receiverId === selectedUser?.id
        ) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
          scrollToBottom();
        }
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [selectedUser]);

  // Fetch user data on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // Fetch messages when user selection changes
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (!message.trim() || !socketRef.current || !selectedUser) return;

    const newMessage = {
      senderId: userId,
      receiverId: selectedUser.id,
      content: message,
    };

    socketRef.current.emit("privateMessage", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");
    scrollToBottom();
  };

  return (
    <div className="container chat-container">
      <div className="row">
        {/* User List */}
        <div className="col-md-3 users-list mt-4">
          <h4>Users</h4>
          <ul className="list-group mt-2">
            {users.map((user) => (
              <li
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`list-group-item d-flex justify-content-between align-items-center ${
                  selectedUser?.id === user.id ? "active" : ""
                }`}
              >
                <span>{user.username}</span>
                <span
                  className={`status-dot ${
                    userStatuses[user.id] === "online" ? "online" : "offline"
                  }`}
                ></span>
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Window */}
        <div className="col-md-9 chat-room mt-4">
          <h3>
            {selectedUser
              ? `Chat with ${selectedUser.username}`
              : "Select a User"}
          </h3>

          {/* Messages Container */}
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.senderId === userId ? "sent" : "received"
                }`}
              >
                <span className="message-user fw-bold">
                  {msg.senderId === userId ? "You" : selectedUser.username}:
                </span>
                <p className="message-content">{msg.content}</p>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>

          {/* Message Input */}
          <div className="message-input p-2 pb-4">
            <textarea
              className="form-control form-control-lg chat-input"
              rows="2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              className="btn btn-primary mt-2"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
