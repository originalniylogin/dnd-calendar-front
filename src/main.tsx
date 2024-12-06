import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { App } from '~app';
import { isDefined } from '~shared/lib/index.ts';

import '~app/styles/index.css';

const rootElement = document.getElementById('root');
const root = isDefined(rootElement) ? createRoot(rootElement) : null;

root?.render(
  <StrictMode>
    <App />
  </StrictMode>
);
