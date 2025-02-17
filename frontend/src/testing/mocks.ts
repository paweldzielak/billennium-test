import { NoteType } from "../types";

export const mockNote1: NoteType = {
  id: "1",
  title: "Test Note 1",
  content: "Content 1",
  created_at: "2025-02-16T00:00:00.000Z",
  date: "2025-02-16T00:00:00.000Z",
};

export const mockNote2: NoteType = {
  id: "2",
  title: "Test Note 2",
  content: "Content 2",
  created_at: "2025-02-16T00:00:00.000Z",
  date: "2025-02-16T00:00:00.000Z",
};

export const mockNotes: NoteType[] = [mockNote1, mockNote2];
