import mongoose from 'mongoose';

const connectDB = () => {mongoose.connect('mongodb://127.0.0.1:27017/culture')
    .then(() => console.log('database connected'))
    .catch(error => console.error(error));
};

export default connectDB; 