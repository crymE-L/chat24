import { ChakraProvider, theme } from "@chakra-ui/react";
import { Navbar } from "./components/navbar/Navbar";
import { Shell } from "./components/shell/Shell";
import { Auth0Provider } from "@auth0/auth0-react";


export const HomePage = () => {
  const domain = process.env.AUTH0_ISSUER_BASE_URL || "";
  const clientId = process.env.AUTH0_CLIENT_ID || "";

  return (
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
      >
        <Navbar />
        <Shell />
      </Auth0Provider>
    </ChakraProvider>
  );
};