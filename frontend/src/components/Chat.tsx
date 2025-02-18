import { FC, useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ChatForm from "./ChatForm";
import MessageList from "./MessageList";
import { ChatContainer } from "./styles/Chat.styled";
import { MessagesContainer } from "./styles/Messages.styled";

const Chat: FC = () => {
  const DEFAULT_MESSAGE = "Hello";

  const { lastMessage, readyState, sendMessage: sendMessageRaw } = useWebSocket(`${import.meta.env.VITE_API_URL}/ws/chat/lobby/`);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (lastMessage?.data) setMessages((prev) => [...prev, lastMessage.data]);
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const sendMessage = useCallback((message: string = DEFAULT_MESSAGE) => sendMessageRaw(JSON.stringify({ message })), [sendMessageRaw]);

  return (
    <ChatContainer>
      <ChatForm isChatEnabled={readyState === ReadyState.OPEN} sendMessage={sendMessage} />
      <MessagesContainer>
        current connection status = {connectionStatus}
        <MessageList messages={messages} />
      </MessagesContainer>
    </ChatContainer>
  );
};

export default Chat;
