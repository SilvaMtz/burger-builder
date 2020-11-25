import classes from './Input.module.scss';
import React from 'react';

const input = (props) => {

  let inputElement = null;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input
        className={[classes.InputElement, classes.Input].join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      break;
    case ('textarea'):
      inputElement = <textarea
        className={[classes.InputElement, classes.Textarea].join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      break;
    case ('select'):
      inputElement = (
        <select
          className={[classes.InputElement, classes.Select].join(' ')}
          value={props.value}
          onChange={props.onChange}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      )
      break;
    default:
      inputElement = <input
        className={[classes.InputElement, classes.Input].join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      break;
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