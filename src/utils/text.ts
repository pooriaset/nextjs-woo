export const stripHtml = (html: string | null) => {
  if (!html) {
    return '';
  }

  return html.replace(/<\/?[^>]+(>|$)/g, '');
};
