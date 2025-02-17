import { Github, ScrollText } from "lucide-react";

export function Footer() {


    return (
        <div className="mt-20">
            <hr />
            <div className="py-6 bg-background flex items-center gap-10 justify-end">
                <a href="https://en.wikipedia.org/wiki/MIT_License" className='flex items-center gap-2' target="_blank">
                    <ScrollText />
                    <p> © MIT licence</p>
                </a>
                <a href="https://github.com/xStranged1" className='flex items-center gap-2 mr-8' target="_blank">
                    <Github />
                    <p> xStranged</p>
                </a>
            </div>
        </div>

    )
}
