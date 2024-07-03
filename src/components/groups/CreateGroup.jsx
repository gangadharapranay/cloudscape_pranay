import React, { useState } from "react";
import BaseApi from "../env/BaseApi";

const CreateRole = () => {
  const [groupName, setGroupName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateGroup = async (event) => {
    event.preventDefault();
    try {
      const response = await BaseApi.post(BaseApi.defaults.baseURL + "/group", {
        name: groupName
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>Create New Group</h1>
      <form onSubmit={handleCreateRole}>
        <label htmlFor="groupName">Group Name:</label>
        <input
          type="text"
          id="groupName"
          name="name"
          value={groupName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {data && <p>Role created successfully: {data.name}</p>}
    </div>
  );
};

export default CreateRole;
