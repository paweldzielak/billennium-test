import styled from "styled-components"

type StyledFormProps = {
  $minWidth?: string
}

export const StyledForm = styled.form<StyledFormProps>`
  min-width: ${(props) => props.$minWidth || '400px'};
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
`

type FormTextAreaProps = {
  $resizable: boolean
}

export const FormTextArea = styled.textarea<FormTextAreaProps>`
  width: 90%;
  max-width: 400px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export const FormInput = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`

export const FormButton = styled.button`
  padding: 10px;
  margin: 20px 0;
  background-color: #405cf5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;
  min-width: 120px;

   &:hover {
    background-color: paleturquoise;
    color: #3c3c3c;
  }
`

