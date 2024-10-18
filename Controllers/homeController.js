const User = require('../Model/userModel');

exports.Home = async (req, res) => {
    // res.render('index', { title: 'Home page' });

    try {
        const users = await User.find();
        // res.status(200).json({
        //     status: 'success',
        //     message: {
        //         data: users,
        //     },
        // });

        res.render('index', {
            title: 'Home Page',
            users: users,
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
};
