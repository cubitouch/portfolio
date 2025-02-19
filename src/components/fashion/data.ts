import { useEffect, useRef, useState } from "react";

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
    website: string;
  };
}
export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  picture: string;
  active: boolean;
  categories: string[];
  website: string;
  distanceKm?: number;
}
export const fetchShops = async (AIRTABLE_API_KEY: string) => {
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
            website: record.fields.website,
          } as Shop)
      )
      .filter((s: Shop) => s.active) as Shop[];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [] as Shop[];
  }
};

export const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371; // Radius of the Earth in km
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

export const useSelectableShops = (
  location: { lat: number; lon: number } | null
) => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop>();
  const unselectShops = () => setSelectedShop(undefined);
  const selectShop = (shop: Shop) => setSelectedShop(shop);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      fetch("/data/shops.json")
        .then(async (data) =>
          setShops((await data.json()) as unknown as Shop[])
        )
        .catch(() =>
          console.error("Data missing, did you run `npm run prepare-data`?")
        );

      hasLoaded.current = true;
    }
  }, [shops]);

  useEffect(() => {
    if (location) {
      shops.forEach((shop) => {
        const distanceKm = getDistance(
          location.lat,
          location.lon,
          shop.lat,
          shop.lon
        );
        shop.distanceKm = distanceKm;
      });
      setShops(shops);
    }
  }, [shops.length, location]);

  return [shops, selectedShop, selectShop, unselectShops] as const;
};
