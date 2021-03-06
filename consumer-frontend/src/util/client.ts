import axios from "axios";
import { AUTH_REDIRECT, URL } from "..";
import { User } from "@oauth2/types";

export default class Client {
  token = localStorage.getItem("access_token");

  constructor(private baseURL: string) {
		const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      history.replaceState({}, "", URL);
			this.token = token;
      localStorage.setItem("access_token", this.token);
    }
	}

  logout() {
    localStorage.removeItem("access_token");
    this.token = null;
    location.replace(AUTH_REDIRECT + "&logout=true")
  }

  async getUser(): Promise<User | false> {
    // this basically check to see if user is authenticated
    // will redirect to 
    if (this.token) {
      try {
        return await this.get("/user");
      } catch (error) {
        // this.logout();
        console.log(error);
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