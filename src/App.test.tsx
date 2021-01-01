import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { App } from "./App";



describe("App component", () => {
    beforeEach(()=> render(<App />))
  it("renders Loading screen", () => {
    screen.getByText(/LOADING/);
  });
  it("renders button", () => {
    screen.debug();
    const btn = screen.getByRole("button");
    expect(btn).not.toBeNull();
  });
});

describe("App component part 2", () => {
  it("BIG TEST", async () => {
    render(<App />);
    const firstTitle = await waitFor(() => screen.getByText("FIRST TITLE"));
    expect(firstTitle).toBeInTheDocument();
    const btnToggleFirstTitle = screen.getByText("TOGGLE FIRST TITLE");
    expect(btnToggleFirstTitle).toBeInTheDocument();
    fireEvent.click(btnToggleFirstTitle);
    expect(firstTitle).not.toBeInTheDocument();
    const btnToggleImg = screen.getByText("TOGGLE IMG");
    expect(btnToggleImg).toBeInTheDocument();
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt");
    expect(image).toBeInTheDocument();
    const userinfo = screen.queryByText(/USERS NAME/);
    expect(userinfo).not.toBeInTheDocument();
    const firstInput = screen.getByPlaceholderText("First Name");
    const lastInput = screen.getByPlaceholderText("Last Name");
    const submitButton = screen.getByText(/CONFIRM/i);
    fireEvent.change(firstInput, {
      target: { value: "Jānis" },
    });
    fireEvent.change(lastInput, {
      target: { value: "Sensejs" },
    });
    fireEvent.click(submitButton);
    const somewhere1 = screen.getByText(/sensej/i);
    expect(somewhere1).toBeInTheDocument();
    screen.debug();
    fireEvent.change(firstInput, {
      target: { value: "" },
    });
    fireEvent.change(lastInput, {
      target: { value: "Garais" },
    });
    fireEvent.click(submitButton);
    const somewhere2 = screen.queryByText(/Garais/i);
    expect(somewhere2).not.toBeInTheDocument();
  });
});
