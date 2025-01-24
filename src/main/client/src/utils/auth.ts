export function navigateToLogin(): void {
  window.location.assign(`${import.meta.env.VITE_API_URL}/login`);
}

export function navigateToLogout(): void {
  window.location.assign(`${import.meta.env.VITE_API_URL}/logout`);
}
