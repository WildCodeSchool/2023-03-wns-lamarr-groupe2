import { render, screen } from "@testing-library/react";
import ConnexionPage from "../pages/homepage/Connexion/ConnexionPage";

test("renders learn react link", () => {
  render(<ConnexionPage />);
  const linkElement = screen.getByText(/Email/i);
  expect(linkElement).toBeInTheDocument();
});
