import { FC, PropsWithChildren } from "react"
import { UserContextProvider } from "./UserContext"

const AppProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <UserContextProvider>{children}</UserContextProvider>
    )
}

export default AppProvider