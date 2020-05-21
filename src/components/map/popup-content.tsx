import React, { FC } from 'react';
import { styled } from 'linaria/react';
import { useTranslation } from 'react-i18next';

import { Shop } from '../../models/shop';
import { formatDistance } from '../../utils/geolocation';

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
  font-size: 75%;
`;

interface Props {
  shop: Shop;
}
const PopupContent: FC<Props> = ({ shop }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Name>{shop.name}</Name>
      <Address>{shop.address}</Address>
      {shop.distance && (
        <Distance>
          {t('common.map.estimated-distance', {
            distance: formatDistance(shop.distance),
          })}
        </Distance>
      )}
    </>
  );
};

export default PopupContent;
