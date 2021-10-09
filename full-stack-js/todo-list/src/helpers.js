function setDateAsToday() {
  const datePicker = document.querySelector('input[type="date"]');
  const today = new Date();
  const [month, day, year] = today.toLocaleDateString().split('/');
  // eslint-disable-next-line prettier/prettier
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  datePicker.value = formattedDate;
}

function capitalize(str) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
}

export { setDateAsToday, capitalize };