interface Point {
  lat: number;
  lng: number;
}

export const constructBoundingBox = (
  points: Array<Point>
): [ReadonlyArray<number>, ReadonlyArray<number>] => {
  if (points.length < 2) {
    throw new Error("at least two points are needed to construct bounding box");
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
