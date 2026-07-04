import React, { useState } from 'react';

// Inline stub components to avoid missing-module errors for ./pages/*
type LandingProps = { onApply: () => void };
function LandingPage({ onApply }: LandingProps) {
  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={onApply}>Apply</button>
    </div>
  );
}

type ApplicationFormProps = { onSuccess: (id: string) => void; onBack: () => void };
function ApplicationForm({ onSuccess, onBack }: ApplicationFormProps) {
  return (
    <div>
      <h1>Application Form</h1>
      <button onClick={() => onSuccess('app-123')}>Submit</button>
      <button onClick={onBack}>Back</button>
    </div>
  );
}

type SuccessProps = { applicationId: string; onHome: () => void };
function SuccessPage({ applicationId, onHome }: SuccessProps) {
  return (
    <div>
      <h1>Success</h1>
      <p>Application ID: {applicationId}</p>
      <button onClick={onHome}>Home</button>
    </div>
  );
}

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
