// export const convertToFormData = (obj) => {
//   const formData = new FormData();
//   Object.keys(obj).forEach((item) => {
//     if (obj[item] instanceof Array) {
//       formData.append(item, JSON.stringify(obj[item]));
//     } else if (obj[item] instanceof FileList) {
//       let i = 0;
//       while (i < obj[item].length) {
//         formData.append(`${item}[]`, obj[item][i]);
//         i += 1; // Incrementing i without using the ++ operator
//       }
//     } else formData.append(item, obj[item]);
//   });
//   return formData;
// };


export const convertToFormData = (obj) => {
  const formData = new FormData();
  Object.keys(obj).forEach((item) => {
    if (obj[item] instanceof Array) {
      obj[item].forEach((value, index) => {
        formData.append(`${item}[]`, value);
      });
    } else if (obj[item] instanceof FileList) {
      let i = 0;
      while (i < obj[item].length) {
        formData.append(`${item}[]`, obj[item][i]);
        i += 1; // Incrementing i without using the ++ operator
      }
    } else formData.append(item, obj[item]);
  });
  return formData;
};
