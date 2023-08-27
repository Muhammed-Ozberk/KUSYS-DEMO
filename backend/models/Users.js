module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('Users',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            studentID: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            birthDay: DataTypes.STRING,
            isAdmin: DataTypes.BOOLEAN,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }
    );

    return Users;
};
//npx sequelize migration:create --name create-users
//npx sequelize-cli --config=config/database.js db:migrate
