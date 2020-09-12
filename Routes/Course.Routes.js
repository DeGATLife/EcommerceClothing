module.exports = function(app) {
    //   const router = express.Router()
       var userRoute = require("../Controllers/Course.Controller");
        
        var instructorMiddleware = require("../Middlewares/Instructor.Middleware");
        var userMiddleware = require("../Middlewares/Auth.Middleware")
       // User Routes
       app.route('/Courses/Store/Collection').post(instructorMiddleware.auth,userRoute.Store_Collection);
       app.route('/Courses/Store/Course').post(instructorMiddleware.auth,userRoute.Store_Course);
      // app.route('/Confirmation/:token').get(userRoute.confirmeToken);
    //    app.route('/Users/Update/Picture').put(auth.auth,userRoute.Update_User_Pic);
    //    app.route('/Users/Update/Email').put(auth.auth,userRoute.Update_User_Email);
    //    app.route('/Users/Update/Address').put(auth.auth,userRoute.Update_User_Address);
    //    app.route('/Users/Update/Password').put(auth.auth,userRoute.Update_User_Password);
      // app.route('/Students/Get/LoginFRBS').post(Auth.loginFirePoliceman,userRoute.Firebase_Login);
    //    app.route('/Users/Update/RestPassPho').post(userRoute.Rest_Password_By_Phone);
    //    app.route('/Users/Update/RestCode').post(userRoute.verify_Code);
    //    app.route('/Users/Store/RestPass').post(userRoute.Reset_Password);
    //    app.route('/Users/Get/Profile').post(auth.auth,userRoute.User_Profile);
    //    app.route('/Users/Get/Verify').post(userRoute.User_Verify);
    app.route('/Courses/Get/AllCollectionCourses').get(userMiddleware.auth,userRoute.Get_Collction_Courses);
       app.route('/Courses/Get/AllCollections').get(userMiddleware.auth,userRoute.Get_All_Collections);
   };