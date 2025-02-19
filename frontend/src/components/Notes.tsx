import { FormButton, FormInput, FormTextArea, StyledForm } from "../components/styles/Form.styled";
import NoteList from "../components/NoteList";
import { FC, useEffect, useState, FormEventHandler, useCallback } from "react";
import { Note as NoteType } from "../types";
import api from "../api";
import toast from "react-hot-toast";

const Notes: FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const getNotes = useCallback(() => {
    api
      .get("/api/notes/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
      });
  }, []);

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const deleteNote = (id: NoteType["id"]) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) toast.success("Note deleted!");
        else toast.error("Failed to delete note.");
        refreshNotes();
      })
      .catch((error) => toast.error(error.message ?? "something went wrong"));
  };

  const createNote: FormEventHandler = async (event: React.FormEvent<Element>) => {
    event.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) toast.success("Note created!");
        else toast.error("Failed to make note.");
        refreshNotes();
      })
      .catch((error) => toast.error(error.message ?? "something went wrong"));
  };

  const refreshNotes = () => {
    // FIXME: I think there is a better way to do this
    getNotes();
  };

  return (
    <>
      <NoteList deleteNote={deleteNote} notes={notes} />
      <h2 style={{ marginLeft: "10%" }}>Create a Note</h2>
      <StyledForm onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <FormInput type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="content">Content:</label>
        <br />
        <FormTextArea
          $resizable
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></FormTextArea>
        <br />
        <FormButton type="submit" value="Submit">
          Create
        </FormButton>
      </StyledForm>
    </>
  );
};

export default Notes;
