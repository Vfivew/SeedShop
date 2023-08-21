import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './AuthComponent.css';
import { useProduct } from '../../context/contexts';

function AuthComponent() {
  const { isAuthenticated, setIsAuthenticated, setUserEmail, userEmail, handleLogout } = useProduct();

  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); 

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    const savedUserEmail = localStorage.getItem('userEmail');

    if (savedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUserEmail(savedUserEmail);
    }
  }, [setIsAuthenticated, setUserEmail]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(isRegistering ? '/register' : '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        if (!isRegistering) {
          setIsAuthenticated(true);
          setUserEmail(data.email);
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userEmail', data.email);
          console.log('You are logged in');
        } else {
          if (responseData.error && responseData.error === 'email_exists') {
            setEmailAlreadyExists(true);
          } else {
            setRegistrationSuccess(true);
          }
        }
      } else {
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <>
          <p>{userEmail}</p>
          <button type="button" onClick={handleLogout} className="auth-button">Вихід</button>
        </>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <span className='valid-error'>Невірний формат пошти</span>}

          {!isRegistering && (
            <input
              type="password"
              placeholder="Password"
              {...register('password', { required: true, minLength: 8 })}
            />
          )}

          {isRegistering && (
            <>
              <input
                type="password"
                placeholder="Password"
                {...register('password', { required: true, minLength: 8 })}
                onChange={(e) => {
                  const confirmPasswordInput = e.target.form.confirmPassword;
                  setPasswordsMatch(e.target.value === confirmPasswordInput.value);
                }}
              />
              {errors.password && <span className='valid-error'>Пароль має містити не менше 8 символів</span>}

              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', { required: true, minLength: 8 })}
                onChange={(e) => {
                  const passwordInput = e.target.form.password;
                  setPasswordsMatch(e.target.value === passwordInput.value);
                }}
              />
              {errors.confirmPassword && <span className='valid-error'>Пароль має містити не менше 8 символів</span>}
              {!passwordsMatch && <span className='valid-error'>Паролі не співпадають</span>}
            </>
          )}

          {!isRegistering ? (
            <button type="submit" className="auth-button" >Увійти</button>
          ) : (
            <>
              <button
                type="submit"
                className="auth-button"
                disabled={!passwordsMatch}
              >
                Створити аккаунт
              </button>
              {emailAlreadyExists && (
                <p className='valid-error'>Дана поштова адреса уже зареєстрована</p>
              )}
              {registrationSuccess && (
                <p>Вы успішно зареєструвались, можете увійти в аккаунт</p>
              )}
            </>
          )}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setRegistrationSuccess(false);
                setEmailAlreadyExists(false);
                setPasswordsMatch(true);
              }}
              className="auth-button"
            >
            {isRegistering ? 'Повернутись до Входу' : 'Реэстрація'}
            </button>
        </form>
      )}
    </div>
  );
}

export default AuthComponent;