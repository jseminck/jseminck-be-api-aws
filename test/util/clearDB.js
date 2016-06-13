import mongoose from 'mongoose';

export default function clearDB() {
    for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
    }
}