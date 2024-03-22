import Axios from "axios";

export const getEmoji = (taskName) => {
  const data = Axios.get(
    `https://emoji-api.com/emojis?search=${taskName}&access_key=52e40bae043bac6365bb757556d6bbeb798070c0`
  ).then((res) => res.data);

  emoji = data[0].character;
  return "📝";
};
