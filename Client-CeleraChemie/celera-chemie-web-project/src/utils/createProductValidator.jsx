import { toast } from "react-toastify";

const createProductValidator = (
  manufacturer,
  description,
  category,
  logoUrl,
  language,
  catalogueUrl,
  brandWebSite
) => {
  if (manufacturer.length <= 2 && manufacturer === "") {
    toast.error("Manufacturer must be at least 3 characters long");
    return false;
  }

  if (description.length < 10 && description === "") {
    toast.error("Description must be at last 10 chars long");
    return false;
  }

  if (category === "") {
    toast.error("Category must be valid string");
    return false;
  }

  if (!logoUrl.startsWith("http") && !logoUrl.length <= 14) {
    toast.error("Logo URL must be a valid url");
    return false;
  }

  if (!brandWebSite.startsWith("http")) {
    toast.error("Brand web site must be a valid url");
    return false;
  }

  if (language.length !== 2 && language === "") {
    toast.error("Language nust be 2 chars, example: EN, BG");
    return false;
  }

  if (!catalogueUrl.startsWith("http")) {
    toast.error("Catalogue link must be a valid url");
    return false;
  }

  return true;
};

export default createProductValidator;
