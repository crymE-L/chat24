import { ChakraProvider, theme } from "@chakra-ui/react";
import { Navbar } from "../components/navbar/Navbar";
import { Chat } from "../components/chat/Chat";
import { Shell } from "../components/shell/Shell";

export const HomePage = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Shell />
  </ChakraProvider>
);
