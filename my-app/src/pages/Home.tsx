import { ChakraProvider, theme } from "@chakra-ui/react";
import { Navbar } from "../components/navbar/Navbar";
import { Hero } from "../components/hero/Hero";
import { Divisor } from "../components/divisor/Divisor";

export const HomePage = () => (
  <ChakraProvider theme={theme}>
    <Navbar />
    <Hero />
  </ChakraProvider>
);
