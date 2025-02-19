import { Box, useTheme, type Theme } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import CustomMarkerIcon from "../../assets/logo-monogram.svg?react"; // SVG as React component
import { FancyLoader } from "../fancy-loader";
import { useSelectableShops } from "./data";
import { ShopInfo } from "./shop-info";

const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    };

    const error = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { location, error };
};
const userMarkerCSS = (theme: Theme) => `
  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.6; }
    100% { transform: scale(1); opacity: 1; }
  }
  .user-marker {
    background: rgb(from ${theme.palette.secondary.light} r g b / 80%);
    border-radius: 50%;
    width: 16px;
    height: 16px;
    display: block;
    position: relative;
    border: 2px solid ${theme.palette.primary.main};
  }
  .user-marker::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background: rgb(from ${theme.palette.secondary.main} r g b / 30%);
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }
`;
const MapView = () => {
  const theme = useTheme();

  // my location
  const { location } = useUserLocation();

  // data fetching
  const [shops, selectedShop, selectShop, unselectShops] =
    useSelectableShops(location);
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
  if (!leaflet || !LeafletComponents || !shops.length)
    return (
      <Box
        sx={{
          color: theme.palette.primary.contrastText,
          minHeight: `calc(100dvh)`,
          background: theme.palette.primary.main,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
      >
        <FancyLoader />
      </Box>
    );

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
      iconAnchor: [10, 16],
      popupAnchor: [0, -16],
    });

  const userIcon = leaflet.divIcon({
    className: "custom-user-marker",
    html: `<div class="user-marker"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
  const parisBounds: [[number, number], [number, number]] = [
    [48.8064, 2.2241], // Southwest corner (near Issy-les-Moulineaux)
    [48.9021, 2.4699], // Northeast corner (near Pantin)
  ];
  return (
    <>
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
              click: () => selectShop(shop),
            }}
          />
        ))}
        {location && (
          <>
            <style>{userMarkerCSS(theme)}</style>
            <Marker position={[location.lat, location.lon]} icon={userIcon} />
          </>
        )}
      </MapContainer>
      <ShopInfo shop={selectedShop} onClose={unselectShops} />
    </>
  );
};

export default MapView;
