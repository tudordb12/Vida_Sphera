// Assistant.js

// @mui material components
import { Card, Icon } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header";
// React and Axios for managing state and making API calls
import React, { useState } from 'react';
import axios from 'axios';

import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";

// Custom styles matching your dark theme
const chatStyles = {
  mainContainer: {
    position: "relative",
    height: "600px", // Fixed height
    width: "100%", // Full width of the card
    backgroundColor: "#131a28",
    borderRadius: "15px",
    padding: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  messagesList: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column", // Ensure messages stack vertically
    alignItems: "flex-start", // Default alignment for messages
  },
  messageContainer: {
    display: "flex",
    alignItems: "center", // Align items in the center
    maxWidth: "90%", // Increased flexibility on smaller screens
    marginBottom: "10px",
    borderRadius: "10px",
    wordWrap: "break-word",
  },
  messageIncoming: {
    backgroundColor: "#1e2a38",
    color: "white",
    alignSelf: "flex-start", // VIDA Assistant messages on the left
    padding: "10px",
  },
  messageOutgoing: {
    backgroundColor: "#2a3b4f",
    color: "white",
    alignSelf: "flex-end", // User messages on the right
    padding: "10px",
  },
  message: {
    borderRadius: "10px",
    maxWidth: "100%", // Ensure it doesn't exceed the container
  },
  typingIndicator: {
    fontStyle: "italic",
    color: "#b0b9c3",
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
    alignItems: "center", // Center the input and button vertically
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #394b61",
    borderRadius: "10px",
    outline: "none",
    width: "100%", // Full width to occupy space in the container
    fontSize: "14px",
    backgroundColor: "#1e2a38",
    color: "white",
  },
  iconContainer: {
    bgColor: "#0075FF",
    color: "white",
    width: "2.5rem", // Smaller size for mobile
    height: "2.5rem", // Smaller size for mobile
    borderRadius: "lg",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadow: "md",
    marginRight: "10px", // Space between icon and message text
  },
};

// Function to handle Assistant component
function Assistant() {
  const [messages, setMessages] = useState([
    { message: "Hello, I'm VIDA Assistant! Here to assist you with your health!", sender: "VIDA Assistant" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!inputValue) return; // Do not send empty messages

    const userMessage = { message: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue(""); // Clear the input field
    setIsTyping(true); // Set typing state

    // Fetch response from OpenAI API
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', // Specify your desired model
          messages: [{ role: 'user', content: inputValue }],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable for API key
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        message: response.data.choices[0].message.content,
        sender: "VIDA Assistant",
      };
      
      setMessages((prevMessages) => [...prevMessages, botMessage]); // Add VIDA Assistant's response
    } catch (error) {
      console.error("Error fetching from OpenAI API", error);
      const errorMessage = {
        message: "Sorry, something went wrong. Please try again.",
        sender: "VIDA Assistant",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]); // Handle error message
    } finally {
      setIsTyping(false); // Reset typing state
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          {/* Card containing VIDA Assistant */}
          <Header></Header>
          <Card>
            <div style={chatStyles.mainContainer}>
              <div style={chatStyles.messagesList}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    style={{
                      ...chatStyles.messageContainer,
                      ...(msg.sender === "VIDA Assistant"
                        ? chatStyles.messageIncoming
                        : chatStyles.messageOutgoing),
                    }}
                  >
                    {/* Display VIDA Assistant's icon */}
                    {msg.sender === "VIDA Assistant" && (
                      <VuiBox
                        bgColor={chatStyles.iconContainer.bgColor}
                        color={chatStyles.iconContainer.color}
                        width={chatStyles.iconContainer.width}
                        height={chatStyles.iconContainer.height}
                        borderRadius={chatStyles.iconContainer.borderRadius}
                        display={chatStyles.iconContainer.display}
                        justifyContent={chatStyles.iconContainer.justifyContent}
                        alignItems={chatStyles.iconContainer.alignItems}
                        boxShadow={chatStyles.iconContainer.shadow} // Use boxShadow for shadow
                        marginRight={chatStyles.iconContainer.marginRight}
                      >
                        <Icon fontSize="small" color="inherit">
                          <FcAssistant size="20px" color="white" />
                        </Icon>
                      </VuiBox>
                    )}
                    {/* Display User's icon before the user message */}
                    {msg.sender === "user" && (
                      <VuiBox
                        bgColor={chatStyles.iconContainer.bgColor}
                        color={chatStyles.iconContainer.color}
                        width={chatStyles.iconContainer.width}
                        height={chatStyles.iconContainer.height}
                        borderRadius={chatStyles.iconContainer.borderRadius}
                        display={chatStyles.iconContainer.display}
                        justifyContent={chatStyles.iconContainer.justifyContent}
                        alignItems={chatStyles.iconContainer.alignItems}
                        boxShadow={chatStyles.iconContainer.shadow} // Use boxShadow for shadow
                        marginRight={chatStyles.iconContainer.marginRight}
                      >
                        <Icon fontSize="small" color="inherit">
                          <FaUser size="20px" color="white" />
                        </Icon>
                      </VuiBox>
                    )}
                    {/* Message content */}
                    <div style={{
                      ...chatStyles.message,
                      ...(msg.sender === "VIDA Assistant"
                        ? chatStyles.messageIncoming
                        : chatStyles.messageOutgoing),
                    }}>
                      <strong>{msg.sender}: </strong>
                      <span>{msg.message}</span>
                    </div>
                  </div>
                ))}
                {isTyping && <div style={chatStyles.typingIndicator}>VIDA Assistant is typing...</div>}
              </div>
              <div style={chatStyles.inputContainer}>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  style={chatStyles.input}
                />
                <VuiBox
                  onClick={handleSend}
                  bgColor="#0075FF"
                  color="white"
                  width="3rem" // Adjusted for mobile
                  height="3rem" // Adjusted for mobile
                  marginLeft="10px"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    <IoSend size="20px" color="white" />
                  </Icon>
                </VuiBox>
              </div>
            </div>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Assistant;