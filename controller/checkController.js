const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const CheckIn = require('../model/checkModel');
exports.checkIn =asyncHandler( async (req,res) =>{
    const {name, check, time, date, lati, long, placedata} = req.body;
    const checked = new CheckIn({
        user: req.user._id,
        name,
        check,
        time,
        date,
        lati,
        long,
        placedata
    })
    const data = await checked.save();
    if(data){
        res.json(data);
    }
})

exports.getMyCheck =asyncHandler( async (req, res) => {
    // console.log(req)
    const checkData = await CheckIn.find({ user: req.user._id });
    res.json(checkData)
    // console.log(orders);
});

exports.getAdminCheckData = asyncHandler(async (req, res) => {
    const checkAll = await CheckIn.find({})
    res.json(checkAll)
});

exports.getAllUsersForOptions =asyncHandler( async (req, res)=>{
    const users = await User.find({});
    // const id = users._id;
    // const name = users.name;
    // const data = users.forEach(d => {
    //     return d;
    // });
    // for (let i = 0; i < users.length; i++) {
    //     const element = users[i];
    //     console.log(element);
    // }
    const data = users.map(user => {
        const id = user._id;
        const name = user.name
        return {id,name};
    })
    // console.log(data);
    res.json(data);
})