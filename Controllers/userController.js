const User = require('../Model/userModel');
const multer = require('multer');
const fs = require('fs');
const { title } = require('process');

exports.AddUserPage = (req, res) => {
    res.render('add_user', { title: 'Add User Page' });
};
exports.selectUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        res.render('update_user', {
            title: 'Update User',
            user: user,
        });

        // res.status(200).json({
        //     status: 'success',
        //     message: {
        //         data: user,
        //     },
        // });
    } catch (err) {
        res.status(403).json({
            status: 'fail',
            message: err.message,
        });
    }
};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname);
    },
});

exports.upload = multer({
    storage: storage,
}).single('image');

exports.updateUser = async (req, res) => {
    console.log(req.body);
    if (req.file) {
        new_image = req.file.filename;
        console.log('path: ' + '../uploads/' + req.body.old_image);
        fs.unlinkSync('uploads/' + req.body.old_image);
        try {
        } catch (error) {
            console.log(error.message);
        }
    } else {
        console.log('--------');
        new_image = req.body.old_image;
    }
    try {
        const user = User.findByIdAndUpdate(req.params.id, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phonenumber: req.body.phonenumber,
                image: new_image,
            },
        }).then((updated) => {
            if (updated) {
                console.log('successfully updated!');
                req.session.message = {
                    status: 'success',
                    message: 'User Updated suceessfully',
                    type: 'success',
                };

                res.redirect('/');
            } else {
                console.log();
                console.log('Not Updated!');
            }
        });
    } catch (err) {
        res.status(403).json({
            status: 'faillll',
            message: err.message,
        });
    }
};

exports.adduser = async (req, res) => {
    try {
        const addUser = User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            image: req.file.filename,
        });

        // res.status(201).json({
        //     status: 'success',
        //     message: {
        //         data: addUser,
        //     },
        // });

        req.session.message = {
            status: 'success',
            message: 'User Added suceessfully',
            type: 'success',
        };

        res.redirect('/');
    } catch (err) {
        res.json({
            status: 'Fail',
            message: err.message,
            type: 'danger',
        });
    }
};

exports.serverCheck = (req, res) => {
    res.send('Server Work using MVC');
};

exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });

        req.session.message = {
            status: 'success',
            message: 'User Deleted suceessfully',
            type: 'success',
        };

        res.redirect('/');
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message,
        });
    }
};
