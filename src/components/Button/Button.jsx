import React, { forwardRef } from 'react';
import { Btn } from './Button.styled';

export const Button = forwardRef(({ title, onClick }, ref) => {
  return (
    <Btn ref={ref} onClick={onClick}>
      {title}
    </Btn>
  );
});
