import { useState } from "react";
import { Link } from "wouter";

export function Navbar() {
    const [activePage, setActivePage] = useState('/sprintjs')

    return (
        <>
            {activePage == "/sprintjs" && <h1 className='animate mt-20 flex flex-wrap items-center justify-center gap-2 text-lg font-bold max-lg:text-center lg:text-5xl'>SprintJS</h1>}
            <div className="h-10 mt-6 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground mb-10 grid w-full grid-cols-2">
                <Link className={`${activePage == '/sprintjs' ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                    href="/sprintjs"
                    onClick={() => setActivePage('/sprintjs')}>
                    <h3>Home</h3>
                </Link>
                <Link href="/stats" className={`${activePage == '/stats' ? 'bg-background text-foreground' : ''} inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all  data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                    onClick={() => setActivePage('/stats')}
                >
                    <h3 className="bold">Estadisticas</h3>
                </Link>

            </div>
        </>
    )
}
