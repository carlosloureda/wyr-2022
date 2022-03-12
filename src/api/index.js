const Api = {
  get: async (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ ok: true });
      }, 1500);
    });
  },
  post: async (url, options) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (url === "/login") {
          resolve({ id: options.author });
        } else {
          resolve({ ok: true });
        }
      }, 1500);
    });
  },
};
export default Api;
