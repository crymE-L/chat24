import { ChakraProvider, theme, Button, Text} from "@chakra-ui/react";
import { Navbar } from "../components/navbar/Navbar";
import { Shell } from "../components/shell/Shell";

export const HomePage = () => {
  return (
      <ChakraProvider theme={theme}>
        <Navbar />
        <Shell />
      </ChakraProvider>
  );
};