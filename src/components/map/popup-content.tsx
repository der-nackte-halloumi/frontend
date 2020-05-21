import React, { FC } from 'react';
import { styled } from 'linaria/react';

import { Shop } from '../../models/shop';

const Name = styled.p`
  margin: 0 0 4px;
  text-align: start;
  font-weight: bold;
`;
const Address = styled.p`
  margin: 0;
  font-style: italic;
  text-align: start;
  font-size: 75%;
`;
const Distance = styled.p`
  text-align: end;
`;

interface Props {
  shop: Shop;
}
const PopupContent: FC<Props> = ({ shop }: Props) => (
  <>
    <Name>{shop.name}</Name>
    <Address>{shop.address}</Address>
    <Distance>{shop.distance}</Distance>
  </>
);

export default PopupContent;
