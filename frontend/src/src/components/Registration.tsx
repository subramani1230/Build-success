import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css'; // assumes common.css is in the same folder or adjust path

type FormState = {
  username: string;
  password: string;
  passwordConfirm: string;
};

type Errors = {
  username?: string;
  password?: string;
  passwordConfirm?: string;
  general?: string;
};

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    const body = new URLSearchParams();
    body.append('username', form.username);
    body.append('password', form.password);
    body.append('passwordConfirm', form.passwordConfirm);

    try {
      const response = await fetch('/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
        credentials: 'include',
      });

      if (response.redirected) {
        // Spring MVC will redirect to /welcome on success
        navigate(response.url);
      } else if (response.ok) {
        // In case the backend returns 200 without redirect
        navigate('/welcome');
      } else {
        // Assume backend returns JSON with field errors
        const data = await response.json();
        if (data && typeof data === 'object') {
          setErrors(data);
        } else {
          setErrors({ general: 'An unexpected error occurred.' });
        }
      }
    } catch (err) {
      setErrors({ general: 'Network error. Please try again.' });
    }
  };

  return (
    <div className="modern-container d-flex flex-column align-items-center py-5">
      <header className="w-100 mb-4">
        <nav className="navbar navbar-expand-lg navbar-dark default-color-dark fixed-top">
          <a className="navbar-brand" href="/">
            App Name
          </a>
        </nav>
      </header>

      <div className="modern-card p-4 w-100" style={{ maxWidth: '400px' }}>
        <form onSubmit={handleSubmit} className="form-signin">
          <h2 className="form-signin-heading mb-4">Create your account</h2>

          {errors.general && (
            <div className="alert-box mb-3">{errors.general}</div>
          )}

          <div
            className={`form-group ${
              errors.username ? 'has-error' : ''
            } mb-3`}
          >
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Username"
              autoFocus
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && (
              <div className="badge mt-1">{errors.username}</div>
            )}
          </div>

          <div
            className={`form-group ${
              errors.password ? 'has-error' : ''
            } mb-3`}
          >
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="badge mt-1">{errors.password}</div>
            )}
          </div>

          <div
            className={`form-group ${
              errors.passwordConfirm ? 'has-error' : ''
            } mb-3`}
          >
            <label htmlFor="passwordConfirm" className="form-label">
              Confirm your password
            </label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              className="form-control"
              placeholder="Confirm your password"
              value={form.passwordConfirm}
              onChange={handleChange}
            />
            {errors.passwordConfirm && (
              <div className="badge mt-1">{errors.passwordConfirm}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;