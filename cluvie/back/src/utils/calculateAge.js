const getAge = (string) => {
  const birthday = new Date(string);
  const today = new Date();
  const yearDiff = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();
  const dateDiff = today.getDate() - birthday.getDate();

  const isBeforeBirthday = monthDiff < 0 || (monthDiff === 0 && dateDiff < 0);

  const age = yearDiff + (isBeforeBirthday ? -1 : 0);

  return age;
};

export { getAge };
