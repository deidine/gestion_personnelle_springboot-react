 
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
 
 class tokenStorage
 {
   clearSession (){
    window.sessionStorage.clear();
  }

  
   saveToken(token) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

   getToken()  {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

   saveUser(user){
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

   getUser() {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
 }

export default new tokenStorage()
