import axios from "axios";

import { ApiCallProps } from "../types";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

const ApiCallComponent = async ({
  url,
  method = "GET",
  params = {},
  data = {}, // Add a default empty object for data
}: ApiCallProps): Promise<ApiResponse<any>> => {
  const response: ApiResponse<any> = {
    data: null,

    error: null,
  };

  const fetchData = async () => {
    try {
      const res = await axios({
        method,
        url,
        params,
        data, // Include the data in the request
      });
      response.data = res.data;
    } catch (error: any) {
      response.error = error.response?.data?.message || "An error occurred";
    }
  };

  await fetchData();

  return response;
};

export default ApiCallComponent;
