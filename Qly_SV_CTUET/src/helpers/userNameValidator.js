export function userNameValidator(userName) {
  let regex = new RegExp(/^[a-zA-Z0-9]{2,30}$/);
  if (!userName) return "Username không được để trống!";
  if (!regex.test(userName))
    return "Username không được có dấu và phải từ 2 ký tự!";
  return "";
}
