import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const StringContent = ({title, children}) => (
  <Tippy content={title}>
    {children}
  </Tippy>
);

export default StringContent