export const getCurrenUser = () => {
  var data = "";
  if (typeof window !== "undefined" && localStorage.getItem("authUser")) {
    data = JSON.parse(localStorage.getItem("authUser") || "");
    return data;
  }
  console.log(data);
  return data;
};
