import { constructBoundingBox } from "./geolocation";

describe("geolocation", () => {
  describe("constructBoundingBox", () => {
    it("should throw an error when array with less than two points is passed", () => {
      expect(() => constructBoundingBox([])).toThrowError();
      expect(() => constructBoundingBox([{ lat: 0, lng: 0 }])).toThrowError();
    });

    it("should return the synthetic most outer points", () => {
      const lowestLng = 12;
      const highestLng = 78;
      const lowestLat = 10;
      const highestLat = 75;
      const input = [
        { lat: 30, lng: highestLng },
        { lat: lowestLat, lng: 50 },
        { lat: highestLat, lng: lowestLng }
      ];

      expect(constructBoundingBox(input)).toEqual([
        [lowestLng, lowestLat],
        [highestLng, highestLat]
      ]);
    });
  });
});
