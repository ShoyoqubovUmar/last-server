const { Router } = require('express');

const {
    // index, 
    // create,
    show,
    // remove,
    edit
} = require('../../controllers/techer/teacher');
const router = Router()

// router.get('/', index)
router.get('/', show)
// router.post('/', create)
// router.delete('/:id', remove)
router.put('/', edit)


module.exports = router