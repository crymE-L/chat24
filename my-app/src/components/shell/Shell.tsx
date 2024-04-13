import {
    Box,
    Drawer,
    DrawerOverlay,
    Flex,
    HStack,
    useDisclosure,
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { FiMenu } from 'react-icons/fi'
  import { ColumnHeader, ColumnHeading, ColumnIconButton } from './Column'
  import { Main } from './Main'
  import { Sidebar } from './Sidebar'
  
  export const Shell = () => {
    const [sidebarIsScrolled, setSidebarIsScrolled] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <Flex width="100vw" height="100vh">
        <Main borderTopWidth="1px" width="75vw" height="90vh" py="12" px={{ base: '4', md: '8' }} />
        <Box
          borderTopWidth="1px"
          borderRightWidth="1px"
          width={{ md: '20rem', xl: '24rem' }}
          display={{ base: 'none', md: 'initial' }}
          overflowY="auto"
          onScroll={(x) => setSidebarIsScrolled(x.currentTarget.scrollTop > 32)}
        >
          <ColumnHeader shadow={sidebarIsScrolled ? 'base' : 'none'}>
            <HStack justify="space-between" width="full">
              <HStack spacing="3">
                <ColumnIconButton
                  onClick={onOpen}
                  aria-label="Open Navigation"
                  icon={<FiMenu />}
                  display={{ md: 'inline-flex', lg: 'none' }}
                />
                <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                  <DrawerOverlay />
                </Drawer>
                <ColumnHeading fontSize="md" pl="3">Dados Pessoais</ColumnHeading>
              </HStack>
            </HStack>
          </ColumnHeader>
          <Sidebar />
        </Box>
      </Flex>
    )
  }