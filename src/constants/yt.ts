const YT_IFRAME_BASE_URL = "https://www.youtube.com/embed/";

export const YT_IFRAME_URL = (id: string) => {
  return `${YT_IFRAME_BASE_URL}${id}?&autoplay=1&mute=1`;
};