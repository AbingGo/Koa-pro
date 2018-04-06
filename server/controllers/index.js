import md5 from 'md5'
import moment from 'moment'
import CODES from '../codes'
import models from '../models'

let signUp = async (ctx) => {
    await ctx.render('signup', {
        session: ctx.session
    })
};


let signIn = async (ctx) => {
    await ctx.render('signin', {
        session: ctx.session
    })
};

let signOut = async (ctx) => {
    
};

let home = async (ctx) => {
    await ctx.render('home', {
        session: ctx.session
    })
};

let setCookie = function (ctx, key, val) {
    ctx.cookies.set(
        key,
        val,
        {
            domain: 'localhost',
            path: '/',
            expires: new Date('2018-04-15'),
            httpOnly: false,
            overwrite: false
        }
    );
};

let signUpPost = async (ctx) => {
    
    let user = {
        name: ctx.request.body.name,
        pass: ctx.request.body.password,
        repeatpass: ctx.request.body.repeatpass,
        avator: ctx.request.body.avator
    };

    let result = await models.findDataByName(user.name);

    if (result.length) {
        ctx.body = {
            errno: 0,
            data: CODES.FAIL_USER_NAME_IS_EXIST
        };
    } else {
        let insertData = [
            user.name, 
            md5(user.pass), user.avator, 
            moment().format('YYYY-MM-DD HH:mm:ss')
        ];

        let insertRlt = await models.insertData(insertData);

        if (insertRlt.insertId) {
            //注册成功
           ctx.body = {
               errno: 0,
               data: CODES.SIGNUP_SUCCESS
           };
       }
    }
};

let signInPost = async (ctx) => {

    let { name, password: pass } = ctx.request.body;

    let result = await models.findDataByName(name);

    if (result[0] && name === result[0]['name'] && md5(pass) === result[0]['pass']) {
        setCookie(ctx, 'uid', result[0]['id']);
        ctx.body = {
            errno: 0,
            data: CODES.SIGNIN_SUCCESS
        };
        ctx.session.user = name;
        ctx.session.uid = result[0]['id']; 
    } else {
        ctx.body = {
            errno: 1,
            data: CODES.FAIL_USER_NAME_OR_PASSWORD_ERROR
        };
    }
};

let signOutPost = async (ctx) => {
    let postData = ctx.request.body;
    let { uid } = postData;
    let data = await models.findDataById(uid).then((result) => {
        let res = result;
        if (uid == res[0]['id']) {
            ctx.session = null;
            ctx.body = {
                errno: 0,
                data: CODES.SIGNOUT_SUCCESS
            };
        } else {
            ctx.body = {
                errno: 1,
                data: CODES.ERROR_SYS
            };
        } 
    });
};

// get请求通过 ctx.query 获取请求的参数
let getUserInfo = async (ctx) => {
    let data = await models.getUserInfo();
    ctx.body = data;
};

let defaultMethod = async (ctx) => {

};


export default {
    signUp,
    signIn,
    home,
    signUpPost,
    signInPost,
    signOutPost,
    getUserInfo,
    defaultMethod
};