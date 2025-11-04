export function removeSearchParam(key: string, { push = false } = {}) {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  if (push) history.pushState(null, '', url.toString());
  else history.replaceState(null, '', url.toString());
}