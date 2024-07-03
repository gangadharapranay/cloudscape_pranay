import React, { useEffect, useState } from "react";
import BaseApi from "../env/BaseApi";
const FetchGroups = () => {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BaseApi.get(BaseApi.defaults.baseURL + "/groups");
        console.log(response)
        setGroups(response.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Groups</h1>
      {error && <p>Error: {error.message}</p>}
      <ul>
        {groups.map((group) => (
          <li key={group.id}>
            <div>{group.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchGroups;
