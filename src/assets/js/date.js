export const formatDate = (day) => {
    const aDay = new Date(day)
    const yyyy = aDay.getFullYear();
    let mm = aDay.getMonth() + 1;
    let dd = aDay.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + yyyy;
}