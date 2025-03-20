import { useAuth0 } from "@auth0/auth0-react";

export const LoginScreen = () => {
    const { loginWithRedirect, logout } = useAuth0();

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => loginWithRedirect()}>Iniciar sesión</button>
            <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                Log Out
            </button>
        </div>
    )
};
