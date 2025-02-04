import { HighlightStyle } from "@codemirror/language";
import { EditorView } from "codemirror";
import { tags as t} from '@lezer/highlight';

export const chalky = "#e5c07b";
export const coral = "#e06c75";
export const cyan = "#56b6c2";
export const invalid = "#ffffff";
export const ivory = "#abb2bf";
export const stone = "#7d8799";
export const malibu = "#61afef";
export const sage = "#98c379";
export const whiskey = "#d19a66";
export const violet = "#c678dd";
export const darkBackground = "#21252b";
export const highlightBackground = "#2c313a";
export const background = "#282c34";
export const tooltipBackground = "#353a42";
export const selection = "#3E4451";
export const cursor = "#528bff";

export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor
}

export const Theme = EditorView.theme({
  // ".cm-cursor, .cm-dropCursor": {borderLeftColor: cursor},
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: selection},

  ".cm-panels": {backgroundColor: darkBackground, color: ivory},
  ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
  ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847"
  },
  // ".cm-foldPlaceholder": {
  //   backgroundColor: "transparent",
  //   border: "none",
  //   color: "#ddd"
  // },

  // ".cm-tooltip": {
  //   border: "none",
  //   backgroundColor: tooltipBackground
  // },
  // ".cm-tooltip .cm-tooltip-arrow:before": {
  //   borderTopColor: "transparent",
  //   borderBottomColor: "transparent"
  // },
  // ".cm-tooltip .cm-tooltip-arrow:after": {
  //   borderTopColor: tooltipBackground,
  //   borderBottomColor: tooltipBackground
  // },
  // ".cm-tooltip-autocomplete": {
  //   "& > ul > li[aria-selected]": {
  //     backgroundColor: highlightBackground,
  //     color: ivory
  //   }
  // }
}, {dark: true})

export const highlightStyle = HighlightStyle.define([
  {tag: t.keyword,
   color: violet},
  {tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
   color: coral},
  {tag: [t.function(t.variableName), t.labelName],
   color: malibu},
  {tag: [t.color, t.constant(t.name), t.standard(t.name)],
   color: whiskey},
  {tag: [t.definition(t.name), t.separator],
   color: ivory},
  {tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
   color: chalky},
  {tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
   color: cyan},
  {tag: [t.meta, t.comment],
   color: stone},
  {tag: t.strong,
   fontWeight: "bold"},
  {tag: t.emphasis,
   fontStyle: "italic"},
  {tag: t.strikethrough,
   textDecoration: "line-through"},
  {tag: t.link,
   color: stone,
   textDecoration: "underline"},
  {tag: t.heading,
   fontWeight: "bold",
   color: coral},
  {tag: [t.atom, t.bool, t.special(t.variableName)],
   color: whiskey },
  {tag: [t.processingInstruction, t.string, t.inserted],
   color: sage},
  {tag: t.invalid,
   color: invalid},
])