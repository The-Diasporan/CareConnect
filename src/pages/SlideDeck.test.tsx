import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import SlideDeck from "./SlideDeck";
import { AppProvider } from "../store/AppContext";
import { decks, getDeck, investorDeck, productDeck } from "../data/slideData";

function renderDeck(initialEntry = "/slides") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <AppProvider>
        <Routes>
          <Route path="/slides" element={<SlideDeck />} />
          <Route path="/" element={<p>Landing</p>} />
        </Routes>
      </AppProvider>
    </MemoryRouter>,
  );
}

/** The live slide counter, e.g. "3 / 10". */
function counter() {
  return screen.getByText(/^\d+ \/ \d+$/).textContent;
}

describe("slide data", () => {
  it("ships both decks with ten slides each", () => {
    expect(decks).toHaveLength(2);
    expect(investorDeck.slides).toHaveLength(10);
    expect(productDeck.slides).toHaveLength(10);
  });

  it("gives every slide a unique id, a visual cue, and speaker notes", () => {
    const ids = decks.flatMap((deck) => deck.slides.map((s) => s.id));
    expect(new Set(ids).size).toBe(ids.length);

    for (const deck of decks) {
      for (const slide of deck.slides) {
        expect(slide.title.length).toBeGreaterThan(0);
        expect(slide.visual.length).toBeGreaterThan(0);
        expect(slide.notes.length).toBeGreaterThan(0);
      }
    }
  });

  it("falls back to the investor deck for unknown ids", () => {
    expect(getDeck("product").id).toBe("product");
    expect(getDeck("nope").id).toBe("investor");
    expect(getDeck(null).id).toBe("investor");
  });
});

describe("SlideDeck", () => {
  beforeEach(() => localStorage.clear());

  it("opens on the first slide of the investor deck", () => {
    renderDeck();
    expect(counter()).toBe("1 / 10");
    expect(
      screen.getByText(investorDeck.slides[0].eyebrow),
    ).toBeInTheDocument();
  });

  it("deep links to a deck and slide from the query string", () => {
    renderDeck("/slides?deck=product&slide=5");
    expect(counter()).toBe("5 / 10");
    expect(screen.getByText(productDeck.slides[4].title)).toBeInTheDocument();
  });

  it("clamps an out-of-range slide number", () => {
    renderDeck("/slides?deck=investor&slide=99");
    expect(counter()).toBe("10 / 10");
  });

  it("advances and rewinds with the arrow keys", async () => {
    const user = userEvent.setup();
    renderDeck();

    await user.keyboard("{ArrowRight}");
    expect(counter()).toBe("2 / 10");

    await user.keyboard("{ArrowRight}");
    expect(counter()).toBe("3 / 10");

    await user.keyboard("{ArrowLeft}");
    expect(counter()).toBe("2 / 10");
  });

  it("stops at both ends of the deck", async () => {
    const user = userEvent.setup();
    renderDeck();

    await user.keyboard("{ArrowLeft}");
    expect(counter()).toBe("1 / 10");

    await user.keyboard("{End}");
    expect(counter()).toBe("10 / 10");

    await user.keyboard("{ArrowRight}");
    expect(counter()).toBe("10 / 10");

    await user.keyboard("{Home}");
    expect(counter()).toBe("1 / 10");
  });

  it("switches decks and resets to the first slide", async () => {
    const user = userEvent.setup();
    renderDeck("/slides?deck=investor&slide=6");
    expect(counter()).toBe("6 / 10");

    await user.click(screen.getByRole("tab", { name: productDeck.shortName }));

    expect(counter()).toBe("1 / 10");
    expect(screen.getByText(productDeck.slides[0].eyebrow)).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: productDeck.shortName }),
    ).toHaveAttribute("aria-selected", "true");
  });

  it("toggles presenter notes with N and shows the talk track", async () => {
    const user = userEvent.setup();
    renderDeck();

    expect(screen.queryByLabelText("Presenter notes")).not.toBeInTheDocument();

    await user.keyboard("{n}");
    const notes = screen.getByLabelText("Presenter notes");
    expect(
      within(notes).getByText(investorDeck.slides[0].notes[0]),
    ).toBeInTheDocument();
    expect(
      within(notes).getByText(investorDeck.slides[0].visual),
    ).toBeInTheDocument();

    await user.keyboard("{n}");
    expect(screen.queryByLabelText("Presenter notes")).not.toBeInTheDocument();
  });

  it("jumps to a slide from the picker grid", async () => {
    const user = userEvent.setup();
    renderDeck();

    await user.keyboard("{g}");
    const picker = screen.getByRole("dialog", { name: "Slide picker" });
    await user.click(
      within(picker).getByRole("button", {
        name: new RegExp(investorDeck.slides[7].title, "i"),
      }),
    );

    expect(
      screen.queryByRole("dialog", { name: "Slide picker" }),
    ).not.toBeInTheDocument();
    expect(counter()).toBe("8 / 10");
  });

  it("closes the picker on Escape without moving the slide", async () => {
    const user = userEvent.setup();
    renderDeck("/slides?slide=4");

    await user.keyboard("{g}");
    expect(
      screen.getByRole("dialog", { name: "Slide picker" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(
      screen.queryByRole("dialog", { name: "Slide picker" }),
    ).not.toBeInTheDocument();
    expect(counter()).toBe("4 / 10");
  });

  it("tracks progress for assistive technology", async () => {
    const user = userEvent.setup();
    renderDeck();

    const bar = screen.getByRole("progressbar", {
      name: "Presentation progress",
    });
    expect(bar).toHaveAttribute("aria-valuenow", "1");
    expect(bar).toHaveAttribute("aria-valuemax", "10");

    await user.keyboard("{ArrowRight}");
    expect(bar).toHaveAttribute("aria-valuenow", "2");
  });
});
