import { FC, FormEventHandler, useEffect, useState } from "react";
import api from "../api";
import Note from "../components/Note";
import { NoteType } from "../types";

const Home: FC = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
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
  };

  const refreshNotes = ()  => {
    // FIXME: I think there is a better way to do this
    getNotes()
  }

  const deleteNote = (id: NoteType['id']) => {
        api
            .delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Note deleted!");
                else alert("Failed to delete note.");
                refreshNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote: FormEventHandler = async (event: React.FormEvent<Element>) => {
      event.preventDefault();
      api
        .post("/api/notes/", { content, title })
        .then((res) => {
          if (res.status === 201) alert("Note created!");
          else alert("Failed to make note.");
          
          refreshNotes();
        })
        .catch((err) => alert(err));
    };

  return (
    <div>
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
    </div>
  );
};

export default Home;
