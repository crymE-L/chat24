import React, { useState, useEffect } from 'react';
import { Link, Stack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import { personalInfo } from './data';

interface SidebarProps {
  setLocation: React.Dispatch<React.SetStateAction<any>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ setLocation }) => {
  const [geoInfo, setGeoInfo] = useState<any>({});
  const [hospitalPlaces, setHospitalPlaces] = useState<any[]>([]);
  const [pharmacyPlaces, setPharmacyPlaces] = useState<any[]>([]);

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

  async function getHospitals() {
    try {
      const response = await fetch(`http://localhost:8000/hospitals/`);
      const data = await response.json();
      console.log('Hospitals:', data.results);
      setHospitalPlaces(data.results);
    } catch (error) {
      console.error('Failed to fetch hospitals:', error);
    }
  };  
  
  async function getPharmacies() {
    try {
      const response = await fetch(`http://localhost:8000/pharmacies/`);
      const data = await response.json();
      console.log('Pharmacies:', data.results);
      setPharmacyPlaces(data.results);
    } catch (error) {
      console.error('Failed to fetch pharmacies:', error);
    }
  };  
  
  useEffect(() => {
    getHospitals();
    getPharmacies();
  }, []);

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
                {hospitalPlaces && hospitalPlaces.map((place) => (
                  <Text key={place.id} opacity={0.8}>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${encodeURIComponent(place.place_id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {place.name}
                    </Link>
                    <br />
                    <span>{place.vicinity}</span>
                    <br />
                    {place.opening_hours ? (
                      <span>
                        {place.opening_hours.open_now ? 'Open now' : 'Closed now'}
                      </span>
                    ) : (
                      <span>Schedule not known</span>
                    )}
                  </Text>
                ))}
            </>
            ) : info.title === 'Farmácias Próximas:' ? (
              <>
                {pharmacyPlaces && pharmacyPlaces.map((place) => (
                  <Text key={place.id} opacity={0.8}>
                    <Link
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${encodeURIComponent(place.place_id)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {place.name}
                    </Link>
                    <br />
                    <span>{place.vicinity}</span>
                    <br />
                    {place.opening_hours ? (
                      <span>
                        {place.opening_hours.open_now ? 'Open now' : 'Closed now'}
                      </span>
                    ) : (
                      <span>Schedule not known</span>
                    )}
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
