import { toast } from 'react-toastify';

const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

function loginValidator (email, password) {
  if (email === '' || !emailRegex.test(email)) {
    toast.error('Please provide a correct email address')
    return false
  }
  if (password === '' || password.length < 8) {
    toast.error('Password must be at least 8 characters long')
    return false
  }

  return true
}

export default loginValidator
