import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { mockNotes } from "../../testing/mocks";
import Home from "../Home";
import api from "../../api";

vi.mock("../../api/")
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});


describe("Home Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("fetches and displays notes on mount", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockNotes });

    render(<Home />);

    expect(api.get).toHaveBeenCalledWith("/api/notes/", expect.any(Object));
    await screen.findByText("Test Note 1");
    expect(screen.getByText("Test Note 1")).toBeInTheDocument();
    expect(screen.getByText("Test Note 2")).toBeInTheDocument();
  });

  it("handles form submission correctly", async () => {
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockNotes });
    vi.spyOn(api, "post").mockResolvedValue({ status: 201 });

    render(<Home />);

    const titleInput = screen.getByLabelText("Title:");
    const contentInput = screen.getByLabelText("Content:");

    await userEvent.type(titleInput, "New Note");
    await userEvent.type(contentInput, "New Content");
    await userEvent.click(screen.getByText("Submit"));

    expect(api.post).toHaveBeenCalledWith("/api/notes/", {
      title: "New Note",
      content: "New Content",
    });
    expect(api.get).toHaveBeenCalledWith("/api/notes/", expect.any(Object));
  });

  it("handles note deletion correctly", async () => {
    vi.spyOn(api, "delete").mockResolvedValueOnce({ status: 204 });
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockNotes });

    render(<Home />);

    await screen.findByText("Test Note 1");
    const deleteButtons = await screen.findAllByText("Delete");
    await userEvent.click(deleteButtons[0]);

    expect(api.delete).toHaveBeenCalledWith("/api/notes/delete/1/");
  });

  it("handles note deletion failure correctly", async () => {
    vi.spyOn(api, "delete").mockRejectedValueOnce(new Error("Failed to delete note"));
    vi.spyOn(api, "get").mockResolvedValueOnce({ data: mockNotes });

    render(<Home />);

    await screen.findByText("Test Note 1");
    const deleteButtons = await screen.findAllByText("Delete");
    await userEvent.click(deleteButtons[0]);

    expect(api.delete).toHaveBeenCalledWith("/api/notes/delete/1/");
    const toastText = await screen.findByText('Note deleted!');
    expect(toastText).toBeInTheDocument();
  
    setTimeout(() => {
      expect(screen.getByText("Note deleted!")).toBeInTheDocument();
    }, 500);
  });
});
