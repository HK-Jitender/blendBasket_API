const express = require('express');
const authRoute = require('./authRoute');
const roleRoute = require('./roleRoute');
const permissionRoute = require('./permissionRoute');

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoute,
    }, {
        path: '/role',
        route: roleRoute,
    },
    {
        path: '/permission', // Add this new permission route
        route: permissionRoute,
    },

];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;
