const express = require('express');
const router = express.Router();
const {
  getGalleryItems,
  getGalleryItemById,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem
} = require('../controllers/galleryController');

router.route('/')
  .get(getGalleryItems)
  .post(createGalleryItem);

router.route('/:id')
  .get(getGalleryItemById)
  .put(updateGalleryItem)
  .delete(deleteGalleryItem);

module.exports = router;
