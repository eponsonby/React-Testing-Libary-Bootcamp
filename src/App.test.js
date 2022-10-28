import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

// jest hooks
afterEach(() => {
  console.log("this will run after each test")
});

beforeAll(() => {
  console.log("Will run only once before all tests")
});

afterAll(() => {
  console.log("This will run once after all of the tests")
});

// helper functions
const typeIntoForm = ({email, password, confirmPassword}) => {
  // these statements find the elements
  const emailInputElement = screen.getByLabelText("Email address");
  const passwordInputElement = screen.getByLabelText("Password");
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)

  // if an email is passed into the function
  // log a user event
  if(email){
    userEvent.type(emailInputElement, email)
  }

  if (password) {
    userEvent.type(passwordInputElement, password)
  }

  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword)
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement
  }
}

const clickSubmitButton = () => {
  const submitButtonElement = screen.getByRole('button')
  userEvent.click(submitButtonElement)
  return submitButtonElement
}

// Describe blocks
// the below describe block just says all of these tests are testing the app component
// describe blocks can be nested

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });
  
  test("inputs should be initially empty", () => {
    const emailInputElement = screen.getByLabelText("Email address");
    const passwordInputElement = screen.getByLabelText("Password");
    const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i)
    expect(emailInputElement.value).toBe("")
    expect(passwordInputElement.value).toBe("")
    expect(confirmPasswordInputElement.value).toBe("")
  });
  
  test("should be able to type in email", () => {
    // type into form returns the emailInputElement
    const {emailInputElement} = typeIntoForm({ email: "selena@gmail.com"})
    expect(emailInputElement.value).toBe("selena@gmail.com")
  })
  
  test("should be able to type a password", () => {
    const {passwordInputElement} = typeIntoForm({ password: "12345"})
    expect(passwordInputElement.value).toBe("12345")
  })
  
  test("should be able to confirm a password", () => {
    const {confirmPasswordInputElement} = typeIntoForm({ confirmPassword: "12345"})
    expect(confirmPasswordInputElement.value).toBe("12345")
  })

  // this describe block says the below tests are for error handling
  describe("Error handling", () => {
    // this will only run before each of the tests in this block
    beforeEach(() => {
      console.log('hello')
    })

    test("should show email error messgae on invalid email", () => {
      typeIntoForm({
        email: "selenagmail.com",
      })
    
      clickSubmitButton()
    
      expect (screen.queryByText(/the email you entered is invalid/i)).toBeInTheDocument()
    })
    
    test("password should be 5 or more characters", () => {
    
      typeIntoForm({email: 'selena@gmail.com'})
      
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).not.toBeInTheDocument()
    
      typeIntoForm({password: '123'})
      
      clickSubmitButton() 
    
      expect(screen.queryByText(/the password you entered should contain 5 or more characters/i)).toBeInTheDocument();
    })
    
    test("passwords should match", () => {
    
      typeIntoForm({email: "selena@gmail.com", password: "12345"})
    
      expect(screen.queryByText(/the passwords don't match/i)).not.toBeInTheDocument()
    
      typeIntoForm({confirmPassword: "123456"})
      
      clickSubmitButton()
    
      expect(screen.queryByText(/the passwords don't match/i)).toBeInTheDocument();
    })

    test("should show no error message if every input is valid ", () => {
  
      typeIntoForm({
        email: "selena@gmail.com",
        password: "12345",
        confirmPassword: "12345"
      })
    
      clickSubmitButton()
      // get the error elements
      // it's not necessary to save these to a variable but leaving this here for clarity
      const passwordErrorElement = screen.queryByText(/the password you entered should contain 5 or more characters/i)
      const emailErrorElement = screen.queryByText(/the email you entered is invalid/i)
      const confirmPasswordErrorElement = screen.queryByText(/the passwords don't match/i)
    
      // assert that they are not in the document
      expect (passwordErrorElement).not.toBeInTheDocument()
      expect(emailErrorElement).not.toBeInTheDocument()
      expect(confirmPasswordErrorElement).not.toBeInTheDocument()
    })
    
  })
  
  test("submit button should be present", () => {
  
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

})

