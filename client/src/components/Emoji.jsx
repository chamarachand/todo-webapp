import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

export const Emoji = (props) => {
  const { data, isLoading } = useQuery(["emoji"], () => {
    return Axios.get(
      `https://emoji-api.com/emojis?search=${props.taskName}&access_key=52e40bae043bac6365bb757556d6bbeb798070c0`
    ).then((res) => res.data);
  });

  if (isLoading) return <p>🪹</p>;

  return <div>{data && <p>{data[0].character}</p>}</div>;
};
