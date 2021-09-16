import request from "../service/request";

export function getInfo() {
  return request({
    url: "/yy/main/web-access-info",
    method: "get",
    params: { language: "en" },
  });
}
