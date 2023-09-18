import axios from "axios";
import { BASE_URL, ACCESS_TOKEN } from '../constants/constants';
 
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
 
const headers = new Headers({
    'Content-Type': 'application/json',
});

function getAccessToken () {
    if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
}

class AuthService {

    login(loginRequest) {
        // if(localStorage.getItem(ACCESS_TOKEN)) {
        //     headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        // }
    
        return axios.post(BASE_URL + "/users/signin", loginRequest );
    };

    signup(signupRequest) {
        getAccessToken();
        return axios.post(BASE_URL + "/users/signup", signupRequest, {
            headers: headers
        });
    }

    getCurrentUser() {
        // const headers = new Headers();
        if(!localStorage.getItem(ACCESS_TOKEN)) {
            return Promise.reject("No access token set.");
        }
        if(localStorage.getItem(ACCESS_TOKEN)) {
            headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
        }
        return axios.get(BASE_URL + "/user/me", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            }
        });
    }

     logout(){

        console.log("Logging out current user");
    
        //localStorage.removeItem("currentUser");
        console.log("cleared User Id "+localStorage.getItem("currentUserId") );
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.removeItem(USER_KEY);
    
        localStorage.clear();
    
        this.router.navigate(['']);
        
      }

}

export default new AuthService()