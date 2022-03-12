import axios from "axios";
import { URL } from "..";

export default class Client {
  token = localStorage.getItem("access_token");

  constructor(private baseURL: string) {
		const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const redirect = params.get("redirect")
    if (token) {
			this.token = token;
      localStorage.setItem("access_token", this.token);
      history.replaceState(
        {},
        "",
        `${URL}${redirect ? `/?redirect=${redirect}` : ""}`
      );
    } else if (params.get("logout") === "true") {
      this.logout();
    }
	}

  logout() {
    window.localStorage.removeItem("access_token");
    this.token = null;
  }

  async getUser(): Promise<User | false> {
    // this basically check to see if user is authenticated
    if (this.token) {
      try {
        return await this.get("/user");
      } catch {
        this.logout();
        return false;
      }
    } else {
      return false;
    }
  }

  async get<T = any>(url: string) {
    return await axios({
      method: "get",
      url: this.baseURL + url,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    }).then(({ data }) => data as T);
  }

  async post<Data = any>(url: string, data?: Data) {
    return await axios({
      method: "post",
      url: this.baseURL + url,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      data,
    }).then(({ data }) => data);
  }

  async put<Data = any>(url: string, data: Data) {
    return await axios({
      method: "put",
      url: this.baseURL + url,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      data,
    }).then(({ data }) => data);
  }

  async patch<Data = any>(url: string, data: Data) {
    return await axios({
      method: "patch",
      url: this.baseURL + url,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
      data,
    }).then(({ data }) => data);
  }

  async delete(url: string) {
    return await axios({
      method: "delete",
      url: this.baseURL + url,
      headers: {
        authorization: `Bearer ${this.token}`,
      },
    }).then(({ data }) => data);
  }
}