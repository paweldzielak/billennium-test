import { FC, useState } from "react";
import { FormButton, FormInput, StyledForm } from "./styles/Form.styled";

type ChatFormProps = {
  sendMessage: (message?: string) => void;
  isChatEnabled: boolean;
};

const ChatForm: FC<ChatFormProps> = ({ sendMessage, isChatEnabled }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmitChatNewMessage = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <StyledForm onSubmit={handleSubmitChatNewMessage} $minWidth="400px">
      <h4>Write something to everyone!</h4>
      <FormInput
        className="form-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        disabled={!isChatEnabled}
      />
      <FormButton type="submit" disabled={!isChatEnabled}>
        Send message
      </FormButton>
    </StyledForm>
  );
};

export default ChatForm;
