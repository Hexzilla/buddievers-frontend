import { AppProviders } from 'providers/AppProvider';
import { AccountDialog } from 'components';
import { Routing } from 'pages';

function MyApp() {
  return (
    <AppProviders>
      <AccountDialog />
      <Routing />
    </AppProviders>
  );
}

export default MyApp;
