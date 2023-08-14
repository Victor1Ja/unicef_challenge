import {
  AppBar,
  Container,
  CssBaseline,
  Link,
  Toolbar,
  Typography,
} from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SchoolInfoCleanedPage from './components/SchoolInfoCleaned/SchoolInfoCleanedTable';
import SchoolInfoFromEntityPage from './components/SchoolInfoFromEntity/SchoolInfoFromEntityTable';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Container>
        <Typography variant="h4" align="center" style={{ marginTop: '20px' }}>
          Giga Unicef Challenge
        </Typography>
      </Container>
    ),
  },
  {
    path: '/school-info-cleaned',
    element: <SchoolInfoCleanedPage />,
  },
  {
    path: '/school-info-from-entity',
    element: <SchoolInfoFromEntityPage />,
  },
]);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My App</Typography>
        <Link href="/" color="inherit" style={{ marginLeft: '20px' }}>
          Home
        </Link>
        <Link
          href="/school-info-cleaned"
          color="inherit"
          style={{ marginLeft: '20px' }}>
          School Info Cleaned
        </Link>
        <Link
          href="/school-info-from-entity"
          color="inherit"
          style={{ marginLeft: '20px' }}>
          School Info From Entity
        </Link>
      </Toolbar>
    </AppBar>
    <RouterProvider router={router} />
  </React.StrictMode>
);
