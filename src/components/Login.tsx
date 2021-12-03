import React, { useState } from "react";
import { Authentication } from "../utils";

type LoginProps = {
  authenticate: any;
};

const Login: React.FC<LoginProps> = ({ authenticate }) => {
  const [login, setLogin] = useState<Authentication>({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    authenticate(login);
  };

  const handleChange = (e: any) => {
    // need a way to update date inputs
    const name = e.target.name;
    const value = e.target.value;

    setLogin({ ...login, [name]: value });
  };
  return (
    <>
      <div className="container">
        <div className="row vertical-offset-100 d-flex justify-content-center">
          <div className="col-md-4 col-md-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Please sign in</h3>
              </div>
              <div className="panel-body">
                <form
                  method="POST"
                  autoComplete="false"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <fieldset>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="E-mail"
                        name="username"
                        type="email"
                        onChange={handleChange}
                        value={login.username}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={login.password}
                      />
                    </div>
                    <div className="checkbox">
                      <label>
                        <input
                          name="remember"
                          type="checkbox"
                          value="Remember Me"
                        />{" "}
                        Remember Me
                      </label>
                    </div>
                    <button
                      className="btn btn-lg btn-success btn-block"
                      type="submit"
                      value="Login"
                    >
                      Login
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
