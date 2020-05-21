import { constructBoundingBox, formatDistance } from './geolocation';

describe('geolocation', () => {
  describe('constructBoundingBox()', () => {
    it('should throw an error when empty array is passed', () => {
      expect(() => constructBoundingBox([])).toThrowError();
    });

    it('should return point doubled when just one point is passed', () => {
      expect(constructBoundingBox([{ lat: 10, lng: 49 }])).toEqual([
        [49, 10],
        [49, 10],
      ]);
    });

    it('should construct the most outer points for two passed points', () => {
      const lowestLng = 12;
      const highestLng = 78;
      const lowestLat = 10;
      const highestLat = 75;
      const input = [
        { lat: lowestLat, lng: highestLng },
        { lat: highestLat, lng: lowestLng },
      ];

      expect(constructBoundingBox(input)).toEqual([
        [lowestLng, lowestLat],
        [highestLng, highestLat],
      ]);
    });

    it('should construct the most outer points for more than two passed points', () => {
      const lowestLng = 12;
      const highestLng = 78;
      const lowestLat = 10;
      const highestLat = 75;
      const input = [
        { lat: 30, lng: highestLng },
        { lat: lowestLat, lng: 50 },
        { lat: highestLat, lng: lowestLng },
      ];

      expect(constructBoundingBox(input)).toEqual([
        [lowestLng, lowestLat],
        [highestLng, highestLat],
      ]);
    });
  });

  describe('formatDistance()', () => {
    it.each([
      [0.002, '0m'],
      [0.007, '10m'],
      [0.637, '640m'],
      [0.603, '600m'],
    ])(
      'should properly round to next 10m if below one km: %s',
      (distance, expected) => {
        expect(formatDistance(distance)).toBe(expected);
      },
    );

    it('should not format in m if closer to a km', () => {
      expect(formatDistance(0.994)).toBe('990m');
      expect(formatDistance(0.995)).toBe('1km');
      expect(formatDistance(0.996)).toBe('1km');
    });

    it.each([
      [1.0, '1km'],
      [1.005, '1km'],
      [1.049, '1.1km'],
      [1.05, '1.1km'],
      [1.234, '1.2km'],
      [12.345, '12.3km'],
    ])(
      'should properly format to next 100m if above one km: %s',
      (distance, expected) => {
        expect(formatDistance(distance)).toBe(expected);
      },
    );
  });
});
