export default function localeDate(date: string, locale: string = 'zh-CN') {
  return new Date(date).toLocaleDateString(locale, {
    month: '2-digit',
    year: 'numeric',
    day: 'numeric',
  });
}
