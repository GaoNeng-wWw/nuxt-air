import enUS from './langs/enUS.json';
import zhCN from './langs/zhCN.json';
import enZodError from './zod/enUS.json';
import zhZodErrors from './zod/zhCN.json';

export default defineI18nConfig(() => {
  return {
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'zh',
    messages: {
      en: {
        ...enZodError,
        ...enUS,
      },
      zh: {
        ...zhZodErrors,
        ...zhCN,
      },
    },
    availableLocales: ['zh'],
  };
});
