const getTaskData = (apiDateString) => {

const apiDate = new Date(apiDateString);

const year = apiDate.getFullYear();
const month = apiDate.getMonth() + 1;
const day = apiDate.getDate();

const formattedMonth = month < 10 ? '0' + month : month;
const formattedDay = day < 10 ? '0' + day : day;

const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

return formattedDate;
}

export default getTaskData;