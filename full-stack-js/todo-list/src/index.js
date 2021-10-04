console.log('hello world');

const datePicker = document.querySelector('input[type="date"]');
const today = new Date();
const [month, day, year] = today.toLocaleDateString().split('/');
const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
datePicker.value = formattedDate;