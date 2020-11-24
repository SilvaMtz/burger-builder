import classes from './Input.module.scss';
import React from 'react';

const input = (props) => {

  let inputElement = null;

  switch (props.inputtype) {
    case('input'):
      inputElement = <input className={[classes.InputElement, classes.Input].join(' ')} {...props} />
    case ('textarea'):
      inputElement = <textarea className={[classes.InputElement, classes.Textarea].join(' ')} {...props} />
    default:
      inputElement = <input className={[classes.InputElement, classes.Input].join(' ')} {...props} />
  }

  return (
    <div className={classes.InputContainer}>
      <label className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;