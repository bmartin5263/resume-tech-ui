import { useState } from "react"
import { assert, isBlank, isNotBlank } from "../util/assert"
import { capitalizeFirstLetter, or } from "../util/utils"
import useLog from "./useLog"

export type FieldTemplate = {
  name: string,
  displayName: string,
  required: boolean,
  initialValue: string,
  shouldValidate: boolean,
  validator: (text: string) => string,
  insertValueIntoRequest: (req: any, value: string) => void
}

export type Field = {
  name: string,
  inputValue: string,
  errorMessage: string,
  inErrorState: boolean,

  update(text: string): void
  validate(): string | null
  enableValidations(): void
  setErrorMessage(text: string): void
  setInErrorState(value: boolean): void
  clearErrorState(): void
  insertValueIntoRequest: (req: any) => void
}

function useInputField(props: FieldTemplate): Field {
  assert(isNotBlank(props.name), "Field name cannot be blank");
  const log = useLog("useInputField(name=" + props.name + ")");

  const [inputValue, setInputValue] = useState(props.initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [inErrorState, setInErrorState] = useState(false);
  const [shouldValidate, setShouldValidate] = useState(props.shouldValidate == null ? false : true);

  const validator: (text: string) => string = props.validator;
  const insertValueIntoRequest: (req: any, value: string) => void = or(props.insertValueIntoRequest, (req) => req[props.name] = inputValue)
  const displayName = or(props.displayName, capitalizeFirstLetter(props.name));

  const doValidate = (text: string): string | null => {
    if (props.required === true && (text == null || isBlank(text))) {
      const message = displayName + " is required";
      setInErrorState(true);
      setErrorMessage(message);
      return message;
    }
    if (props.validator == null) {      
      setInErrorState(false);
      return null;
    }

    const error: string = validator(text);
    if (error == null) {
      setInErrorState(false);
    }
    else {
      setInErrorState(true);
      setErrorMessage(error);
    }
    return error;
  }

  const doUpdate = (text: string) => {
    setInputValue(text);
    if (shouldValidate) {
      doValidate(text);
    }
  }

  const doSetErrorMessage = (text: string) => {
    setErrorMessage(text);
  }

  return {
    name: props.name,
    inputValue: inputValue,
    errorMessage: errorMessage,
    inErrorState: inErrorState,

    update: (text) => doUpdate(text),
    validate: () => {
      return doValidate(inputValue);
    },
    clearErrorState: () => {
      setInErrorState(false)
;     setErrorMessage("");
    },
    setErrorMessage: (text: string) => doSetErrorMessage(text),
    setInErrorState: (value: boolean) => setInErrorState(value),
    enableValidations: () => {
      setShouldValidate(true);
    },
    insertValueIntoRequest: (req: any) => {
      insertValueIntoRequest(req, inputValue);
    }
  };
}

export default useInputField;