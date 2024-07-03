import React, { useEffect, useState } from "react";
import BaseApi from "../env/BaseApi";

const FetchRoles = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BaseApi.get(BaseApi.defaults.baseURL + "/roles");
        setRoles(response.data); // Assuming roles are in response.data
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);
  console.log(roles)

  return { roles, error };
};

export default FetchRoles;
