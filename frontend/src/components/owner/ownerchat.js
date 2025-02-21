import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegMessage } from "react-icons/fa6";

function OwnerChat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    const ownerId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/chat/getAllMessages`);
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
        const interval = setInterval(fetchMessages, 1000); // Poll every 3 seconds

        return () => clearInterval(interval); // Cleanup
    }, [ownerId]);

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
            <h3>Anonymous Feedback <FaRegMessage/></h3>
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
        paddingRight: "10px",
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
};

export default OwnerChat;
