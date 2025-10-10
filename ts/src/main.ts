import { DocumentClient } from "./patterns/creational/builder/document-builder";

const docClient = DocumentClient.init("word");

const docA = docClient
  .build()
  .setTitle("Document A")
  .setHeader("header AAA")
  .setBody("Hello World")
  .setFooter("footer BBB")
  .setPageMargin(5)
  .export();

console.log(docA);
