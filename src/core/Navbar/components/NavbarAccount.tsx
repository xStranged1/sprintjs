import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { useAuth0, User } from "@auth0/auth0-react";
import { LogOut, MapPin, Settings, SquareUser, User as UserIcon } from "lucide-react";

export const NavBarAccount = ({ user }: { user?: User }) => {
    const { loginWithRedirect, logout } = useAuth0();
    const redirectLogOut = `${window.location.origin}/sprintjs`
    if (!user) {
        return (
            <div className="justify-self-end mr-16 ">
                <Button variant='outline' size='lg'
                    className="font-semibold"
                    onClick={() => loginWithRedirect()}>
                    Iniciar sesión
                </Button>
            </div>
        )
    }

    return (
        <div className="flex justify-self-end items-center mr-16 ">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="cursor-pointer">
                        <h2 className="font-semibold mr-4">{user.name}</h2>
                        {user.picture ? (<img src={user.picture} alt="user" className="w-8 rounded-full" />) : <SquareUser size={32} />}
                    </MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem
                            onClick={() => console.log(user)}
                            className="cursor-pointer"
                        >
                            <div className="flex flex-row justify-between items-center gap-2 ">
                                <MenubarShortcut>
                                    <UserIcon size={20} />
                                </MenubarShortcut>
                                Tu perfil
                            </div>
                        </MenubarItem>
                        <MenubarItem
                            className="cursor-pointer"
                        >
                            <div className="flex flex-row justify-between items-center gap-2 ">
                                <MenubarShortcut>
                                    <MapPin size={20} />
                                </MenubarShortcut>
                                Tus circuitos
                            </div>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem
                            className="cursor-pointer"
                        >
                            <div className="flex flex-row justify-between items-center gap-2 ">
                                <MenubarShortcut>
                                    <Settings size={20} />
                                </MenubarShortcut>
                                Configuracion
                            </div>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => logout({ logoutParams: { returnTo: redirectLogOut } })}
                            className="cursor-pointer"
                        >
                            <div className="flex flex-row justify-between items-center gap-2">
                                <MenubarShortcut>
                                    <LogOut size={20} />
                                </MenubarShortcut>
                                Cerrar sesión
                            </div>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
        </div>
    )
}