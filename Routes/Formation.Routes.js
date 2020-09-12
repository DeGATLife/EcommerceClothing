module.exports = function(app) {
    //   const router = express.Router()
       var userRoute = require("../Controllers/Formation.Controller");
       var adminMiddleware = require("../Middlewares/Admin.Middleware");
       // User Routes
       app.route('/Formations/Store/Formation').post(adminMiddleware.auth,userRoute.Store_Formation);
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
       app.route('/Formations/Get/AllFormations').get(adminMiddleware.auth,userRoute.Get_All_Formation);
   };