export function emailValidator(email) {
  let regex1 = new RegExp('[a-z0-9]+@student.ctuet.edu.vn');
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  if (!email) return "Email can't be empty."
  if (!regex1.test(email) && !regex.test(email)) return 'Ooops! We need a valid email address.'
  return ''
}
