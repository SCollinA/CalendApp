import React from 'react';
import ReactDOM from 'react-dom';
import CalendApp from './CalendApp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CalendApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
