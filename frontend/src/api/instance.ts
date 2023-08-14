export const baseUrl = 'http://localhost:3333';

export const instance = {
  get: (url: string) => fetch(url).then(res => res.json()),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: (url: string, body: any) =>
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: (url: string, body: any) =>
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => res.json()),
  delete: (url: string) =>
    fetch(url, {
      method: 'DELETE',
    }).then(res => res.json()),
};
