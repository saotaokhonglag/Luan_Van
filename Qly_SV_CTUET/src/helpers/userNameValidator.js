export function userNameValidator(userName) {
  let regex = new RegExp(/^[a-zA-Z ]{2,30}$/);
  if (!userName) return "Username không được để trống!";
  if (!regex.test(userName))
    return "Username từ 2 ký tự và không có ký tự đặt biệt!";
  return "";
}
