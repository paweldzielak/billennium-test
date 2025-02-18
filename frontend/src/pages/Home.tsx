import { FC, FormEventHandler, useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import api from "../api";
import Note from "../components/Note";
import { Note as NoteType } from "../types";
import Chat from "../components/Chat";

const Home: FC = () => {
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

  const refreshNotes = () => {
    // FIXME: I think there is a better way to do this
    getNotes();
  };

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

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Chat />
      <div>
        {!!notes.length && <h2>Notes</h2>}
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text" id="title" name="title" required onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="content">Content:</label>
        <br />
        <textarea id="content" name="content" required value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        <br />
        <input type="submit" value="Submit"></input>
      </form>
    </>
  );
};

export default Home;
