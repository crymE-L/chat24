import React, { useState, useEffect } from 'react';
import { Link, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { personalInfo } from './data';
import { hospitals } from './hospitals';
import { pharmacies } from './pharmacies';

interface SidebarProps {
  setLocation: React.Dispatch<React.SetStateAction<any>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ setLocation }) => {
  const [geoInfo, setGeoInfo] = useState<any>({});

  useEffect(() => {
    const getVisitorIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org');
        const ipAddress = await response.text();
        const locationResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const data = await locationResponse.json();
        setGeoInfo(data);
        setLocation(data);
      } catch (error) {
        console.error('Failed to fetch location:', error);
      }
    };

    getVisitorIP();
  }, [setLocation]);

  return (
    <Stack spacing={{ base: '1px', lg: '1' }} px={{ lg: '3' }}>
      {personalInfo.map((info) => (
        <Link
          key={info.id}
          _hover={{ textDecoration: 'none', bg: mode('gray.100', 'gray.700') }}
          _activeLink={{ bg: 'gray.700', color: 'white' }}
          borderRadius={{ lg: 'lg' }}
        >
          <Stack
            spacing="1"
            py={{ base: '3', lg: '2' }}
            px={{ base: '3.5', lg: '3' }}
            fontSize="sm"
            lineHeight="1.25rem"
          >
            <Text fontWeight="bold">{info.title}</Text>
            {info.title === 'Hospitais Próximos:' ? (
              <>
                {hospitals.map((hospital) => (
                  <Text key={hospital.id} opacity={0.8}>
                    <Link href={hospital.website} target="_blank" rel="noopener noreferrer">
                      {hospital.name}
                    </Link>
                    <br />
                    <span>{hospital.address}</span>
                    <br />
                    <span>{hospital.schedule}</span>
                  </Text>
                ))}
              </>
            ) : info.title === 'Farmácias Próximas:' ? (
              <>
                {pharmacies.map((pharmacy) => (
                  <Text key={pharmacy.id} opacity={0.8}>
                    <Link href={pharmacy.website} target="_blank" rel="noopener noreferrer">
                      {pharmacy.name}
                    </Link>
                    <br />
                    <span>{pharmacy.address}</span>
                    <br />
                    <span>{pharmacy.schedule}</span>
                  </Text>
                ))}
              </>
            ) : info.title === 'Localização Atual:' && geoInfo.city ? (
              <Text opacity={0.8}>{geoInfo.city}</Text>
            ) : (
              <Text opacity={0.8}>{info.content}</Text>
            )}
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};
