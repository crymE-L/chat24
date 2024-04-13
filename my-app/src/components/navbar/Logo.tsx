import { chakra, HTMLChakraProps } from '@chakra-ui/react'
import logoPNG from '../../images/logo.png' // Assuming your PNG logo is located in the same directory

export const Logo = (props: HTMLChakraProps<'img'>) => (
  <chakra.img
    src={logoPNG} // Set the source to your PNG logo
    alt="Logo" // Provide an alt text for accessibility
    height="auto"
    width="40"
    {...props}
  />
)
