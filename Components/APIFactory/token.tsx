export const token = () => {
  var token = "";
  if (typeof window !== 'undefined' && localStorage.getItem("token")) {
    token = JSON.parse(localStorage.getItem("token") || "");
    return token;
  }
   
  return token;
};
