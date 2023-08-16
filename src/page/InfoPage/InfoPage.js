import React from 'react';
import Tabs from '../../components/Tabs/Tabs';

  const tabsData = [
    { id: 1, title: 'Контакти', content: 'Описание раздела "Контакти"' },
    { id: 2, title: 'Про нас', content: 'Описание раздела "Про нас"' },
    { id: 3, title: 'Доставка і оплата', content: 'Описание раздела "Доставка і оплата"' },
  ];

const InfoPage = ({ activeTabId }) => {
  return (
    <div>
      <Tabs tabsData={tabsData} activeTabId={activeTabId} />
    </div>
  );
};

export default InfoPage;