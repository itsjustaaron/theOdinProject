export default function setDateAsToday() {
  const datePicker = document.querySelector('input[type="date"]');
  const today = new Date();
  const [month, day, year] = today.toLocaleDateString().split('/');
  // eslint-disable-next-line prettier/prettier
  const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  datePicker.value = formattedDate;
}
