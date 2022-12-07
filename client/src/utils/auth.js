import decode from 'jwt-decode';

class AuthService {
    //get data from token
    getProfile() {
        return decode(this.getToken());
    }

    //check is user logged in 
    loggedIn() {
        //if token is valis
        const token = this.getToken();
        //use type coersion to check if token is not undefined and not expired
        return !!token && ! this.isTokenExpired(token);
    }

    //token expired
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false ;
            }
        } catch (err) {
            return false;
        }
    }

    // get token from localstorage 
    getToken() {
        return localStorage.getItem('id_token');
    }

    //set token to localstorage and reload homepg
    login(idToken){
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    //clear token from localstroage and force logout with reload
    logout() {
        localStorage.removeItem('id_token');

        window.location.assign('/');
    }
}

export default new AuthService();