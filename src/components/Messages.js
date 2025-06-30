import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Paper,
  Avatar,
  Badge,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiMoreVertical } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getMessages, sendMessage } from "../api/messages";
import { isLoggedIn } from "../helpers/authHelper";
import { socket } from "../helpers/socketHelper";
import Loading from "./Loading";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { BsChatSquareTextFill } from "react-icons/bs";
import { formatDistanceToNow } from "date-fns";
import { IoMdSend } from "react-icons/io";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const Messages = (props) => {
  const messagesEndRef = useRef(null);
  const user = isLoggedIn();
  const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inputMessage, setInputMessage] = useState("");

  const conversationsRef = useRef(props.conversations);
  const conservantRef = useRef(props.conservant);
  const messagesRef = useRef(messages);

  useEffect(() => {
    conversationsRef.current = props.conversations;
    conservantRef.current = props.conservant;
    messagesRef.current = messages;
  });

  const conversation =
    props.conversations &&
    props.conservant &&
    props.getConversation(props.conversations, props.conservant._id);

  const setDirection = (messages) => {
    messages.forEach((message) => {
      if (message.sender._id === user.userId) {
        message.direction = "from";
      } else {
        message.direction = "to";
      }
    });
  };

  const fetchMessages = async () => {
    if (conversation) {
      if (conversation.new) {
        setLoading(false);
        setMessages(conversation.messages);
        return;
      }

      setLoading(true);
      const data = await getMessages(user, conversation._id);
      setDirection(data);

      if (data && !data.error) {
        setMessages(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [props.conservant]);

  useEffect(() => {
    if (messages) {
      scrollToBottom();
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const content = inputMessage;
    const newMessage = { direction: "from", content };
    const newMessages = [newMessage, ...messages];

    if (conversation.new) {
      conversation.messages = [...conversation.messages, newMessage];
    }

    let newConversations = props.conversations.filter(
      (conversationCompare) => conversation._id !== conversationCompare._id
    );

    newConversations.unshift(conversation);
    props.setConversations(newConversations);
    setMessages(newMessages);
    setInputMessage("");

    await sendMessage(user, newMessage, conversation.recipient._id);
    socket.emit(
      "send-message",
      conversation.recipient._id,
      user.username,
      content
    );
  };

  const handleReceiveMessage = (senderId, username, content) => {
    const newMessage = { direction: "to", content };
    const conversation = props.getConversation(
      conversationsRef.current,
      senderId
    );

    if (conversation) {
      let newMessages = [newMessage];
      if (messagesRef.current) {
        newMessages = [...newMessages, ...messagesRef.current];
      }

      setMessages(newMessages);

      if (conversation.new) {
        conversation.messages = newMessages;
      }
      conversation.lastMessageAt = Date.now();

      let newConversations = conversationsRef.current.filter(
        (conversationCompare) => conversation._id !== conversationCompare._id
      );

      newConversations.unshift(conversation);
      props.setConversations(newConversations);
    } else {
      const newConversation = {
        _id: senderId,
        recipient: { _id: senderId, username },
        new: true,
        messages: [newMessage],
        lastMessageAt: Date.now(),
      };
      props.setConversations([newConversation, ...conversationsRef.current]);
    }

    scrollToBottom();
  };

  useEffect(() => {
    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, []);

  return props.conservant ? (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {messages && conversation && !loading ? (
        <>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 0,
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          >
            {props.mobile && (
              <IconButton
                onClick={() => props.setConservant(null)}
                sx={{ mr: 1 }}
              >
                <FiArrowLeft />
              </IconButton>
            )}
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              
            >
              <Avatar
                src={props.conservant.avatar}
                alt={props.conservant.username}
                sx={{ width: 40, height: 40 }}
              />
            </StyledBadge>
            <Box sx={{ ml: 2, flexGrow: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                <Link
                  to={"/users/" + props.conservant.username}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {props.conservant.username}
                </Link>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {props.conservant.status || ""}
              </Typography>
            </Box>
            <IconButton>
              
            </IconButton>
          </Paper>

          <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              p: 2,
              backgroundImage: "linear-gradient(rgba(245, 245, 245, 0.8), rgba(245, 245, 245, 0.8))",
            }}
          >
            <Stack
              spacing={1.5}
              sx={{ maxWidth: "800px", margin: "0 auto" }}
              direction="column-reverse"
            >
              <div ref={messagesEndRef} />
              {messages.map((message, i) => (
                <Message
                  conservant={props.conservant}
                  message={message}
                  key={i}
                />
              ))}
            </Stack>
          </Box>

          <Paper
            component="form"
            onSubmit={handleSendMessage}
            elevation={0}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              borderRadius: 0,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flexGrow: 1,
                border: "none",
                outline: "none",
                padding: "10px 15px",
                borderRadius: "20px",
                backgroundColor: "#f5f5f5",
                marginRight: "10px",
              }}
            />
            <IconButton
              type="submit"
              color="primary"
              sx={{ p: "10px" }}
              disabled={!inputMessage.trim()}
            >
              <IoMdSend />
            </IconButton>
          </Paper>
        </>
      ) : (
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Loading />
        </Box>
      )}
    </Box>
  ) : (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 3,
      }}
    >
      <BsChatSquareTextFill
        size={80}
        style={{ color: "#e0e0e0", marginBottom: "20px" }}
      />
      <Typography variant="h5" gutterBottom>
        Your messages
      </Typography>
      <Typography color="text.secondary" sx={{ maxWidth: "400px" }}>
        Select a conversation or start a new chat with your friends
      </Typography>
    </Box>
  );
};

export default Messages;