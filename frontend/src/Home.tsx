import { ChakraProvider, theme } from "@chakra-ui/react";
import { Navbar } from "./components/navbar/Navbar";
import { Shell } from "./components/shell/Shell";
import { Auth0Provider } from "@auth0/auth0-react";
import { useUser } from "@auth0/nextjs-auth0/client";

export const HomePage = () => {
  const domain = process.env.AUTH0_ISSUER_BASE_URL || "";
  const clientId = process.env.AUTH0_CLIENT_ID || "";
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (user) {
  //   console.log(user);
  //   return (
  //     <div>
  //       Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
  //       <br></br>
  //       Your nickname is {user.nickname}.
  //     </div>
  //   );
  // }

  return (
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
      >
        <Navbar />
        <Shell />
        <a href="/api/auth/login">Login</a>
      </Auth0Provider>
    </ChakraProvider>
  );
};