import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Customer from '../models/customerModel.js';

const registerUser = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(200).send({ message: 'User already exists', success: false });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        req.body.password = hashedPassword;

        const newUser = new User({ ...req.body, password: hashedPassword });
        await newUser.save();

        res.status(200).send({ message: 'User created successfully', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', success: false, error });
    }
};

const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.status(200).send({ message: 'Invalid credentials', success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });

            res.status(200).send({
                message: 'User logged in successfully',
                success: true,
                data: token,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', success: false, error });
    }
};

const getUserDataById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });
        user.password = undefined;

        if (!user) {
            return res.status(200).send({ message: 'User not found', success: false });
        } else {
            res.status(200).send({
                message: 'User data fetched successfully',
                success: true,
                data: user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Something went wrong', success: false, error });
    }
};

const applyAsCustomer = async (req, res) => {
    try {
        const newCustomer = new Customer({ ...req.body, status: 'pending' });
        await newCustomer.save();
        const adminUser = await User.findOne({ isAdmin: true });

        const unseenNotifications = adminUser.unseenNotifications;
        unseenNotifications.push({
            type: 'new-customer-request',
            message: `${newCustomer.fullName} has applied for new Customer`,
            data: {
                CustomerId: newCustomer._id,
                name: newCustomer.fullName,
            },
            onclickPath: '/admin/customers',
        });

        await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

        res.status(200).send({ success: true, message: 'Customer applied successfully' });
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: 'Error applying as Customer', success: false, error });
    }
};

export { registerUser, loginUser, getUserDataById, applyAsCustomer };