export const AuthLogin = async (data) => {
    return fetch(
      "/api/user/login",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)})
      .then((response) => {
          if(response.ok)
            return response.json()
          else
            return {success: false}
        }
      )
      .catch((error) => {
          console.error("Error:", error);
          alert("Error: " + error);
        }
      );
  };

  export const AuthRegister = async (data) => {
    return fetch(
      "/api/user/register",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),})
      .then((response) => {
        if(response.ok)
          return response.json()
        else
          return {success: false}
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error);
      }
      );
  }


export const AuthLogout = async (data) => {
    return fetch(
      "/api/user/logout",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      }).then(response => response.json());
  };