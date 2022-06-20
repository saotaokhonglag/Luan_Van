export function numberValidator(number) {
  let onlyNumber = new RegExp("^[0-9]*$");
  if (!number) return "Số tiền không được trống.";
  if (!onlyNumber.test(number)) return "Không được chứa ký tự!";
  return "";
}
