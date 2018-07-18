const props = require("react-html-attributes");
const voids = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"];
const types = {
  "allowFullScreen": "Boolean",
  "async": "Boolean",
  "autoPlay": "Boolean",
  "capture": "Boolean",
  "checked": "Boolean",
  "children": "Array JSX",
  "cols": "Number",
  "controls": "Boolean",
  "default": "Boolean",
  "defer": "Boolean",
  "disabled": "Boolean",
  "formNoValidate": "Boolean",
  "hidden": "Boolean",
  "itemScope": "Boolean",
  "loop": "Boolean",
  "max": "Number",
  "min": "Number",
  "multiple": "Boolean",
  "muted": "Boolean",
  "noValidate": "Boolean",
  "onChange": "EventHandler",
  "open": "Boolean",
  "playsInline": "Boolean",
  "readOnly": "Boolean",
  "required": "Boolean",
  "reversed": "Boolean",
  "rowSpan": "Number",
  "rows": "Number",
  "scoped": "Boolean",
  "seamless": "Boolean",
  "selected": "Boolean",
  "size": "Number",
  "span": "Number",
  "start": "Number"
};
const reserved = ["module", "data", "type", "newtype", "class", "instance", "where", "derive", "if", "then", "else", "case", "of"];

printRecord = (elProps) => elProps.length ? `
  ( ${ elProps.map((p) =>
       `${p} :: ${types[p] || "String"}`).join("\n  , ")
     }
  )` : "()"

props.elements.html
  .map((e) => {
    const noChildren = voids.includes(e);
    const symbol = `${e}_`;
    return `
    type Props_${e} =${printRecord((props[e] || []).sort())}

    ${symbol}
      :: forall attrs attrs_
       . Union attrs attrs_ (SharedProps Props_${e})
      => Record attrs ${noChildren ? "" : `-> Array JSX`}
      -> JSX
    ${symbol} = ${noChildren ? "createVoidElement" : "createElement"} (unsafeCreateDOMComponent "${e}")
`;
}).forEach((x) => console.log(x.replace(/^\n\ {4}/, "").replace(/\n\ {4}/g, "\n")))
