import React, { HTMLAttributes } from 'react';

// icon made by https://labs.mapbox.com/maki-icons/
export default (props: HTMLAttributes<SVGElement>): JSX.Element => (
  <svg
    version="1.1"
    id="marker-15"
    xmlns="http://www.w3.org/2000/svg"
    width="15px"
    height="15px"
    viewBox="0 0 15 15"
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  >
    <path
      id="path4133"
      d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703&#xA;&#x9;C2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"
    />
  </svg>
);
