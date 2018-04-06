import Router from 'koa-router'
import home from './libs/home'
import signin from './libs/signin'
import signup from './libs/signup'
import api from './libs/api'
import error from './libs/error'

const router = new Router();

router.use('/signin', signin.routes(), signin.allowedMethods())
    .use('/signup', signup.routes(), signup.allowedMethods())
    .use('/api', api.routes(), api.allowedMethods())
    .use('*', home.routes(), home.allowedMethods());

export default router