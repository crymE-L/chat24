import { ChakraProvider, theme, Button, Text} from "@chakra-ui/react";
import { Navbar } from "../components/navbar/Navbar";
import { Chat } from "../components/chat/Chat";
import { Shell } from "../components/shell/Shell";
import { useAuth0, Auth0Provider } from '@auth0/auth0-react';

import { MouseEventHandler } from 'react'; // Import MouseEventHandler

export const HomePage = () => {
  const {
    loginWithPopup, 
    loginWithRedirect, 
    logout, 
    user, 
    isAuthenticated
  } = useAuth0();

  return (
    <Auth0Provider
      domain="dev-keh8ny0pweqvbfr7.us.auth0.com"
      clientId="LpXDHB73fUcj35ReDAQb0NwGBAuxRtwA"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <ChakraProvider theme={theme}>
        <Navbar />
        <Shell />
        <Button onClick={(event) => loginWithPopup()}>Login with Popup</Button>
        <Button onClick={(event) => loginWithRedirect()}>Login with Redirect</Button>
        <Button onClick={(event) => logout()}>Logout</Button>
        <Text>User is {isAuthenticated ? "Logged in" : "Not logged in"}</Text>
        <Text textAlign='start'>
          {JSON.stringify(user, null, 2)}
        </Text>
      </ChakraProvider>
    </Auth0Provider>
  );
};