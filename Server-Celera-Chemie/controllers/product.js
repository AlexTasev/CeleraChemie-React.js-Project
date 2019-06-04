const express = require('express')
const authCheck = require('../config/auth-check')
const Product = require('../models/Product')

const router = new express.Router()

function validateProductCreateForm(payload) {
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

router.post('/', authCheck, (req, res) => {
  const productObj = req.body;
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateProductCreateForm(productObj)
    if (!validationResult.success) {
      return res.status(401).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      });
    }

    Product
      .create(productObj)
      .then((createdProduct) => {
        res.status(200).json({
          success: true,
          message: 'Product added successfully.',
          data: createdProduct
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Product with the given name already exists.'
        }
        return res.status(401).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/:id', authCheck, (req, res) => {
  const productId = req.params.id
  Product
    .findById(productId)
    .then(product => {
      res.status(200).json(product)
    }).catch((err) => {
      console.log(err)
      const message = 'Something went wrong :('
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.put('/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const productId = req.params.id
    const productObj = req.body
    const validationResult = validateProductCreateForm(productObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Product
      .findById(productId)
      .then(existingProduct => {
        existingProduct.manufacturer = productObj.manufacturer
        existingProduct.description = productObj.description
        existingProduct.category = productObj.category
        existingProduct.logoUrl = productObj.logoUrl
        existingProduct.language = productObj.language
        existingProduct.catalogueUrl = productObj.catalogueUrl
        existingProduct.brandWebSite = productObj.brandWebSite

        existingProduct
          .save()
          .then(editedProduct => {
            res.status(200).json({
              success: true,
              message: 'Product edited successfully.',
              data: editedProduct
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Product with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/all/:language', (req, res) => {
  const lang = req.params.language;
  Product
    .find()
    .sort({
      manufacturer: 1
    })
    .then(products => {
      let sorted = products.filter((p) => p.language === lang);
      let data = [];
      sorted.map((p) => {
        data.push({
          "id": p._id,
          "brandWebSite": p.brandWebSite,
          "logoUrl": p.logoUrl
        })
      })
      res.status(200).json(data)
    })
})

router.get('/chemicals/:language', (req, res) => {
  const lang = req.params.language;
  Product
    .find({
      category: "chemicals"
    })
    .then(products => {
      let sorted = products.filter((p) => p.language === lang)
      res.status(200).json(sorted)
    })
})

router.get('/consumables/:language', (req, res) => {
  const lang = req.params.language;
  Product
    .find({
      category: 'consumables'
    })
    .then(products => {
      let sorted = products.filter((p) => p.language === lang)
      res.status(200).json(sorted)
    })
})

router.get('/instruments/:language', (req, res) => {
  const lang = req.params.language;
  Product
    .find({
      category: 'instruments'
    })
    .then(products => {
      let sorted = products.filter((p) => p.language === lang)
      res.status(200).json(sorted)
    })
})

router.get('/glassware/:language', (req, res) => {
  const lang = req.params.language;
  Product
    .find({
      category: 'glassware'
    })
    .then(products => {
      let sorted = products.filter((p) => p.language === lang)
      res.status(200).json(sorted)
    })
})

router.get('/filters/:language', (req, res) => {
  const lang = req.params.language;
  Product
    .find({
      category: 'filters'
    })
    .then(products => {
      let sorted = products.filter((p) => p.language === lang)
      res.status(200).json(sorted)
    })
})

router.delete('/:id', authCheck, (req, res) => {
  const id = req.params.id
  Product
    .findById(id)
    .then((product) => {
      product
        .remove()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Product deleted successfully!'
          })
        })
    })
    .catch(() => {
      return res.status(200).json({
        success: false,
        message: 'Entry does not exist!'
      })
    })
})

module.exports = router

// DONE !