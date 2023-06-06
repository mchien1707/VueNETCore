import { createI18n } from "vue-i18n";
import en from "@/i18n/en.json";
import da from "@/i18n/da.json";

export const i18n = createI18n({
  locale: "da",
  messages: {
    en: en,
    da: da,
  },
});
