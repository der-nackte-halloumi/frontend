interface Point {
  lat: number;
  lng: number;
}

export const constructBoundingBox = (
  points: ReadonlyArray<Point>
): [[number, number], [number, number]] => {
  if (points.length === 0) {
    throw new Error("at least two points are needed to construct bounding box");
  }
  if (points.length === 1) {
    const { lat, lng } = points[0];
    return [
      [lng, lat],
      [lng, lat]
    ];
  }

  const { latitudes, longitudes } = points.reduce<{
    latitudes: ReadonlyArray<number>;
    longitudes: ReadonlyArray<number>;
  }>(
    (accum, curr) => ({
      latitudes: [...accum.latitudes, curr.lat],
      longitudes: [...accum.longitudes, curr.lng]
    }),
    {
      latitudes: [],
      longitudes: []
    }
  );

  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)]
  ];
};
