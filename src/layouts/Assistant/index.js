import { Card, Icon, useMediaQuery } from "@mui/material";
import VuiBox from "components/VuiBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "./Header";
import React, { useState } from 'react';
import axios from 'axios';
import { IoSend } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";

// Custom styles matching your dark theme with mobile adjustments
const getChatStyles = (isMobile) => ({
  mainContainer: {
    position: "relative",
    height: "600px",
    width: "100%",
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
    flexDirection: "column",
    alignItems: "flex-start",
  },
  messageContainer: {
    display: "flex",
    alignItems: "center",
    maxWidth: "90%",
    marginBottom: "10px",
    borderRadius: "10px",
    wordWrap: "break-word",
  },
  messageIncoming: {
    backgroundColor: "#1e2a38",
    color: "white",
    alignSelf: "flex-start",
    padding: "10px",
    fontSize: isMobile ? "12px" : "16px", // Smaller font for mobile
  },
  messageOutgoing: {
    backgroundColor: "#2a3b4f",
    color: "white",
    alignSelf: "flex-end",
    padding: "10px",
    fontSize: isMobile ? "12px" : "16px", // Smaller font for mobile
  },
  message: {
    borderRadius: "10px",
    maxWidth: "100%",
  },
  typingIndicator: {
    fontStyle: "italic",
    color: "#b0b9c3",
    fontSize: isMobile ? "12px" : "14px", // Adjust font size for typing indicator
  },
  inputContainer: {
    display: "flex",
    marginTop: "10px",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #394b61",
    borderRadius: "10px",
    outline: "none",
    width: "100%",
    fontSize: isMobile ? "12px" : "14px", // Smaller input font for mobile
    backgroundColor: "#1e2a38",
    color: "white",
  },
  iconContainer: {
    bgColor: "#0075FF",
    color: "white",
    width: isMobile ? "2.2rem" : "2.5rem", // Adjust size for mobile
    height: isMobile ? "2.2rem" : "2.5rem",
    borderRadius: "lg",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadow: "md",
    marginRight: "10px",
  },
});

// Assistant component
function Assistant() {
  const [messages, setMessages] = useState([
    { message: "Hello, I'm VIDA Assistant! Here to assist you with your health!", sender: "VIDA Assistant" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isMobile = useMediaQuery('(max-width: 600px)'); // Detect if the window width is mobile size
  const chatStyles = getChatStyles(isMobile); // Apply mobile-specific styles

  const handleSend = async () => {
    if (!inputValue) return;

    const userMessage = { message: inputValue, sender: "User" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'User', content: inputValue }],
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        message: response.data.choices[0].message.content,
        sender: "VIDA Assistant",
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching from OpenAI API", error);
      const errorMessage = {
        message: "Sorry, something went wrong. Please try again.",
        sender: "VIDA Assistant",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Header />
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
                        boxShadow={chatStyles.iconContainer.shadow}
                        marginRight={chatStyles.iconContainer.marginRight}
                      >
                        <Icon fontSize="small" color="inherit">
                          <FcAssistant size="20px" color="white" />
                        </Icon>
                      </VuiBox>
                    )}
                    {msg.sender === "User" && (
                      <VuiBox
                        bgColor={chatStyles.iconContainer.bgColor}
                        color={chatStyles.iconContainer.color}
                        width={chatStyles.iconContainer.width}
                        height={chatStyles.iconContainer.height}
                        borderRadius={chatStyles.iconContainer.borderRadius}
                        display={chatStyles.iconContainer.display}
                        justifyContent={chatStyles.iconContainer.justifyContent}
                        alignItems={chatStyles.iconContainer.alignItems}
                        boxShadow={chatStyles.iconContainer.shadow}
                        marginRight={chatStyles.iconContainer.marginRight}
                      >
                        <Icon fontSize="small" color="inherit">
                          <FaUser size="20px" color="white" />
                        </Icon>
                      </VuiBox>
                    )}
                    <div
                      style={{
                        ...chatStyles.message,
                        ...(msg.sender === "VIDA Assistant"
                          ? chatStyles.messageIncoming
                          : chatStyles.messageOutgoing),
                      }}
                    >
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
                  width={isMobile ? "2.5rem" : "3rem"}
                  height={isMobile ? "2.5rem" : "3rem"}
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