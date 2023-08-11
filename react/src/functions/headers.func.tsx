
export function addAuthHeader(headers: Headers) {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    headers.append('Authorization', localStorage.getItem('accessToken') as string);
  }
}