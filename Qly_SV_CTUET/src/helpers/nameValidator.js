export function nameValidator(name) {
  let regex = new RegExp(/^[a-zA-Z0-9]+$/);

  if (!name) return "Họ và tên không được để trống!";
  if (!regex.test(name.trim()))
    return "Họ và tên phải từ 2 ký tự và không có ký tự đặt biệt!";
  return "";
}
