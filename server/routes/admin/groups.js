const{Router} = require('express');

const {
    index, 
    create,
    show,
    remove,
    edit,
    indexAll
} = require('../../controllers/admin/groups');
const router = Router()

router.get('/', indexAll)
router.get('/allGr', index)
router.get('/:id', show)
router.post('/', create)
router.delete('/', remove)
router.put('/', edit)

module.exports = router