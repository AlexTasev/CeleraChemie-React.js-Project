import { toast } from "react-toastify";
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

function registerValidator (email, organisation, password, confirmPassword) {
  if (!emailRegex.test(email) || email === '') {
    toast.error('Please provide a correct email address')
    return false
  }
  if (organisation.length < 2 || organisation === "") {
    toast.error("Organisation is required!");
    return false;
  }
  if (password.length < 8 || password === '') {
    toast.error('Password must be at least 8 characters long')
    return false
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match')
    return false
  }

  return true
}

export default registerValidator
