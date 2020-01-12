import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ProdConfig } from './blocks/config/prod.config';
import { EGpAppModule } from './app.module';
import 'content/plugins/flaticon/flaticon.css';
import 'content/plugins/flaticon2/flaticon.css';
import 'content/plugins/flaticon/flaticon.css';
import 'content/plugins/flaticon2/flaticon.css';
import 'content/plugins/line-awesome/css/line-awesome.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'socicon/css/socicon.css';
import '../content/scss/styles.scss';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

ProdConfig();

if (module['hot']) {
  module['hot'].accept();
}

platformBrowserDynamic()
  .bootstrapModule(EGpAppModule, { preserveWhitespaces: true })
  // eslint-disable-next-line no-console
  .then(success => console.log('Application started'))
  .catch(err => console.error(err));
