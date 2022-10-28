import logo from './logo.svg';
import { useState} from "react"
import './App.css';
import validator from "validator"

function App() {

  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
      setSignupInput({
        ...signupInput,
        [e.target.name]: e.target.value
      })
  }
  
  const handleClick = (e) => {
    e.preventDefault()

    if (!validator.isEmail(signupInput.email)) {
      return setError("The email you entered is invalid")
    } else if (signupInput.password.length < 5) {
      return setError("The password you entered should contain 5 or more characters")
    } else if (signupInput.password !== signupInput.confirmPassword) {
      return setError("The passwords don't match")
    }
  }
  
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor='email' className="form-label">
            Email address
          </label>
          <input 
          type="email"
          id='email'
          name='email'
          className="form-control"
          value= {signupInput.email}
          onChange={handleChange}
          />
          
          <label htmlFor='password' className="form-label">
            Password
          </label>
          <input
          type="password"
          id='password'
          name='password'
          value={signupInput.password}
          onChange={handleChange}
          className="form-control"
          />

          <label htmlFor='confirm-password' className="form-label">
            Confirm Password
          </label>
          <input
          type="confirm-password"
          id='confirm-password'
          name='confirmPassword'
          value={signupInput.confirmPassword}
          onChange={handleChange}
          className="form-control"
          />

          {error && <p className="text-danger">{error}</p>}

          <button type='submit' className="btn btn-primary" onClick={handleClick}>Submit</button>
        </div>


      </form>
     
          
    </div>
  );
}

export default App;
