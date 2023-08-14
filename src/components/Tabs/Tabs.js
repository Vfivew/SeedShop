import React, { useState, useEffect } from 'react';
import './Tabs.css';

const Tabs = ({ activeTabId }) => {
  const tabsData = [
    { id: 1, title: 'Контакти', content: 'Описание раздела "Контакти"' },
    { id: 2, title: 'Про нас', content: 'Описание раздела "Про нас"' },
    { id: 3, title: 'Доставка і оплата', content: 'Описание раздела "Доставка і оплата"' },
  ];

  const [activeTab, setActiveTab] = useState(
    tabsData.find(tab => tab.id === activeTabId) || tabsData[0]
  );

    useEffect(() => {
      console.log('render')
    const tabToUpdate = tabsData.find(tab => tab.id === activeTabId);
    if (tabToUpdate) {
      setActiveTab(tabToUpdate);
    }
  }, [activeTabId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-menu">
        {tabsData.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab.id === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tabs-content">
        <div className="tabs-description">
          <h2>{activeTab.title}</h2>
          <p>{activeTab.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Tabs;