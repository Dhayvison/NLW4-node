const CSI = "\u001b[";

export const error = (text: TemplateStringsArray) => (CSI + "31" + "m") + text + (CSI + "m");
export const success = (text: TemplateStringsArray) => (CSI + "32" + "m") + text + (CSI + "m");
export const warning = (text: TemplateStringsArray) => (CSI + "33" + "m") + text + (CSI + "m");
