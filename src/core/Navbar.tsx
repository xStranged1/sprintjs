import { Link, useLocation } from "wouter";
import { Title } from "./Title";
import iconRunningBlue from "@/assets/iconRunningBlue.png"
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { VITE_AUTH0_DOMAIN } from "@/config/config";
import { useGetAccessToken } from "@/services/api";

export function Navbar() {

    const [location] = useLocation();
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const getAccessToken = useGetAccessToken();

    useEffect(() => {
        const getUserMetadata = async () => {
            try {
                const accessToken = await getAccessToken()
                const userDetailsByIdUrl = `https://${VITE_AUTH0_DOMAIN}/api/v2/users/${user?.sub}`;
                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
            } catch (e: any) {
                console.log("error in getUserMetadata");
                console.log(e.message);
            }
        };
        console.log("user de auth0");
        console.log(user);

        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    return (
        <div className="mt-20">
            {(location == "/sprintjs/" || location == "/sprintjs") && (
                <div className="">
                    <img src={iconRunningBlue} className="w-24 justify-self-center mb-2" />
                    <Title title="SprintJS" />
                </div>

            )}
            {location == "/sprintjs/stats" && <Title title="Estadisticas" />}
            {location == "/sprintjs/calculate-pace" && (
                <>
                    <Title title="Calcular ritmo" />
                    <p className="mt-2 text-lg md:text-base text-foreground justify-self-center font-semibold">Obtener media de ritmo en mm:ss/km</p>
                </>
            )}
            <div className="h-10 mt-6 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-10 grid w-full grid-cols-3">
                <Link className={`${(location == '/sprintjs/' || location == '/sprintjs') ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                    href="/sprintjs/"    >
                    <h3>Home</h3>
                </Link>
                <Link href="/sprintjs/stats" className={`${location == '/sprintjs/stats' ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}>
                    <h3 className="bold">Estadisticas</h3>
                </Link>
                <Link href="/sprintjs/calculate-pace" className={`${location == '/sprintjs/calculate-pace' ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}>
                    <h3 className="bold">Calcular ritmo</h3>
                </Link>
            </div>
        </div>
    )
}
