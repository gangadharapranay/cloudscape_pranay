import React, { useState } from "react";
import BaseApi from "../env/BaseApi";

const CreateRole = () => {
  const [roleName, setRoleName] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleCreateRole = async (event) => {
    event.preventDefault();
    try {
      const response = await BaseApi.post(BaseApi.defaults.baseURL + "/role", {
        name: roleName
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <h1>Create New Role</h1>
      <form onSubmit={handleCreateRole}>
        <label htmlFor="roleName">Role Name:</label>
        <input
          type="text"
          id="roleName"
          name="name"
          value={roleName}
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
