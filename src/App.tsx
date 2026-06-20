import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ApplicationForm from './pages/ApplicationForm';
import SuccessPage from './pages/SuccessPage';

export type Page = 'landing' | 'apply' | 'success';

function App() {
  const [page, setPage] = useState<Page>('landing');
  const [applicationId, setApplicationId] = useState<string>('');

  return (
    <>
      {page === 'landing' && <LandingPage onApply={() => setPage('apply')} />}
      {page === 'apply' && (
        <ApplicationForm
          onSuccess={(id) => { setApplicationId(id); setPage('success'); }}
          onBack={() => setPage('landing')}
        />
      )}
      {page === 'success' && (
        <SuccessPage applicationId={applicationId} onHome={() => setPage('landing')} />
      )}
    </>
  );
}

export default App;
