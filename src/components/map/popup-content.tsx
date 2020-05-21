import React, { FC } from 'react';
import { styled } from 'linaria/react';
import { useTranslation } from 'react-i18next';

import { Shop } from '../../models/shop';
import { formatDistance } from '../../utils/geolocation';

const Container = styled.div`
  & > *:not(:last-child) {
    margin-bottom: 4px;
  }
`;
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
  margin: 8px 0 0;
  padding-top: 4px;
  border-top: 1px dashed lightgrey;
`;

interface Props {
  shop: Shop;
}
const PopupContent: FC<Props> = ({ shop }: Props) => {
  const { t } = useTranslation();
  return (
    <Container>
      <Name>{shop.name}</Name>
      <Address>{shop.address}</Address>
      {shop.distance && (
        <Distance>
          {t('common.map.estimated-distance', {
            distance: formatDistance(shop.distance),
          })}
        </Distance>
      )}
    </Container>
  );
};

export default PopupContent;
