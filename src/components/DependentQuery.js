import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const DependentQuery = () => {
  const email = "uzairans532@gmail.com";
  const userFetcherFunction = ({ queryKey }) => {
    return axios.get("http://localhost:8080/users/" + queryKey[1]);
  };
  const channelFetcherFunction = ({ queryKey }) => {
    return axios.get("http://localhost:8080/channels/" + queryKey[1]);
  };
  const { data: user } = useQuery(["user-details", email], userFetcherFunction);
  const channelId = user?.data?.channelName;
  const { data: channel } = useQuery(
    ["user-channel", channelId],
    channelFetcherFunction,
    {
      enabled: !!channelId,
    }
  );
  return (
    <div>
      <p>DependentQuery</p>

      <h3> Channel Name {user?.data.channelName || "N/A"}</h3>
      <h3>Channel topics </h3>
      {channel?.data?.topics?.map((ele) => {
        return <p>{ele}</p>;
      })}
    </div>
  );
};

export default DependentQuery;
