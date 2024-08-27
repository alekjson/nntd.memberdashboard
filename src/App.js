import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    document.title = t('page_title'); 
  }, [i18n.language, t]); 
  useEffect(() => {
    document.querySelector('meta[name="description"]').setAttribute('content', t('meta_description'));
  }, [i18n.language, t]);
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
