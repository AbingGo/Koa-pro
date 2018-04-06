import Router from 'koa-router'
import ctrl from '../../controllers'


const router = new Router();
// 首页
const routers = router
    .get('/', ctrl.home);
    
export default routers