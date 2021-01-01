import React from "react";
import { render } from "@testing-library/react";
import { FullName } from "./FullName";

describe("<FullName component>", () => {
  it("renders without crashing", () => {
    render(<FullName />);
  });
  it("props work", () => {
    const fullName = render(<FullName text="Test Name" />);
    // Checks ir there is a text matching 'Test Name' rendered
    const element1 = fullName.getByText('USERS NAME: Test Name');
    expect(element1).toBeTruthy();
    const element2 = fullName.queryByText(/TestNAME/);
    expect(element2).toBeFalsy();
  });
  it("must be dumb", () => {
    const { getByText } = render(<FullName text="DONT SHOW THIS PLEASE" />);
    getByText(/DONT SHOW THIS PLEASE/);
  });
});
