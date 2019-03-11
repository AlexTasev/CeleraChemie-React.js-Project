const registerValidationFunc = (email, username, password, confirmPassword) => {
  let validEmail = (() => {
    let mailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail = mailRegex.test(email);
    if (testMail && email !== "") {
      return true;
    }
    return false;
  })();

  let validUsername = (() => {
    if (username.length > 3 && username !== "") {
      return true;
    }
    return false;
  })();

  let validPassword = (() => {
    if (password.length > 7 && password !== "") {
      return true;
    }
    return false;
  })();

  let validConfirmPassword = (() => {
    if (
      confirmPassword.length > 7 &&
      confirmPassword !== "" &&
      confirmPassword === password
    ) {
      return true;
    }
    return false;
  })();

  return {
    validEmail,
    validUsername,
    validPassword,
    validConfirmPassword
  };
};

const loginValidationFunc = (email, password) => {
  let validEmail = (() => {
    let emailRegex = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    let testMail = emailRegex.test(email);
    if (testMail && email !== "") {
      return true;
    }
    return false;
  })();

  let validPassword = (() => {
    if (password.length > 7 && password !== "") {
      return true;
    }
    return false;
  })();

  return {
    validEmail,
    validPassword
  };
};

const createProductValidationFunc = (
  manufacturer,
  description,
  category,
  logoUrl,
  language,
  catalogueUrl,
  brandWebSite
) => {
  let validManufacturer = (() => {
    if (manufacturer.length > 2 && manufacturer !== "") {
      return true;
    }
    return false;
  })();

  let validDescription = () => {
    if (description.length > 10 && description !== "") {
      return true;
    }
    return false;
  };

  let validCategory = (() => {
    if (category !== "") {
      return true;
    }
    return false;
  })();

  let validLogoUrl = (() => {
    if (
      (logoUrl.startsWith("http")) &&
      logoUrl.length >= 14
    ) {
      return true;
    }
    return false;
  })();

  let validBrandUrl = (() => {
    if (brandWebSite.startsWith("http")) {
      return true;
    }
    return false;
  })();

  let validLanguage = (() => {
    if (language.length === 2 && language !== "") {
      return true;
    }
    return false;
  })();

  let validCatalogueUrl = (() => {
    if (catalogueUrl.startsWith("http")) {
      return true;
    }
    return false;
  })();

  return {
    validManufacturer,
    validDescription,
    validCategory,
    validLogoUrl,
    validBrandUrl,
    validLanguage,
    validCatalogueUrl
  }
};

export { registerValidationFunc, loginValidationFunc, createProductValidationFunc };