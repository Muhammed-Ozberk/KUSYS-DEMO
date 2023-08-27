module.exports = (sequelize, DataTypes) => {
    var UsersCourses = sequelize.define('UsersCourses',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            studentID: DataTypes.STRING,
            firstName: DataTypes.STRING,
            courseID: DataTypes.STRING,
            courseName: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }
    );

    return UsersCourses;
};

