export const stripHtml = (html: string | null) => {
  if (!html) {
    return '';
  }

  return html.replace(/<\/?[^>]+(>|$)/g, '');
};

export const getRefinedMetaDescription = (text: string | null | undefined) => {
  if (!text) {
    return '';
  }

  return stripHtml(text).substring(0, 155);
};
