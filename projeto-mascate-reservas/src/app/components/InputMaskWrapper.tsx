/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import InputMask, { Props as InputMaskProps } from 'react-input-mask';

interface InputMaskWrapperProps extends InputMaskProps {}

const InputMaskWrapper = forwardRef<HTMLInputElement, InputMaskWrapperProps>((props, ref) => (
  <InputMask {...props} inputRef={ref} />
));

export default InputMaskWrapper;
