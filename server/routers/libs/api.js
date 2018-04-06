import Router from 'koa-router'
import ctrl from '../../controllers'

const router = new Router();

router.get('/getUser', ctrl.getUserInfo);

router.get('*', ctrl.defaultMethod);

router.post('/signup', ctrl.signUpPost);

router.post('/signin', ctrl.signInPost);

router.post('/signout', ctrl.signOutPost);


export default router;