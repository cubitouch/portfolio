import { Box, useTheme } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import CustomMarkerIcon from "../assets/logo-monogram.svg?react"; // SVG as React component

interface Record {
  id: string;
  fields: {
    name: string;
    address: string;
    lat: number;
    lon: number;
    picture: [{ thumbnails: { large: { url: string } } }];
    active: boolean;
    categories: string[];
  };
}
interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  picture: string;
  active: boolean;
  categories: string[];
}
export const fetchShops = async () => {
  const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
  const BASE_ID = "appY0KHiZkP8q5JXL";
  const TABLE_NAME = "tblFbW11rhW442gdt";
  const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.statusText}`);
    }

    const data = await response.json();

    return data.records.map(
      (record: Record) =>
        ({
          id: record.id,
          name: record.fields.name,
          address: record.fields.address,
          lat: record.fields.lat,
          lon: record.fields.lon,
          picture: record.fields.picture?.[0]?.thumbnails.large.url,
          active: record.fields.active,
          categories: record.fields.categories,
        } as Shop)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

const MapView = () => {
  const theme = useTheme();
  // data fetching
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    if (!shops.length) {
      fetchShops().then(setShops);
    }
  }, [shops]);

  console.log("shops", shops);

  // map client setup
  const [leaflet, setLeaflet] = useState<any>(null);
  const [LeafletComponents, setLeafletComponents] = useState<any>(null);
  useEffect(() => {
    import("leaflet").then((L) => {
      setLeaflet(L);
    });
    import("react-leaflet").then((module) => {
      setLeafletComponents(module);
    });
  }, []);
  if (!leaflet || !LeafletComponents) return <p>Loading map...</p>;

  const { MapContainer, TileLayer, Marker, Popup } = LeafletComponents;
  const customIcon = leaflet.divIcon({
    className: "custom-marker",
    html: renderToString(
      <Box
        component="div"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: theme.palette.secondary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          padding: 8,
        }}
      >
        <CustomMarkerIcon />
      </Box>
    ),
    iconSize: [24, 24],
    iconAnchor: [18, 24], // Adjust for alignment
    popupAnchor: [0, -24],
  });

  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {shops.map((shop) => (
        <Marker key={shop.id} position={[shop.lat, shop.lon]} icon={customIcon}>
          <Popup>
            <strong>{shop.name}</strong>
            <br />
            {shop.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
