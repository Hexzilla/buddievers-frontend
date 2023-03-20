import { Suspense } from 'react';
import { AppProviders } from 'providers/AppProvider';
import { AccountDialog } from 'components';
import { Routing } from 'pages';

function MyApp() {
  return (
    <AppProviders>
      <Suspense fallback={null}>
      <AccountDialog />
      <Routing />
      </Suspense>
    </AppProviders>
  );
}

export default MyApp;
