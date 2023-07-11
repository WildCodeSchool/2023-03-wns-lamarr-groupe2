import { FC, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export type NavigationBarElementProps = {
    link: string,
    index: number
};

export const NavigationBarElement: FC<NavigationBarElementProps> = ({ link, index }) => {
    const isCompany = false // import userContext
    const navigate = useNavigate();
    const location = useLocation();
    const pathName = location.pathname.slice(1);
    const activeRoute = pathName === link

    const [url, setUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        const importImage = async () => {
            try {
                const image = await import(`../../assets/icons/navigation/${link}-${activeRoute ? 'light' : 'dark'}.svg`);
                setUrl(image.default);
            } catch (error) {
                console.error(error);
            }
        };

        importImage();
    }, [link, activeRoute]);

    return url ? <img src={url} alt={link} onClick={() => navigate(isCompany ? `/company/${link}` : `/${link}`)} className={`h-9 w-9 ${index === 4 && 'hidden'} lg:block`} /> : null;
};
