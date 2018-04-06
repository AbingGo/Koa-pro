import Router from 'koa-router'
import ctrl from '../../controllers'

const router = new Router();
// 登陆
const routers = router
    .get('/', ctrl.signIn)
    .post('/', ctrl.signInPost);
    
export default routers