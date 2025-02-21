import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";


function CustomerChat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const customerId = localStorage.getItem("userId");
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/chat/getCustomerMessages/${customerId}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMessages(data);
                } else {
                    console.error("Unexpected response:", data);
                    setMessages([]);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching messages:", error);
                setLoading(false);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages,100); // Poll every 3 seconds

        return () => clearInterval(interval); // Cleanup
    }, [customerId]);

    const sendMessage = async () => {
        if (newMessage.trim() === "") return;

        const messageData = { customerId: customerId, text: newMessage };

        try {
            const response = await fetch(`${BACKEND_URL}/chat/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(messageData),
            });

            const savedMessage = await response.json();
            setMessages((prev) => [...prev, savedMessage]); // Update UI
            setNewMessage(""); // Clear input
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    const deleteMessage = async (messageId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/chat/deleteMessage/${messageId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setMessages((prevMessages) =>
                    prevMessages.filter((message) => message._id !== messageId)
                );
            } else {
                console.error("Failed to delete message");
            }
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    };

    return (
      <div style={styles.container}>
        <div style={styles.chatContainer}>
            <h3>Anonymous Feedback <FaRegMessage/> </h3>
            <br></br>
            {loading ? <p>Loading messages...</p> : (
                <div style={styles.messagesContainer}>
                    {messages.length === 0 ? (
                        <p>No messages yet.</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={msg._id} style={styles.message}>
                                <div style={styles.messageText}>{msg.text}</div>
                                <button
                                    onClick={() => deleteMessage(msg._id)}
                                    style={styles.deleteButton}
                                >
                                    <RiDeleteBin5Line/>
                                </button>
                            </div>
                        ))
                    )}
                </div>
            )}
            <div style={styles.inputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    style={styles.input}
                />
                <button onClick={sendMessage} style={styles.sendButton}>Send</button>
            </div>
        </div>
        </div>
    );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",  
    alignItems: "center",      
    height: "100vh",        
},
    chatContainer: {
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        height: "90%",
    },
    messagesContainer: {
        flexGrow: 1,
        overflowY: "auto",
        paddingRight: "20px",
    },
    message: {
        marginBottom: "12px",
        padding: "12px",
        borderRadius: "10px",
        backgroundColor: "#e1f5fe",
        maxWidth: "80%",
        marginLeft: "auto",
        marginRight: "0",
        wordWrap: "break-word",
        position: "relative",
    },
    messageText: {
        fontSize: "14px",
        color: "#333",
    },
    deleteButton: {
        position: "absolute",
        top: "10px",
        right: "5px",
        background: "none",
        border: "none",
        fontSize: "18px",
        // color: "#ff4d4d",
        cursor: "pointer",
        transition: "color 0.3s ease",
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
    },
    input: {
        flex: "1",
        padding: "12px",
        border: "2px solid #ccc",
        borderRadius: "25px",
        outline: "none",
        fontSize: "16px",
        color: "#333",
        transition: "border 0.3s ease",
    },
    sendButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "12px 18px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
};

export default CustomerChat;
