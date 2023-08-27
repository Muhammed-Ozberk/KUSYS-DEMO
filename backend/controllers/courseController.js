// Importing necessary modules and models
const allModels = require("./../models"); // Loading all DB models
const Courses = allModels.Courses; // Assuming "Courses" is a model for courses
const UsersCourses = allModels.UsersCourses; // Assuming "UsersCourses" is a model for user-course relationships

module.exports = {

    // Handler for GET /courses
    courseList: async function (req, res) {
        try {
            // Fetching all courses from the database
            const courses = await Courses.findAll();
            return res.status(200).json({ status: true, error: null, data: courses });
        } catch (error) {
            return res.status(500).json({ status: false, error: error, data: null });
        }
    },

    // Handler for GET /courses/match
    matchList: async function (req, res) {
        const isAdmin = req.decoded.isAdmin;
        try {
            if (isAdmin === false || isAdmin === 'false' || isAdmin === null) {
                // If user is not admin, fetch matching courses for the user
                const courses = await UsersCourses.findAll({ where: { studentID: req.decoded.id } });
                return res.status(200).json({ status: true, error: null, data: courses });
            } else {
                // If user is admin, fetch all matching courses
                const courses = await UsersCourses.findAll();
                return res.status(200).json({ status: true, error: null, data: courses });
            }
        } catch (error) {
            return res.status(500).json({ status: false, error: error, data: null });
        }
    },

    // Handler for POST /courses/create
    matchCreate: async function (req, res) {
        const { studentID, firstName, courseID, courseName } = req.body;
        const isAdmin = req.decoded.isAdmin;

        // Validating input data
        if (!studentID || !firstName || !courseID || !courseName) {
            return res.status(400).json({ status: false, error: "All fields are required", data: null });
        }

        try {
            // Checking if the match already exists
            const match = await UsersCourses.findOne({ where: { studentID: studentID, courseID: courseID } });
            if (match) {
                return res.status(400).json({ status: false, error: "You have already matched this course", data: null });
            } else {
                if (isAdmin === false || isAdmin === 'false' || isAdmin === null) {
                    if (req.decoded.id != studentID) {
                        return res.status(400).json({ status: false, error: "You can only create a match for yourself", data: null });
                    } else {
                        // Creating a new user-course relationship
                        const userCourse = await UsersCourses.create({
                            studentID: req.body.studentID,
                            firstName: req.body.firstName,
                            courseID: req.body.courseID,
                            courseName: req.body.courseName
                        });
                        return res.status(200).json({ status: true, error: null, data: userCourse });
                    }
                } else {
                    // Creating a new user-course relationship for admin
                    const userCourse = await UsersCourses.create({
                        studentID: req.body.studentID,
                        firstName: req.body.firstName,
                        courseID: req.body.courseID,
                        courseName: req.body.courseName
                    });
                    return res.status(200).json({ status: true, error: null, data: userCourse });
                }
            }
        } catch (error) {
            return res.status(500).json({ status: false, error: error, data: null });
        }
    }
}
