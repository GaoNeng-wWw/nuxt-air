import type { MentionNodeAttrs } from "@tiptap/extension-mention";
import type { SuggestionOptions } from "@tiptap/suggestion";

export const createSuggestion = <SuggestionItem,Attrs=MentionNodeAttrs>(
  opts: Omit<SuggestionOptions<SuggestionItem, Attrs>, 'editor'>
) => {
  return opts as SuggestionOptions<SuggestionItem, Attrs>;
}