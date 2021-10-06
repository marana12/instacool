import React from 'react';
import createHistory from 'history/createBrowserHistory';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const history  =createHistory()
  render(<App loadInitialData={()=>({})}  history={history}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
