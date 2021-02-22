const isLoggedIn = () =>{
    if (localStorage.getItem("user")) {
      return true;
    } else {
      console.log("NOT LOGGED IN")
      return false;
    }
  }

  export default isLoggedIn;
  