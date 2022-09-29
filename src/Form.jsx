import { useState } from 'react';
import style from './Form.module.css';

export const Form = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [checkErrorForm, setCheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validEmail = value => {
    setEmailError(/^.+@.+\..+$/.test(value));
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
    validEmail(target.value);
  };

  const validPassword = value => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value));
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
    validPassword(target.value);
  };

  const handleSave = ({ target }) => {
    setSave(target.checked);
  };

  const handelSubmit = event => {
    event.preventDefault();

    if (!emailError || !passwordError) {
      setCheckErrorForm(true);
      return;
    }

    setIsPending(true);
    console.log({ email, password, save });
  };

  return (
    <form className={style.form} onSubmit={handelSubmit}>
      <div className={style.wrap}>
        <label htmlFor="email" className={style.label}>
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className={style.input}
          value={email}
          onChange={handleEmail}
          onBlur={() => setEmailDirty(true)}
          disabled={isPending}
        />
        {!emailError && emailDirty && <p className={style.error}>Сообщение об ошибке</p>}
      </div>
      <div className={style.wrap}>
        <label htmlFor="password" className={style.label}>
          Пароль
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className={style.input}
          value={password}
          onChange={handlePassword}
          onBlur={() => setPasswordDirty(true)}
          disabled={isPending}
        />
        {!passwordError && passwordDirty && <p className={style.error}>Сообщение об ошибке</p>}
      </div>
      <div className={style.wrapCheckbox}>
        <input
          type="checkbox"
          name="save"
          id="save"
          className={style.checkbox}
          checked={save}
          onChange={handleSave}
          disabled={isPending}
        />
        <label htmlFor="save" className={style.labelCheckbox}>
          Запомнить пароль
        </label>
      </div>
      {isPending ? (
        <p className={style.pending}>Отправка...</p>
      ) : (
        <button type="submit" className={style.submit}>
          Войти
        </button>
      )}
      {checkErrorForm && (!emailError || !passwordError) && (
        <p className={style.errorSubmit}>Не правильно заполнен логин или пароль</p>
      )}
    </form>
  );
};
