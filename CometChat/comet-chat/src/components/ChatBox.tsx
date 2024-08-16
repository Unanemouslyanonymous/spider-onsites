import React from 'react';

interface Message {
  _id: string;
  sender: { username: string };
  content: string;
  createdAt: string;
}

interface ChatBoxProps {
  messages: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="overflow-y-auto h-80 mb-4 p-4 bg-white rounded-lg shadow">
      {messages.map((msg) => (
        <div key={msg._id} className="mb-2">
          <span className="font-bold">{msg.sender.username}: </span>
          <span>{msg.content}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatBox;