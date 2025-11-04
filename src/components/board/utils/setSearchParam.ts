export function setSearchParam(key: string, value: string | number, { push = false } = {}) {
  const url = new URL(window.location.href);
  url.searchParams.set(key, String(value));
  if (push) {
    history.pushState(null, '', url.toString());
  } else {
    history.replaceState(null, '', url.toString());
  }
}