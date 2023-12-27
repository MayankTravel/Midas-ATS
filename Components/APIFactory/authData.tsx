export const authData = () => {
  var authData: any = "";
  if (typeof window !== "undefined" && localStorage.getItem("authUser")) {
    authData = JSON.parse(localStorage.getItem("authUser") || "");
    return authData;
  }

  return authData;
};
