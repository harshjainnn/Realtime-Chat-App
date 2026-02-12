import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatContainerSkeleton from "./skeletons/ChatContainerSkeleton.jsx";
import Header from "./Header.jsx";
import MessageInput from "./MessageInput.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import avatarPng from "../assets/avatar.jpg";
import { formatMessageTime } from "../lib/utils.js";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeToMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef();
  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeToMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);
  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <ChatContainerSkeleton />;
      </div>
    );
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Header />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          if (!message || !message.senderId) return null;
          return (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic?.trim() || avatarPng
                        : selectedUser.profilePic?.trim() || avatarPng
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="attatchment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
