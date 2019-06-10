module.exports = (payload) => {
    const errors = {}
    let isFormValid = true
    let message = ''
    let allowedLangs = ["en", "bg", "gr", "ro"];
    let allowedCategories = ["chemicals", "consumables", "instruments", "glassware", "filters"]
  
  
    if (!payload || typeof payload.manufacturer !== 'string' || payload.manufacturer.length < 3) {
      isFormValid = false
      errors.name = 'Manufacturer name must be at least 3 symbols.'
    }
  
    if (!payload || typeof payload.description !== 'string' || payload.description.length < 10) {
      isFormValid = false
      errors.description = 'Description must be at least 10 symbols.'
    }
  
    if (!payload || typeof payload.category !== 'string' || !allowedCategories.includes(payload.category)) {
      isFormValid = false
      errors.description = 'Category must be one of the following: "chemicals", "consumables", "instruments", "glassware", "filters".'
    }
  
    if (!payload || typeof payload.logoUrl !== 'string' ||
      !payload.logoUrl.startsWith('http')) {
      isFormValid = false
      errors.description = 'Image URL must be a valid URL.'
    }
  
    if (!payload || typeof payload.brandWebSite !== 'string' ||
      !payload.brandWebSite.startsWith('http')) {
      isFormValid = false
      errors.description = 'Brand web site must be valid URL!'
    }
  
    if (!payload || typeof payload.language !== 'string' || payload.language.length !== 2 || !allowedLangs.includes(payload.language)) {
      isFormValid = false
      errors.description = 'Language must be exactly 2 symbols. Allowed languages: EN, BG, GR, RO.'
    }
  
    if (!payload || typeof payload.catalogueUrl !== 'string' ||
      !payload.catalogueUrl.startsWith('http')) {
      isFormValid = false
      errors.description = 'Catalogue URL must be valid link!'
    }
  
  
    return {
      success: isFormValid,
      message,
      errors
    }
  }