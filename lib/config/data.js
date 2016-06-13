import users from './../../data/users.json';
import * as User from './../models/User';

// import * as Expense from './../models/Expense';

export default async function configureData() {
    if (process.env.NODE_ENV === "DEVELOPMENT" || process.env.NODE_ENV === "TEST") {
        try {
            await User.__recreate();
            users.forEach(async (user) => await User.create(user));

            // await Expense.__recreate();

            console.log("Data has been initialized"); // eslint-disable-line no-console
        }
        catch (err) {
            console.log("Error while initializing data; ", err); // eslint-disable-line no-console
        }
    }
}