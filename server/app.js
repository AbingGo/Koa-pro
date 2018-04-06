import Koa from 'koa'
import path from 'path'
import bodyParser from 'koa-bodyparser'
import ejs from 'ejs'
import session from 'koa-session-minimal'
import convert from 'koa-convert'
import MysqlStore from 'koa-mysql-session'
import views from 'koa-views'
import koaStatic from 'koa-static'
import staticCache from 'koa-static-cache'
import config from './conf/sql_config'
import routers from './routers'

const app = new Koa();

const sessionConfig = {
    host     : config.database.HOST,
    user     : config.database.USERNAME,
    password : config.database.PASSWORD,
    database : config.database.DATABASES
};

app.use(session({
    key: 'USER_SIG',
    store: new MysqlStore(sessionConfig)
}));

app.use(bodyParser());

// 配置静态资源加载中间件
app.use(convert(koaStatic(
	path.join(__dirname , '../static')
)));

// 配置服务端模板渲染引擎中间件
app.use(views(path.join(__dirname, './views'), {
	extension: 'ejs'
}));

// app.use(require('../server/routers/index').routes());

// app.use(require('../server/routers/signup').routes());

// app.use(require('../server/routers/signin').routes());

// app.use(async (ctx, next) => {
//     await next();
// });

app.use(routers.routes())
    .use(routers.allowedMethods());


app.listen(config.port, () => {
    console.log(`listening on port ${config.port}`);
});