import { FC } from "react";
import { Message, MessageContainer, MessageListContainer } from "./styles/Messages.styled";

type MessageListProps = {
  messages: string[]
}

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <MessageListContainer>
      {messages.map((message, idx) => (
        <MessageContainer key={`message_${idx}`}>
          <Message>{JSON.parse(message).message}</Message>
        </MessageContainer>
      ))}
    </MessageListContainer>
  );
  
};


export default MessageList;