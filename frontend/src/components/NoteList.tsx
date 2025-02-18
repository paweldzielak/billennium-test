import { FC } from "react";
import { Note as NoteType } from "../types";
import Note from "./Note";
import { NotesContainer } from "./styles/Notes.styled";

type NoteListProps = {
  notes: NoteType[];
  deleteNote: (id: NoteType['id']) => void;
};

const NoteList: FC<NoteListProps> = ({ notes, deleteNote }) => {
  return (
    <>
      {!!notes.length && <h2 style={{marginLeft: '10%'}}>Notes:</h2>}
      <NotesContainer>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </NotesContainer>
    </>
  );
};


export default NoteList;