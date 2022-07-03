export function nameValidator(name) {
  let regex = new RegExp(
    "^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹsW|_]+$"
  );
  const myarr = name.split(" ");
  const newstring = myarr.join("");
  if (!name) return "Không được để trống!";
  if (!regex.test(newstring.toUpperCase()) && !regex.test(newstring.trim()))
    return "Không được chứa ký tự đặt biệt hay số và từ 3 ký tự!";
  return "";
}
