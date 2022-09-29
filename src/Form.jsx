import { useForm } from 'react-hook-form';
import style from './Form.module.css';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log('data: ', data);
  };

  return (
    <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.wrap}>
        <label htmlFor="email" className={style.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          className={style.input}
          {...register('email', {
            required: {
              value: true,
              message: 'Ошибка в этом поле',
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'Неверный email',
            },
          })}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className={style.error}>{errors.email.message}</p>}
      </div>
      <div className={style.wrap}>
        <label htmlFor="password" className={style.label}>
          Пароль
        </label>
        <input
          type="password"
          id="password"
          className={style.input}
          {...register('password', {
            required: {
              value: true,
              message: 'Ошибка в этом поле',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: 'Неверный password',
            },
          })}
          aria-invalid={!!errors.password}
        />
        {errors.password && <p className={style.error}>{errors.password.message}</p>}
      </div>
      <div className={style.wrapCheckbox}>
        <input type="checkbox" id="save" className={style.checkbox} {...register('save')} />
        <label htmlFor="save" className={style.labelCheckbox}>
          Запомнить пароль
        </label>
      </div>
      <button type="submit" className={style.submit}>
        Войти
      </button>
    </form>
  );
};
