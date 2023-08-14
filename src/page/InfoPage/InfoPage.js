import React from 'react';
import Tabs from '../../components/Tabs/Tabs';

const InfoPage = ({ activeTabId }) => {
  return (
    <div>
      <Tabs activeTabId={activeTabId} />
    </div>
  );
};

export default InfoPage;