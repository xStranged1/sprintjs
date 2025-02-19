import { Link, useLocation } from "wouter";
import { Title } from "./Title";
import iconRunningBlue from "@/assets/iconRunningBlue.png"

export function Navbar() {

    const [location] = useLocation();

    return (
        <div className="mt-20">
            {(location == "/sprintjs/" || location == "/sprintjs") && (
                <div className="">
                    <img src={iconRunningBlue} className="w-24 justify-self-center mb-2" />
                    <Title title="SprintJS" />
                </div>

            )}
            {location == "/stats" && <Title title="Estadisticas" />}
            {location == "/calculate-pace" && (
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
                <Link href="/stats" className={`${location == '/stats' ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}>
                    <h3 className="bold">Estadisticas</h3>
                </Link>
                <Link href="/calculate-pace" className={`${location == '/calculate-pace' ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}>
                    <h3 className="bold">Calcular ritmo</h3>
                </Link>
            </div>
        </div>
    )
}
