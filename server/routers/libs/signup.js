import Router from 'koa-router'
import ctrl from '../../controllers'

const router = new Router();
// 注册页面
const routers = router
    .get('/', ctrl.signUp)
    .post('/', ctrl.signUpPost);
    
export default routers