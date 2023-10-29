import styles from 'styles/textField.module.scss'
import useLog from '../hooks/useLog';
import { useState } from 'react';
import { Field } from '../hooks/useInputField';

const log = useLog("TextField")

type TextFieldProps = {
  value: string, 
  placeholder: string,
  error: string, 
  showError: boolean,
  help: string,

  field: Field,

  type: string, 
  identifier: string,
  title: string,
  className: string,
  spellCheck: boolean,

  onChange: (newValue: string) => string;
  onExit: () => void;
}

function TextField(props: TextFieldProps) {
  const mainStyle = {
    display: 'block',
    width: '100%',
  }

  const defaultStyle = {
    display: 'block',
    width: '100%',
  } as const;

  const noWrap = {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
  } as const;

  const value = props.value ?? props.field.inputValue;
  const error = props.error ?? props.field.errorMessage;
  const showError = props.showError ?? props.field.inErrorState;
  const identifier = props.identifier ?? props.field.name;

  let onChange = (str: string) => {};
  let onExit = () => {};
  if (props.field != null) {
    if (props.onChange == null) {
      onChange = (newValue: string) => props.field.update(newValue);
    }
    if (props.onExit == null) {
      onExit = () => {
        props.field.enableValidations();
        props.field.validate();
      }
    }
  }

  const handleChange = (event: any) => {
    let value: string = event.target.value; 
    let overriddenValue = onChange(value);
    if (overriddenValue != null) {
      event.target.value = overriddenValue;
    }
  }

  const handleBlur = (event: any) => {    
    onExit();
  }

  log("render " + identifier)
  return (
    <div className={"textBox " + props.className} style={mainStyle}>
      <div style={noWrap}>
        <span className={getTitleClass(value)}>{props.title}</span>
        <span className={getWarningClass(showError)}>{error}</span>
      </div>
      <div style={defaultStyle}>
        <input
          spellCheck={props.spellCheck}
          value={value}
          className={styles.textBox} 
          id={identifier} 
          name={identifier} 
          type={props.type == null ? "text" : props.type}
          placeholder={props.placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <div className={styles.helpText} style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        alignItems: 'flex-end',
        textAlign: 'left',
        marginTop: '.4em'
      }}>
        <span>{props.help}</span>
      </div>
    </div>
  );
}

function getWarningClass(showError: boolean) {
  const classes = [styles.headerText, styles.errorText];
  if (!showError) {
    classes.push(styles.headerTextHidden);
  }
  return classes.join(" ");
}

function getTitleClass(text: string) {
  const classes = [styles.headerText, styles.labelText];
  if (!text) {
    classes.push(styles.headerTextHidden);
  }
  return classes.join(" ");
}

export default TextField;