import { constructBoundingBox } from "./geolocation";

describe("geolocation", () => {
  describe("constructBoundingBox", () => {
    it("should throw an error when empty array is passed", () => {
      expect(() => constructBoundingBox([])).toThrowError();
    });

    it("should return point doubled when just one point is passed", () => {
      expect(constructBoundingBox([{ lat: 10, lng: 49 }])).toEqual([
        [49, 10],
        [49, 10]
      ]);
    });

    it("should construct the most outer points for two passed points", () => {
      const lowestLng = 12;
      const highestLng = 78;
      const lowestLat = 10;
      const highestLat = 75;
      const input = [
        { lat: lowestLat, lng: highestLng },
        { lat: highestLat, lng: lowestLng }
      ];

      expect(constructBoundingBox(input)).toEqual([
        [lowestLng, lowestLat],
        [highestLng, highestLat]
      ]);
    });

    it("should construct the most outer points for more than two passed points", () => {
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
