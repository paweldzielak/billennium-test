import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "../ProtectedRoute";
import api from "../../api";

// Mock dependencies
vi.mock("jwt-decode");
vi.mock("../../api");

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
  });

  const protectedContent = "Protected Content";

  const renderProtectedRoute = () => {
    return render(
      <MemoryRouter>
        <ProtectedRoute>
          <div>{protectedContent}</div>
        </ProtectedRoute>
      </MemoryRouter>
    );
  };

  it("should redirect when no token exists", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    renderProtectedRoute();

    expect(screen.queryByText(protectedContent)).not.toBeInTheDocument();
  });

  it("should show content with valid token", async () => {
    localStorageMock.getItem.mockReturnValue("valid-token");
    vi.mocked(jwtDecode).mockReturnValue({ exp: Date.now() / 1000 + 1000 });

    renderProtectedRoute();

    expect(screen.getByText(protectedContent)).toBeInTheDocument();
  });

  it("should refresh token when expired", async () => {
    localStorageMock.getItem.mockReturnValueOnce("expired-token");
    localStorageMock.getItem.mockReturnValueOnce("refresh-token");
    vi.mocked(jwtDecode).mockReturnValue({ exp: Date.now() / 1000 - 1000 });
    vi.mocked(api.post).mockResolvedValueOnce({
      status: 200,
      data: { access: "new-token" },
    });

    renderProtectedRoute();
    expect(screen.queryByText(protectedContent)).not.toBeInTheDocument();

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith("/api/token/refresh/", { refresh: "refresh-token" });
    });
    expect(await screen.findByText(protectedContent)).toBeInTheDocument();
  });

  it("should handle refresh token failure", async () => {
    localStorageMock.getItem.mockReturnValueOnce("expired-token");
    vi.mocked(jwtDecode).mockReturnValue({ exp: Date.now() / 1000 - 1000 });
    vi.mocked(api.post).mockRejectedValueOnce(new Error("Refresh failed"));

    renderProtectedRoute();

    expect(screen.queryByText(protectedContent)).not.toBeInTheDocument();
  });
});
