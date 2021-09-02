var jsonValidator = require("is-my-json-valid");
const { toXML: json2xml } = require("jstoxml");
const json2yaml = require("json-to-pretty-yaml");
var json2html = require("json-to-html");
var yaml2json = require("js-yaml");
var Parser = require("fast-xml-parser").j2xParser;
var he = require("he");
//default options need not to set
var options = {
  attributeNamePrefix: "@_",
  attrNodeName: "attr", //default is 'false'
  textNodeName: "#text",
  ignoreAttributes: true,
  ignoreNameSpace: false,
  allowBooleanAttributes: false,
  parseNodeValue: true,
  parseAttributeValue: false,
  trimValues: true,
  cdataTagName: "__cdata", //default is 'false'
  cdataPositionChar: "\\c",
  parseTrueNumberOnly: false,
  arrayMode: false, //"strict"
  attrValueProcessor: (val, attrName) =>
    he.decode(val, { isAttributeValue: true }), //default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
  stopNodes: ["parse-me-as-string"]
};

var types = [
  {
    name: "json",
    what:
      "JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. ",
    why:
      "We use JSON because it’s extremely lightweight to send back and forth in HTTP requests and responses due to the small file size.",
    how: null,
    validator: (jsonTxt) => {
      return jsonValidator(jsonTxt);
    },
    log: (jsonTxt) => {
      return jsonValidator(jsonTxt).errors;
    },
    to: [
      {
        xml: (jsonTxt) => {
          return json2xml(jsonTxt);
        }
      },
      {
        "pretty yaml": (jsonTxt) => {
          return json2yaml.stringify(jsonTxt);
        }
      },
      {
        yaml: (jsonTxt) => {
          return json2yaml.stringify(jsonTxt);
        }
      },
      {
        html: (jsonTxt) => {
          return json2html(jsonTxt);
        }
      }
    ]
  },
  {
    name: "yaml",
    content: [
      {
        what:
          "YAML is a human-readable data-serialization language. It is commonly used for configuration files and in applications where data is being stored or transmitted."
      },
      {
        why: `- Delimiter collision resistancy
        YAML relies on indentation for structure, making it resistant to delimiter collision.
        - Security
        In and of itself, YAML has no executable commands. It is simply a data-representation language.`
      }
    ],

    validator: (yamlTxt) => {
      return jsonValidator(yaml2json.load(yamlTxt));
    },
    log: (jsonTxt) => {
      return jsonValidator(jsonTxt).errors;
    },
    to: [
      {
        json: (yamlTxt) => {
          return yaml2json.load(yamlTxt);
        }
      },
      {
        "pretty yaml": (jsonTxt) => {
          return json2yaml.stringify(jsonTxt);
        }
      }
    ]
  },
  {
    name: "xml",
    content: [
      {
        what:
          "XML (Extensible Markup Language) is a markup language similar to HTML, but without predefined tags to use. Instead, you define your own tags designed specifically for your needs."
      },
      {
        why: `XML offers its users many advantages, including:

        Simplicity
        Extensibility
        Interoperability
        Openness
        A core of experienced professionals`
      }
    ],

    validator: (xmlTxt) => {
      return Parser.validate(xmlTxt);
    },
    log: (xmlTxt) => {
      return Parser.validate(xmlTxt);
    },
    to: [
      {
        json: (xmlTxt) => {
          return Parser.parse(xmlTxt);
        }
      }
    ]
  }
];
export default types;
