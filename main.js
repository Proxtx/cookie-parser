export const cookie = new Proxy(
  {},
  {
    get: (target, key) => {
      return parseCookies()[key];
    },
    set: (target, key, value) => {
      let cookies = parseCookies();
      cookies[key] = value;
      buildCookies(cookies);
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

const buildCookies = (cookies) => {
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
  for (let i of Object.keys(cookies)) {
    if (cookies[i] == undefined) continue;
    document.cookie = `${i}=${cookies[i]}; `;
  }
};
