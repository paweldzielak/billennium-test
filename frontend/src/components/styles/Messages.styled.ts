import styled from "styled-components";

export const MessagesContainer = styled.div`
  border-radius: 1rem;
  padding: 0.5rem;
  min-width: 400px;
  background-color: #f8f8f8;
  flex-wrap: wrap;

  button {
    margin-left: 270px;
    margin-right: 0px;
  }
`

export const MessageListContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 400px;
  border-radius: 3px solid black;
  border-radius: 0.75rem;
  margin: 1rem;
  padding: 0.3rem;
  background-color: white;
  max-height: 250px;
  min-height: 150px;
  overflow-y: auto;
  padding: 10px;
  width: 300px;
`


export const MessageContainer = styled.div`
  margin-left: 10px;
  min-height: 30px;
  padding: 0.2rem;
`

export const Message = styled.span`
  width: fit-content;
  background-color: #e5e4ea;
  border-radius: 0.25rem;
  line-height: 30px;
  padding: 0.4rem 0.7rem;
`
