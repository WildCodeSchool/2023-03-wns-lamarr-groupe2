import ProfilePicture from "./ProfilePicture"

export const HeaderBar = () => {
    const isCompany = false // from userContext

    const HeaderElement = ({ label, value }: { label: string, value: string | number }) => (
        <div className="hidden lg:flex items-center">
            <p className="hidden  lg:block">{label}</p>
            <span className="font-bold text-[1.1em] pl-1">{value}</span>
        </div>
    );

    return (
        <header className="border-b-1 border-tertiary-dark hidden  lg:flex font-titles justify-between items-center px-2">
            <h1 className="font-bold text-[3em]">ECHOES OF FUTURE</h1>
            <HeaderElement label='Challenges en cours : ' value={3} />
            <HeaderElement label={isCompany ? 'Mes Employés : ' : 'Points : '} value={186} />
            <ProfilePicture size="mediumPic" onClick={() => console.log('click')} />
        </header>
    )
}
