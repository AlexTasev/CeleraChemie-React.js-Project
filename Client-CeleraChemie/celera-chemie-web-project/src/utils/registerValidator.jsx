import { toast } from "react-toastify";
const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

function registerValidator(email, organization, password, confirmPassword) {
  if (!emailRegex.test(email) || email === "") {
    toast.error("Please provide a correct email address");
    return false;
  }

  if (organization === "" || organization.length < 2) {
    toast.error("Organization is required!");
    return false;
  }

  if (password) {
    if ( password === "" || password.length < 8 ) {
      toast.error("Password must be at least 8 characters long");
      return false;
    }
  }
  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
}

export default registerValidator;
