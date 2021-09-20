import request from "@/service/request";

export function getHello() {
  return request({
    url: "/home",
    method: "get",
  });
}
