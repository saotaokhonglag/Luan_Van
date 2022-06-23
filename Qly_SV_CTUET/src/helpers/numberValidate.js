export function numberValidator(number) {
  let onlyNumber = new RegExp("^[0-9]*$");
  if (!number) return "Không được để trống.";
  if (!onlyNumber.test(number)) return "Không được chứa ký tự!";
  return "";
}
