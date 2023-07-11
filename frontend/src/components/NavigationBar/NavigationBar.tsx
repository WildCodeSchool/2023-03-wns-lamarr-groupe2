import { FC, PropsWithChildren } from "react"
import { NavigationBarElement } from "./NavigationBarElement"

const NavigationBar: FC<PropsWithChildren> = () => {
    const navigations = ['dashboard', 'scores', 'challenges', 'notifications', 'settings'] as const

    return (
        <nav className="bg-primary-attention  overflow-hidden h-screen w-24 flex flex-col items-center  gap-11  pt-5">
            {navigations?.map((nav, index) => <NavigationBarElement key={index} link={nav} />)}
        </nav>
    )
}

export default NavigationBar
