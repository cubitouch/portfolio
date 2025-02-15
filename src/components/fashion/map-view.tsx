import CloseIcon from "@mui/icons-material/Close";
import DirectionsIcon from "@mui/icons-material/Directions";
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  SwipeableDrawer,
  Typography,
  useTheme,
} from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import CustomMarkerIcon from "../../assets/logo-monogram.svg?react"; // SVG as React component

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
  const TABLE_ID = "tblFbW11rhW442gdt";
  const URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`;

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

    return data.records
      .map(
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
      )
      .filter((s: Shop) => s.active) as Shop[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [] as Shop[];
  }
};

const MapView = () => {
  const theme = useTheme();
  // data fetching
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop>();
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (!hasLoaded.current) {
      fetchShops().then(setShops);
      hasLoaded.current = true;
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

  const { MapContainer, TileLayer, Marker } = LeafletComponents;
  const customIcon = (active: boolean) =>
    leaflet.divIcon({
      className: "custom-marker",
      html: renderToString(
        <Box
          component="div"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: active
              ? theme.palette.secondary.light
              : theme.palette.secondary.main,
            border: `2px solid ${theme.palette.primary.main}`,
            padding: 4,
          }}
        >
          <CustomMarkerIcon />
        </Box>
      ),
      iconSize: [16, 16],
      iconAnchor: [10, 16], // Adjust for alignment
      popupAnchor: [0, -16],
    });
  const parisBounds: [[number, number], [number, number]] = [
    [48.8064, 2.2241], // Southwest corner (near Issy-les-Moulineaux)
    [48.9021, 2.4699], // Northeast corner (near Pantin)
  ];
  return (
    <>
      {/* TODO: add boundaries (`maxBounds`) */}
      <MapContainer
        center={[48.8566, 2.3522]}
        zoom={12}
        style={{ height: "100vh", width: "100%" }}
        maxBounds={parisBounds} // Restrict map bounds
        maxBoundsViscosity={1.0} // Hard limit on panning
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='© <a href="https://carto.com/attributions">CARTO</a>'
        />
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            position={[shop.lat, shop.lon]}
            icon={customIcon(shop === selectedShop)}
            eventHandlers={{
              click: () => {
                setSelectedShop(shop);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      <SwipeableDrawer
        open={!!selectedShop}
        onClose={() => setSelectedShop(undefined)}
        onOpen={() => setSelectedShop(selectedShop)}
        anchor="bottom"
        PaperProps={{ sx: { background: theme.palette.secondary.main } }}
      >
        <List sx={{ paddingTop: 0 }}>
          {selectedShop?.picture && (
            <ListItem
              sx={{ display: "flex", justifyContent: "center" }}
              disablePadding
            >
              <Box
                component="img"
                src={selectedShop.picture}
                alt={selectedShop.name}
                sx={{
                  width: "100%",
                  height: 200,
                  objectFit: "cover",
                }}
              ></Box>
              <Fab
                color="primary"
                size="medium"
                aria-label="close"
                sx={{
                  position: "absolute",
                  top: theme.spacing(2),
                  right: theme.spacing(2),
                  opacity: 0.8,
                }}
                onClick={() => setSelectedShop(undefined)}
              >
                <CloseIcon />
              </Fab>
            </ListItem>
          )}
          <ListItem>
            <ListItemText>
              <Typography variant="h3">{selectedShop?.name}</Typography>
            </ListItemText>
          </ListItem>
          {selectedShop?.address && (
            <ListItemButton
              onClick={() => {
                window.open(
                  `http://maps.google.com/maps?daddr=${selectedShop.lat},${selectedShop.lon}`,
                  "_blank"
                );
              }}
            >
              <ListItemText>{selectedShop.address}</ListItemText>
              <ListItemSecondaryAction>
                <DirectionsIcon color="primary" />
              </ListItemSecondaryAction>
            </ListItemButton>
          )}
        </List>
      </SwipeableDrawer>
    </>
  );
};

export default MapView;
