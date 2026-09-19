import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApplyModal } from "./ApplyModal";
import { AppProvider } from "../store/AppContext";
import { seedAFHs, seedJobs } from "../data/seed";

const job = seedJobs[0];
const afh = seedAFHs.find((a) => a.id === job.afhId);

function renderModal(onClose = vi.fn()) {
  const utils = render(
    <MemoryRouter>
      <AppProvider>
        <ApplyModal job={job} afh={afh} onClose={onClose} />
      </AppProvider>
    </MemoryRouter>,
  );
  return { ...utils, onClose };
}

describe("ApplyModal", () => {
  beforeEach(() => localStorage.clear());

  it("locks the page behind it while open", () => {
    const { unmount } = renderModal();
    expect(document.body.style.overflow).toBe("hidden");
    unmount();
    expect(document.body.style.overflow).toBe("");
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalled();
  });

  it("keeps Tab inside the dialog", async () => {
    const user = userEvent.setup();
    renderModal();
    const dialog = screen.getByRole("dialog");

    // Cycle well past the number of controls in the panel.
    for (let i = 0; i < 10; i += 1) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("wraps backwards from the first control to the last", async () => {
    const user = userEvent.setup();
    renderModal();
    const dialog = screen.getByRole("dialog");
    await user.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("marks the message as optional", () => {
    renderModal();
    expect(screen.getByText(/optional/i)).toBeInTheDocument();
  });

  it("submits and closes", async () => {
    const user = userEvent.setup();
    const { onClose } = renderModal();
    await user.type(
      screen.getByLabelText(/message to the home/i),
      "Available for overnights",
    );
    await user.click(screen.getByRole("button", { name: /submit application/i }));
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });
});
