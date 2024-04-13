import { screen } from "@testing-library/react";
import { render } from "./test-utils";
import { HomePage } from "./pages/Home";

test("renders learn react link", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/learn chakra/i);
  expect(linkElement).toBeInTheDocument();
});
