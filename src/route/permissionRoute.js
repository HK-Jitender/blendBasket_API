// routes/permissionRoutes.js
const express = require('express');
const PermissionController = require('../controllers/PermissionController');
const PermissionValidator = require('../validator/PermissionValidator');

const router = express.Router();

const permissionController = new PermissionController();
const permissionValidator = new PermissionValidator();

router.post('/permissions', permissionValidator.createPermissionValidator, permissionController.createPermission);
router.get('/permissions', permissionController.getPermissions);
router.get('/permissions/:uuid', permissionController.getPermissionByUuid);
router.put('/permissions/:uuid', permissionValidator.updatePermissionValidator, permissionController.updatePermission);
router.delete('/permissions/:uuid', permissionController.deletePermission);

module.exports = router;
