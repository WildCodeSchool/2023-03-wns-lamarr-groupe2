import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import useUserContext, { UserContextProvider } from "../features/contexts/UserContext";
import ConnexionPage from "../pages/homepage/Connexion/ConnexionPage";



test("Check Authentication Title", async () => {
    render(
        <BrowserRouter>
            <UserContextProvider>
                <ConnexionPage />
            </UserContextProvider>
        </BrowserRouter>
    );

    // Authentication Title
    const emailText = screen.getByText(/s'identifier/i);
    expect(emailText).toBeInTheDocument();

    // Email Input
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput.value).toBe("test@example.com");

    // Password Input
    const passwordInput = screen.getByLabelText(/mot de passe/i) as HTMLInputElement;
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput.value).toBe("password123");



});






