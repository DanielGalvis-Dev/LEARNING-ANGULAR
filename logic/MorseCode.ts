let SpanishMorseLanguage = {
  A: "·—",
  B: "—···",
  C: "—·—·",
  CH: "————",
  D: "—··",
  E: "·",
  F: "··—·",
  G: "——·",
  H: "····",
  I: "··",
  J: "·———",
  K: "—·—",
  L: "·—··",
  M: "——",
  N: "—·",
  Ñ: "——·——",
  O: "———",
  P: "·——·",
  Q: "——·—",
  R: "·—·",
  S: "···",
  T: "—",
  U: "··—",
  V: "···—",
  W: "·——",
  X: "—··—",
  Y: "—·——",
  Z: "——··",
};

let MorseSpanishLanguage = {
  ".—": "A",
  "—...": "B",
  "—.—.": "C",
  "————": "CH",
  "—..": "D",
  ".": "E",
  "..—.": "F",
  "——.": "G",
  "....": "H",
  "..": "I",
  ".———": "J",
  "—.—": "K",
  ".—..": "L",
  "——": "M",
  "—.": "N",
  "——.——": "Ñ",
  "———": "O",
  ".——.": "P",
  "——.—": "Q",
  ".—.": "R",
  "...": "S",
  "—": "T",
  "..—": "U",
  "...—": "V",
  ".——": "W",
  "—..—": "X",
  "—.——": "Y",
  "——..": "Z",
};

const validation = (text: string = "") => {
  const isMorse = text.trim().includes(".") || text.trim().includes("—");
  let language = isMorse ? MorseSpanishLanguage : SpanishMorseLanguage;
  translate(text, language, isMorse);
};

const translate = (
  text: string,
  language: Record<string, string>,
  isMorse: boolean
) => {
  let divideWor = isMorse ? text.split(" ") : text.split("");
  let search = divideWor.map((char) => language[char.toUpperCase()] || char);
  let uniteWor = isMorse ? search.join("") : search.join(" ");
  console.log(uniteWor);
};

let text = ".——. .—. .. —— . .—. .—   .——. .—. ..— . —... .—"; // Código Morse para "AB"
validation(text); // Esto debería imprimir "AB"

let text2 = "primera prueba"; // Texto en español
validation(text2); // Esto debería imprimir ".- -..."
