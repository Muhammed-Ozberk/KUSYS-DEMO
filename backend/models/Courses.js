module.exports = (sequelize, DataTypes) => {
    var Courses = sequelize.define('Courses',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            courseID: DataTypes.STRING,
            courseName: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        }
    );

    return Courses;
};
