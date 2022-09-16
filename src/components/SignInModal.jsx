import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function SignInModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);
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

      const creds = signIn(
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
        console.log(err)
        if(err.code === 'auth/invalid-email') {
            setValidation('Invalid credentials')
        }
        if(err.code === 'auth/user-not-found') {
            setValidation('Email not found')
        }
        if(err.code === 'auth/wrong-password') {
            setValidation('Wrong password')
        }
        console.log(validation)
      })
  }

  return (
    <>
      {modalState.signInModal && (
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
                  <h5 className="modal-title">Sign In</h5>
                  <button
                    onClick={onModalClose}
                    className="btn-close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form ref={form} className="sign-in-form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInEmail">
                        Email Address
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        required
                        name="email"
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="signInPwd">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        required
                        name="password"
                        className="form-control"
                        id="signInPwd"
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
