import { FC, useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import ChatForm from "./ChatForm";

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
    <div style={{ border: "1px solid black", backgroundColor: "whitesmoke" }}>
      current connection status = {connectionStatus}
      {messages.map((message, idx) => (
        <p key={`message_${idx}`}>{message}</p>
      ))}
      <button onClick={() => sendMessage()} disabled={readyState !== ReadyState.OPEN}>
        Click Me to send '{DEFAULT_MESSAGE}'
      </button>
      <ChatForm isChatEnabled={readyState === ReadyState.OPEN} sendMessage={sendMessage} />
    </div>
  );
};

export default Chat;
