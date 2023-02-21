import { AppProviders } from 'providers/AppProvider';
import { Layout } from 'components';
import { AccountDialog } from 'components';
import { Routing } from 'pages';

function MyApp() {
  return (
    <AppProviders>
      <AccountDialog />

      <Layout>
        <Routing />
      </Layout>
    </AppProviders>
  );
}

export default MyApp;
