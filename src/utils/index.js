export const baseUrl = "https://watch-zone.onrender.com/api/admin";
export function getToken() {
  let session = JSON.parse(sessionStorage.getItem("session-data"));
  return session.token;
}
export const access = "access-control-allow-origin";
export const accessUrl = "http://localhost:3000/";
