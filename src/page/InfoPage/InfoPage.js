import React from 'react';
import Tabs from '../../components/Tabs/Tabs';

import './InfoPage.css';

  const tabsData = [
    { id: 1, title: 'Контакти', content: 'Опис розділу "Контакти"' },
    { id: 2, title: 'Про нас', content: 'Опис розділу "Про нас"' },
    { id: 3, title: 'Доставка і оплата', content: 'Опис розділу "Доставка і оплата"' },
  ];

const InfoPage = ({ activeTabId }) => {
  return (
    <div className='info-page'>
      <Tabs tabsData={tabsData} activeTabId={activeTabId} />
    </div>
  );
};

export default InfoPage;