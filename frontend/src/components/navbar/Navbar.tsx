import {
  Box,
  Button,
  ButtonGroup,
  Container,
  HStack,
  useBreakpointValue,
  useDisclosure,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { Logo } from './Logo'
import { MobileDrawer } from './MobileNavbar'
import { ToggleButton } from './ToggleButton'

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const mobileNavbar = useDisclosure()

  return (
    <Box as="section" height="9vh">
      <Box bg="bg.surface" position="relative" zIndex="tooltip">
        <Container minW="100%" px={isDesktop ? "4" : "0"}>
          <HStack justify="space-between" px={isDesktop ? "16" : "0"}>
            <a href="/">
              <Logo />
            </a>
            {isDesktop ? (
              <Flex pt="4" pb="4" >
                <Menu closeOnBlur >
                  <MenuButton as={Button} variant="ghost" >
                    <Avatar size="sm"/>
                  </MenuButton>
                  <MenuList py="2">
                    <ButtonGroup flexDirection="column">
                      <Button size="sm" variant="ghost">Terms Use</Button>
                      <Button size="sm" variant="ghost">Privacy Policy</Button>
                      <Button size="sm" variant="ghost">Sign in</Button>
                    </ButtonGroup>
                  </MenuList>
              </Menu>

              </Flex>
            ) : (
              <>
                <ToggleButton
                  onClick={mobileNavbar.onToggle}
                  isOpen={mobileNavbar.isOpen}
                  aria-label="Open Menu"
                />
                <MobileDrawer isOpen={mobileNavbar.isOpen} onClose={mobileNavbar.onClose} />
              </>
            )}
          </HStack>
        </Container>
      </Box>
    </Box>
  )
}