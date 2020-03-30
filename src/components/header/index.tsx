import React from 'react';
import { styled } from 'linaria/react';
import { useTranslation } from 'react-i18next';

import Button from '../button';

const BaseHeader = styled.header`
  text-align: right;
  padding: 16px;
`;

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { language } = i18n;

  function handleLanguageChange(
    event: React.MouseEvent<HTMLButtonElement>,
  ): void {
    const nextLanguage = event.currentTarget.value;

    i18n.changeLanguage(nextLanguage, (err) => {
      if (err) {
        console.error(`switching the language to ${nextLanguage} failed:`, err);
      }
    });
  }

  return (
    <BaseHeader>
      <Button
        selected={language === 'de'}
        value="de"
        title={t('common.ui.switch-lng-de')}
        onClick={handleLanguageChange}
      >
        de
      </Button>
      <Button
        selected={language === 'en'}
        value="en"
        title={t('common.ui.switch-lng-en')}
        onClick={handleLanguageChange}
      >
        en
      </Button>
      <Button
        selected={language === 'es'}
        value="es"
        title={t('common.ui.switch-lng-es')}
        onClick={handleLanguageChange}
      >
        es
      </Button>
    </BaseHeader>
  );
};

export default Header;
