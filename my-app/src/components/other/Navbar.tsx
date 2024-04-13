import {
    Flex,
    Box,
    HStack,
    Image,
    Spacer,
    Text
  } from '@chakra-ui/react';
import { Logo } from "./Logo";

export default function Navbar() {
    return (
        <Flex >
         <Box p='4' ml='20' dangerouslySetInnerHTML={{ __html: Logo }} /> {/* Render Logo as raw HTML */}
        <Spacer />
        <HStack spacing='8' mr='20'>
            <Box p='4' >
                <Text as='a' href='/prototype' _hover={{ textDecoration: "none" }}>Prototype</Text>
            </Box>
            <Box p='4'>
                <Text as='a' href='/about' _hover={{ textDecoration: "none" }}>About</Text>
            </Box>
            <Box p='4'>
                <Text as='a' href='/contact' _hover={{ textDecoration: "none" }}>Contact</Text>
            </Box>
        </HStack>
        </Flex>
    );
};

export { Navbar };