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
}
const fetchShops = async () => {
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

export const useSelectableShops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop>();
  const hasLoaded = useRef(false);
  useEffect(() => {
    if (!hasLoaded.current) {
      fetchShops().then(setShops);
      hasLoaded.current = true;
    }
  }, [shops]);

  return [shops, selectedShop, setSelectedShop] as const;
};
