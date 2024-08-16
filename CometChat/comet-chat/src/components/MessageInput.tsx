import React, { useState } from 'react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [content, setContent] = useState<string>('');

  const handleSendMessage = () => {
    if (content.trim()) {
      onSendMessage(content);
      setContent('');
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        className="w-full p-2 border rounded-lg mr-2"
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded-lg">
        Send
      </button>
    </div>
  );
};

export default MessageInput;
