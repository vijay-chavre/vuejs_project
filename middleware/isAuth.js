const isAuth = (context) => {
   if(!process.env.isLoggedIn) {
       context.redirect('/Login')
   }
}

export default isAuth