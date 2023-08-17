import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './AuthComponent.css';
import { useProduct } from '../../context/contexts';

function AuthComponent() {
  const { isAuthenticated, setIsAuthenticated, setUserEmail, userEmail } = useProduct();

  const [isRegistering, setIsRegistering] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [emailAlreadyExists, setEmailAlreadyExists] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('isAuthenticated');
    const savedUserEmail = localStorage.getItem('userEmail');

    if (savedAuthStatus === 'true') {
      setIsAuthenticated(true);
      setUserEmail(savedUserEmail);
    }
  }, [setIsAuthenticated, setUserEmail]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUserEmail('');
  };

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
          {errors.email && <span>Email is required and must be a valid email address</span>}

          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password && <span>Password is required and must be at least 8 characters long</span>}

          {!isRegistering ? (
            <button type="submit" className="auth-button">Login</button>
          ) : (
            <>
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', { required: true, minLength: 8 })}
              />
              {errors.confirmPassword && <span>Password confirmation is required and must be at least 8 characters long</span>}
              <button type="submit" className="auth-button">Register</button>
              {emailAlreadyExists && (
                <p>Данный емейл уже зарегистрирован</p>
              )}
              {registrationSuccess && (
                <p>Вы успешно зарегистрировались, можете зайти в аккаунт</p>
              )}
            </>
          )}
          <button type="button" onClick={() => setIsRegistering(!isRegistering)} className="auth-button">
            {isRegistering ? 'Back to Login' : 'Register'}
          </button>
        </form>
      )}
    </div>
  );
}

export default AuthComponent;