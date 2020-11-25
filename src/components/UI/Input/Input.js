import classes from './Input.module.scss';
import React from 'react';

const input = (props) => {

  let inputElement = null;
  let inputClasses = [classes.InputElement];
  if (props.isInvalid && props.shouldValidate && props.isTouched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      inputClasses.push(classes.Input);
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      break;
    case ('textarea'):
      inputClasses.push(classes.Textarea);
      inputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      break;
    case ('select'):
      inputClasses.push(classes.Select);
      inputElement = (
        <select
          className={inputClasses.join(' ')}
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
      inputClasses.push(classes.Input);
      inputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value}
        onChange={props.onChange}
      />
      break;
  }

  let characterCounter = null
  if (props.maxLength) {
    characterCounter = <label className={classes.CharCount}>{props.value.length}/{props.maxLength}</label>
  }

  return (
    <div className={classes.InputContainer}>
      <label className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
      {characterCounter}
    </div>
  );
};

export default input;