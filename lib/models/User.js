import * as Password from './user/password';
import PGModel from './../pg/PGModel';

const UserModel = new PGModel({
    tableName: "users",
    columns: [
        {name: "id", type: "serial"},
        {name: "username", type: "varchar(128)"},
        {name: "password", type: "varchar(128)"},
        {name: "data", type: "jsonb", null: true},
        {name: "created_at", type: "timestamp", default: "CURRENT_TIMESTAMP"},
        {name: "last_login", type: "timestamp", null: true}
    ]
});

/**
 * Find a user by username. Returns undefined if nothing found
 *
 * @param {Object} user
 *   @param {String} user.username
 * @returns {Object} user or undefined
 */
export async function findOneByUsername({username}) {
    return await UserModel.findOne({column: "username", value: username});
}

/**
 * Update last_login for a user to the current timestamp
 *
 * @param {Object} search object
 *   @param {String} search.key
 *   @param {String|Number} search.value
 */
export async function updateLastLogin({username}) {
    console.log("updateLastLogin: ", username);
    return await UserModel.update({
        column: "last_login",
        value: "current_timestamp",
        where: {column: "username", value: username}
    });
}

/**
 * Create a new user.
 *
 * @param {Object} user
 *   @param {String} user.username
 *   @param {String} user.password
 *   @param {Object} user.data
 */
export async function create(user) {
    user.password = await Password.generate(user.password);

    return await UserModel.create(user);
}

/**
 * Remove a user from the database, by username.
 *
 * @param {Object} user
 *   @param {String} user.username
 */
export async function remove({username}) {
    return await UserModel.remove({column: "username", value: username});
}

/**
 * Drop and recreate the users table. This will remove all data!
 */
export async function __recreate() {
    return UserModel.__recreate();
}