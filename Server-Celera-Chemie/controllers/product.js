const express = require('express')
const authCheck = require('../config/auth-check')
const Product = require('../models/Product')
const validateProductForm = require('../utilities/productValidator')

const router = new express.Router()

router.post('/', authCheck, (req, res) => {
  const productObj = req.body;
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateProductForm(productObj)
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
    const validationResult = validateProductForm(productObj)
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
        let editedProduct = Object.assign(existingProduct, productObj);

        editedProduct
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