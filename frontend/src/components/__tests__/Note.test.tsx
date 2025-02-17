import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Note from "../Note";
import { NoteType } from "../../types";

describe("Note", () => {
  const mockNote: NoteType = {
    id: "1",
    title: "Test Title",
    content: "Test Content",
    created_at: "2025-02-16T00:00:00.000Z",
    date: "2025-02-16T00:00:00.000Z",
  };

  const mockOnDelete = vi.fn();

  const renderNote = () => render(<Note note={mockNote} onDelete={mockOnDelete} />);

  it("renders note correctly", () => {
    renderNote();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders formatted date correctly", () => {
    renderNote();
    const formattedDate = new Date(mockNote.created_at).toLocaleDateString("en-US");
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("calls onDelete with correct ID when delete button clicked", () => {
    renderNote();
    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledWith(mockNote.id);
  });
});
