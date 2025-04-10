import { FC } from "react";
import { Note as NoteType } from "../types";
import "../styles/Note.css";

type NoteProps = {
  note: NoteType;
  onDelete: (id: NoteType['id']) => void;
};

const Note : FC<NoteProps> = ({ note, onDelete }) => {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete
      </button>
    </div>
  );
}

export default Note;
