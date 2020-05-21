export interface Shop {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  distance: number | null;
}
