import { FC, PropsWithChildren } from "react"
import { NavigationBarElement } from "./NavigationBarElement"

const NavigationBar: FC<PropsWithChildren> = () => {
    const navigations = ['dashboard', 'scores', 'challenges', 'notifications', 'settings'] as const

    return (
        <>
            <nav className="bg-primary-attention  w-screen  h-16 overflow-hidden lg:h-screen lg:w-24 lg:flex flex lg:flex-col items-center lg:justify-start justify-evenly gap-11  lg:pt-5">
                {navigations?.map((nav, index) => <NavigationBarElement key={index} link={nav} index={index} />)}
            </nav>
        </>
    )
}

export default NavigationBar
