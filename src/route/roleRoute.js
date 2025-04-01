// routes/roleRoutes.js
const express = require('express');
const RoleController = require('../controllers/RoleController');
const RoleValidator = require('../validator/RoleValidator');

const router = express.Router();
const auth = require('../middlewares/auth'); // Optional, only if you want role CRUD operations to be secured

const roleController = new RoleController();
const roleValidator = new RoleValidator();

router.post('/roles', roleValidator.createRoleValidator, roleController.createRole);
router.get('/roles', roleController.getRoles);
router.get('/roles/:uuid', roleController.getRoleByUuid);
router.put('/roles/:uuid',  roleValidator.updateRoleValidator, roleController.updateRole);
router.delete('/roles/:uuid', roleController.deleteRole);

module.exports = router;
