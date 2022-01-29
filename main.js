let addToCookie = "";

export const cookie = new Proxy(
  {},
  {
    get: (target, key) => {
      return parseCookies()[key];
    },
    set: (target, key, value) => {
      if (key == "default") {
        addToCookie = value;
        return value || true;
      } else if (value == undefined) {
        document.cookie = `${key}=delete; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
        return key || true;
      }
      document.cookie = `${key}=${value} ${addToCookie}`;
      return value || true;
    },
  }
);

const parseCookies = () => {
  let cookies = {};
  let cookiesSplit = document.cookie.split(";");
  for (let i of cookiesSplit) {
    let split = i.split("=");
    if (split.length < 2) continue;
    cookies[split.shift().trim()] = split.join("=").trim();
  }

  return cookies;
};
