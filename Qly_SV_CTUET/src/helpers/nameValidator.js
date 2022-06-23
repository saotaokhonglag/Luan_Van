export function nameValidator(name) {
  let regex = new RegExp(/^[a-zA-Z0-9]{3,10}$/);

  if (!name) return "Không được để trống!";
  if (!regex.test(name.trim()))
    return "Không được chứa ký tự đặt biệt và từ 3 ký tự!";
  return "";
}
