import Head from 'next/head';
import Layout from '../../components/layout';
import styles from 'styles/register.module.scss'

import React, { useState } from 'react'
import TextField from '../../components/textField';
import RowBreak from '../../components/rowBreak';
import Link from 'next/link';
import Banner, { BannerType } from '../../components/banner';
import appClient from '../../util/appClient';
import { extractErrors, validateEmail } from '../../util/utils';
import { useRouter } from 'next/router';
import useLog from '../../hooks/useLog';
import useInputField from '../../hooks/useInputField'
import useInputForm from '../../hooks/useInputForm'
import Button, { ButtonType } from '../../components/button';

const log = useLog("RegisterPage")

function RegisterPage() {
  const router = useRouter();
  const form = useInputForm({
    fields: [
      {
        name: "email",
        validator: validateEmail
      },
      {
        name: "username",
        required: true,
        validator: (username) => {
          if (username.length > 20) {
            return "Username cannot be more than 20 characters";
          }
        }
      },
      {
        name: "password",
        shouldValidate: true,
        required: true,
        validator: (password) => {
          if (password.length < 8) {
            return "Password must be at least 8 characters";
          }
          else if (password.toUpperCase() == password) {
            return "Passwords must have at least one lowercase ('a'-'z')";
          }
          else if (password.toLowerCase() == password) {
            return "Passwords must have at least one uppercase ('A'-'Z')";
          }
          else if (!/\d/.test(password)) {
            return "Passwords must have at least one digit ('0'-'9')."
          }
          else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            return "Passwords must have at least one special character."
          }
        }
      },
      {
        name: "retypedPassword"
      }
    ],
    preSubmitValidation: (fields, result) => {
      const passwordField = fields.get("password");
      const retypedPasswordField = fields.get("retypedPassword");
      if (passwordField.inputValue != retypedPasswordField.inputValue) {
        log("Passwords do not match")
        retypedPasswordField.setErrorMessage("Passwords do not match");
        retypedPasswordField.setInErrorState(true);
        result.failed = true;
      }
      else {
        retypedPasswordField.clearErrorState();
      }
    },
    onSubmit: (req) => appClient.post("register", req),
    onSuccess: (req, res) => {
      router.push("/confirmation-email-sent?email=" + req.email)
    },
    fieldErrorExtractor: (res) => extractErrors(res)
  })

  const x = form.getField("retypedPassword").inErrorState;

  log("render " + x)
  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <article>
        <Banner bannerType={BannerType.ERROR} omnipresent>
          {form.generalError}
        </Banner>
        <form className='form-box' onSubmit={form.submit}>
          <h1>Register</h1>
          <RowBreak height=".8em"/>
          <TextField
            field={form.getField("email")}
            placeholder='Email'
            type='email'
            title="Email" 
            className={styles.textField}
          />
          <RowBreak height=".6em"/>
          <TextField
            field={form.getField("username")}
            placeholder='Username'
            title="Username" 
            className={styles.textField}
          />
          <RowBreak height=".6em"/>
          <TextField
            field={form.getField("password")}
            placeholder='Password'
            type='password'
            title="Password" 
            className={styles.textField}
          />
          <RowBreak height=".6em"/>
          <TextField
            field={form.getField("retypedPassword")}
            showError={x}
            placeholder='Retype Password'
            type='password'
            title="Retype Password" 
            className={styles.textField}
          />
          <RowBreak height="1.8em"/>
          <Button id={styles.registerButton} type="submit" buttonType={ButtonType.PRIMARY} disabled={form.submitted}>
            {form.submitted 
              ? <span style={{marginLeft: '.5em'}} className='loader'></span>
              : <><span style={{marginRight: '.3em'}} className="icon material-icons">person_add</span>{"Create Account"}</>
            }
          </Button>
          <RowBreak height="1.8em"/>
          <div className={styles.linkGroup}>
            <Link href="/login" id={styles.loginButton} className='inline'>Login</Link>
            <Link href="/resend-email" className='inline'>Resend Confirmation Email</Link>
          </div>
        </form>
      </article>
    </>
  );
}

export default RegisterPage