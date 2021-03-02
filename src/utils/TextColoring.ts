const CSI = "\u001b[";

export default {
  red: (text: string) => (CSI + "31" + "m") + text + (CSI + "m"),
  green: (text: string ) => (CSI + "32" + "m") + text + (CSI + "m"),
  yellow: (text: string) => (CSI + "33" + "m") + text + (CSI + "m")
}