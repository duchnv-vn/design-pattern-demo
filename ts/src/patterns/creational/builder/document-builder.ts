type DocType = "pdf" | "word" | "excel";

class IDocument {
  title: string;
  header: string;
  bodyContent: string;
  footer: string;
  extension: string;
}

class PDFDocument extends IDocument {}

class WordDocument extends IDocument {}

class ExcelDocument extends IDocument {}

abstract class DocumentBuilder {
  document: IDocument;
  protected setTitle(title: string) {
    this.document.title = title;
    return this;
  }

  protected setHeader(header: string) {
    this.document.header = header;
    return this;
  }

  protected setBody(bd: string) {
    this.document.bodyContent = bd;
    return this;
  }

  protected setFooter(footer: string) {
    this.document.footer = footer;
    return this;
  }

  protected setExtension(extension: string) {
    this.document.extension = extension;
    return this;
  }

  abstract export(): IDocument;
}

class PDFDocumentBuilder extends DocumentBuilder {
  declare document: PDFDocument;

  export() {
    return this.document;
  }
}

class WordDocumentBuilder extends DocumentBuilder {
  declare document: WordDocument;

  setPageMargin() {
    return this;
  }

  export() {
    return this.document;
  }
}

class ExcelDocumentBuilder extends DocumentBuilder {
  declare document: ExcelDocument;

  toCSV(): string {
    return "";
  }

  export() {
    return this.document;
  }
}

type GenericDocBuilder<T extends DocType> = T extends "excel"
  ? ExcelDocumentBuilder
  : T extends "word"
  ? WordDocumentBuilder
  : PDFDocumentBuilder;

class DocumentClient<DT extends DocType> {
  documentBuilder: GenericDocBuilder<DT>;

  docType: DocType;

  static init<T extends DocType>(docType: T) {
    const instance = new DocumentClient<T>();
    instance.docType = docType;

    switch (docType) {
      case "pdf":
        (instance.documentBuilder as PDFDocumentBuilder) =
          new PDFDocumentBuilder();
        break;
      case "word":
        (instance.documentBuilder as WordDocumentBuilder) =
          new WordDocumentBuilder();
        break;
      case "excel":
        (instance.documentBuilder as ExcelDocumentBuilder) =
          new ExcelDocumentBuilder();
        break;
    }

    return instance;
  }

  build() {
    return this.documentBuilder;
  }
}

const docClient = DocumentClient.init("excel");
docClient.build().toCSV();
