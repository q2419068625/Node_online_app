const User = require('../models/User');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require('../utils/errorResponse');

//注册
/*
 * $route POST /api/user/register
 *  @desc   返回json数据
 *  @access public
 */
exports.register = asyncHandler(async(req, res, next) => {
    const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' });
    console.log(req.body);
    await User.create({
        email: req.body.email,
        password: req.body.password,
        avatar,
        name: req.body.name
    }).then(data => {
        res.json({ success: true, data: data })
    }).catch(err => {
        return next(new ErrorResponse("注册失败", 400))
    })
})

/*
 * $route POST /api/user/login
 *  @desc   返回json数据
 *  @access public
 */

exports.login = asyncHandler(async(req, res, next) => {
    const { email, password } = req.body;

    //判断email, password是否存在
    if (!email || !password) {
        return next(new ErrorResponse("邮箱或密码为空", 401));
    }
    const user = await User.findOne({ email }).select("+password");
    //判断是否找到该用户
    if (!user) {
        return next(new ErrorResponse("此用户不存在", 401));
    }
    //进行密码匹配
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        return next(new ErrorResponse("密码错误", 401))
    }
    const token = await user.getSignedJwtToken()
    res.json({ success: true, token })
});

//获取所有用户信息
exports.all = asyncHandler(async(req, res, next) => {
    const user = await User.find();
    if (user) {
        res.json({ success: true, data: user })
    }
});
//查找单个用户信息
exports.getUser = asyncHandler(async(req, res, next) => {
    // console.log(req.params.user_id)
    await User.findById(req.params.user_id).then(user => {
        if (!user) {
            return next(new ErrorResponse("未找到该用户信息", 401));
        }
        res.json({ success: true, data: user })
    })

})