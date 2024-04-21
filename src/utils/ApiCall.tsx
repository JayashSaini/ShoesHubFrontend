import axios from "axios";

import { ApiCallProps } from "../types";

interface ApiResponse<T> {
  data: T | null;
  error: any;
}

const ApiCallComponent = async ({
  url,
  method = "GET",
  params = {},
  data = {},
  headers = {}, // Add a default empty object for data
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
        headers,
      });
      response.data = res.data;
    } catch (error: any) {
      response.error = error.response || "An error occurred";
    }
  };

  await fetchData();

  return response;
};

export default ApiCallComponent;
