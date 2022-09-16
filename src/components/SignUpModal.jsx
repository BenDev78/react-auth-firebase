import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function SignUpModal() {
  const { modalState, toggleModals, signUp } = useContext(UserContext);
  const [validation, setValidation] = useState('');
  const navigate = useNavigate();
  const inputs = useRef([]);
  const form = useRef([]);

  const addInputs = el => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el)
    }
  }

  const onModalClose = () => {
    setValidation('');
    toggleModals('close')
  }

  const handleSubmit = e => {
    e.preventDefault();

    if ((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
      setValidation('6 characters min');

      return;
    }

    if (inputs.current[1].value  !== inputs.current[2].value) {
      setValidation('passwords do not match');

      return;
    }

      const creds = signUp(
        inputs.current[0].value,
        inputs.current[1].value
      );

      creds
      .then(r => {
        form.current.reset();
        setValidation('');
        navigate('/private/private-home');
        toggleModals('close');
      })
      .catch(err => {
        if (err.code === "auth/email-already-in-use") {
          setValidation('Email already in use')
        }

        if (err.code === "auth/invalid-email") {
          setValidation('Invalid email')
        }
      })
  }

  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={onModalClose}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Sign Up</h5>
                  <button
                    onClick={onModalClose}
                    className="btn-close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form ref={form} className="sign-up-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpEmail">
                        Email Address
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        required
                        name="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signUpPwd">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        required
                        name="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="repeatPwd">
                        Repeat Password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        required
                        name="password"
                        className="form-control"
                        id="repeatPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
