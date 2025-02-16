import { Box, useTheme } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import CustomMarkerIcon from "../../assets/logo-monogram.svg?react"; // SVG as React component
import { FancyLoader } from "../fancy-loader";
import { useSelectableShops } from "./data";
import { ShopInfo } from "./shop-info";

const MapView = () => {
  const theme = useTheme();

  // data fetching
  const [shops, selectedShop, setSelectedShop] = useSelectableShops();
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
              click: () => {
                setSelectedShop(shop);
              },
            }}
          ></Marker>
        ))}
      </MapContainer>
      <ShopInfo
        shop={selectedShop}
        onClose={() => setSelectedShop(undefined)}
      />
    </>
  );
};

export default MapView;
