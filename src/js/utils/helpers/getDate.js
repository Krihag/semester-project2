export default function getDate(date) {
  const d = new Date(date);
  let day = d.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let month = d.getMonth() + 1;

  if (month < 10) {
    month = `0${month}`;
  }

  const year = d.getFullYear();

  return `${day}/${month}/${year}  `;
}
