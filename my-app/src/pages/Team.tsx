import { ChakraProvider, theme } from "@chakra-ui/react";
import { Navbar } from "../components/navbar/Navbar";
import { Team } from "../components/team/Team";

export const TeamPage = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Team />
  </ChakraProvider>
);
