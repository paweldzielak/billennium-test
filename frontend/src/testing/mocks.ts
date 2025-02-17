import { Note } from "../types";

export const mockNote1: Note = {
  id: "1",
  title: "Test Note 1",
  content: "Content 1",
  created_at: "2025-02-16T00:00:00.000Z",
  date: "2025-02-16T00:00:00.000Z",
};

export const mockNote2: Note = {
  id: "2",
  title: "Test Note 2",
  content: "Content 2",
  created_at: "2025-02-16T00:00:00.000Z",
  date: "2025-02-16T00:00:00.000Z",
};

export const mockNotes: Note[] = [mockNote1, mockNote2];
