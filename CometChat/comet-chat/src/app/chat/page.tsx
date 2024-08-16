'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import ChatBox from '../../components/ChatBox';
import MessageInput from '../../components/MessageInput';
import { encryptMessage, decryptMessage } from '../../utils/cryptoUtils';

interface Conversation {
  _id: string;
  name: string;
  type: 'group' | 'user';
  members?: Array<{ publicKey: string }>;
  publicKey?: string;
}

interface Message {
  _id: string;
  sender: { username: string };
  content: string;
  createdAt: string;
}

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string);

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [userPrivateKey, setUserPrivateKey] = useState<string>('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/conversations`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setConversations(res.data);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    fetchConversations();

    const storedPrivateKey = localStorage.getItem('privateKey');
    setUserPrivateKey(storedPrivateKey || '');
  }, []);

  useEffect(() => {
    if (currentConversation) {
      if (currentConversation.type === 'group') {
        socket.emit('joinGroupRoom', currentConversation._id);
      } else {
        socket.emit('joinUserRoom', currentConversation._id);
      }

      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/messages/${currentConversation._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const decryptedMessages = await Promise.all(
            res.data.map(async (msg: Message) => {
              const decryptedContent = await decryptMessage(msg.content, userPrivateKey);
              return { ...msg, content: decryptedContent.toString() };
            })
          );
          setMessages(decryptedMessages);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };
      fetchMessages();

      socket.on('receiveMessage', async (message: Message) => {
        const decryptedContent = await decryptMessage(message.content, userPrivateKey);
        setMessages((prevMessages) => [...prevMessages, { ...message, content: decryptedContent.toString() }]);
      });
    }
  }, [currentConversation, userPrivateKey]);

  const handleSendMessage = async (content: string) => {
    try {
      const token = localStorage.getItem('token');
      let encryptedContent: string;

      if (currentConversation?.type === 'group') {
        const groupPublicKeys = currentConversation.members?.map((member) => member.publicKey) || [];
        encryptedContent = (await encryptMessage(content, groupPublicKeys)).toString();
      } else {
        const recipientPublicKey = currentConversation?.publicKey || '';
        encryptedContent = (await encryptMessage(content, [recipientPublicKey])).toString();
      }

      const message = {
        content: encryptedContent,
        conversationId: currentConversation?._id,
      };

      if (currentConversation?.type === 'group') {
        socket.emit('sendGroupMessage', { ...message, groupId: currentConversation._id });
      } else {
        socket.emit('sendUserMessage', { ...message, recipientId: currentConversation?._id });
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/messages`, message, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-4">Conversations</h2>
        <ul>
          {conversations.map((conversation) => (
            <li
              key={conversation._id}
              className={`cursor-pointer p-2 rounded-lg ${
                currentConversation?._id === conversation._id ? 'bg-gray-600' : 'bg-gray-700'
              }`}
              onClick={() => setCurrentConversation(conversation)}
            >
              {conversation.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 bg-gray-100 p-4">
        <ChatBox messages={messages} />
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
