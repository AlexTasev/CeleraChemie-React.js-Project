import { toast } from "react-toastify";

const allowedLangs = ["en", "bg", "gr", "ro"];
const allowedCategories = [
  "chemicals",
  "consumables",
  "instruments",
  "glassware",
  "filters"
];

const createProductValidator = (
  manufacturer,
  description,
  category,
  language,
  logoUrl,
  catalogueUrl,
  brandWebSite
) => {
  if (manufacturer.length <= 2 || manufacturer === "") {
    toast.error("Manufacturer must be at least 3 characters long");
    return false;
  }

  if (description.length < 10 || description === "") {
    toast.error("Description must be at least 10 chars long");
    return false;
  }

  if (category === "" || !allowedCategories.includes(category)) {
    toast.error(
      'Category must be one of the following: "chemicals", "consumables", "instruments", "glassware", "filters"'
    );
    return false;
  }

  if (language.length !== 2 || !allowedLangs.includes(language)) {
    toast.error("Language must one of the following: EN, BG, RO, GR");
    return false;
  }

  if (!logoUrl.startsWith("http") || logoUrl.length <= 8) {
    toast.error("Logo URL must be a valid url");
    return false;
  }

  if (!brandWebSite.startsWith("http")) {
    toast.error("Brand web site must be a valid url");
    return false;
  }

  if (!catalogueUrl.startsWith("http")) {
    toast.error("Catalogue link must be a valid url");
    return false;
  }

  return true;
};

export default createProductValidator;
