import axios from 'axios';

// export const getQuotes = async (tagId) => {
//   const params =
//     tagId !== -1
//       ? {
//           params: {
//             tags_in: tagId,
//           },
//         }
//       : {};
//   const response = await axios.get(`${process.env.API_URL}/quotes`, params);
//   // console.log(response);
//   return response.data;
// };

// export const getAllTags = async () => {
//   const response = await axios.get(`${process.env.API_URL}/tags`);
//   // console.log(response.data);
//   return response.data;
// };

// export const getPeople = async (id) => {
//   const url = id
//     ? `${process.env.API_URL}/authors/${id}`
//     : `${process.env.API_URL}/authors`;

//   const response = await axios.get(url, {
//     params: {
//       _sort: 'name',
//       _limit: -1,
//     },
//   });
//   // console.log(response.data);
//   return response.data;
// };
