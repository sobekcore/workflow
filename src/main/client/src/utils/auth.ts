export function navigateToLogin(): void {
  window.location.assign('/login');
}

export function navigateToLogout(): void {
  window.location.assign(`${import.meta.env.VITE_API_URL}/logout`);
}

export function navigateToOAuth2Google(): void {
  window.location.assign(`${import.meta.env.VITE_API_URL}/oauth2/authorization/google`);
}

export function navigateToOAuth2GitHub(): void {
  window.location.assign(`${import.meta.env.VITE_API_URL}/oauth2/authorization/github`);
}
