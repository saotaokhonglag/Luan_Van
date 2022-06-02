export function phoneNumberValidator(number) {
    let onlyNumber = new RegExp(/(0[3|5|7|8|9])+([0-9]{8})\b/)
    if (!number) return "Số điện thoại không thể để trống."
    if (!onlyNumber.test(number)) return 'Số điện thoại chưa đúng!'
    return ''
  }
