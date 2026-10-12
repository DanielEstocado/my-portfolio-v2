// How many full years old someone is today, from a birth date like "2003-04-20".
export function calculateAge(birthdate: string, today: Date = new Date()) {
  const [year, month, day] = birthdate.split("-").map(Number);
  const hadBirthdayThisYear =
    today.getMonth() + 1 > month ||
    (today.getMonth() + 1 === month && today.getDate() >= day);

  return today.getFullYear() - year - (hadBirthdayThisYear ? 0 : 1);
}
