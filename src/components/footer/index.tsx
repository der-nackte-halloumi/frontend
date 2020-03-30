import React, { HTMLAttributes } from 'react';
import { styled } from 'linaria/react';
import { useTranslation } from 'react-i18next';

const BaseFooter = styled.footer`
  background-color: #424242;
  color: #fff;
  box-shadow: inset 0px 5px 10px 0px rgba(34, 34, 34, 1);
  padding: 8px;
  text-align: center;
  font-size: 0.75em;

  a,
  a:link,
  a:visited {
    color: #fff;
    text-decoration: underline;
  }

  a:focus,
  a:hover,
  a:active {
    color: #fff;
    text-decoration: none;
  }
`;

const Footer = ({ className }: HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <BaseFooter>
        <p>
          <a
            href="https://github.com/der-nackte-halloumi"
            title={t('common.links.source-code-label')}
          >
            {t('common.links.source-code')}
          </a>
        </p>
        <p>
          2020 – <a href="/">${window.location.host}</a>
        </p>
      </BaseFooter>
    </div>
  );
};

export default Footer;
