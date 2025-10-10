type DocType = "pdf" | "word" | "excel";

class IDocument {
  title: string;
  header: string;
  bodyContent: string;
  footer: string;
  extension: string;
}

class PDFDocument extends IDocument {}

class WordDocument extends IDocument {
  margin: number;
}

class ExcelDocument extends IDocument {}

abstract class DocumentBuilder {
  document: IDocument;
  setTitle(title: string) {
    this.document.title = title;
    return this;
  }

  setHeader(header: string) {
    this.document.header = header;
    return this;
  }

  setBody(bd: string) {
    this.document.bodyContent = bd;
    return this;
  }

  setFooter(footer: string) {
    this.document.footer = footer;
    return this;
  }

  setExtension(extension: string) {
    this.document.extension = extension;
    return this;
  }

  abstract export(): IDocument;
}

class PDFDocumentBuilder extends DocumentBuilder {
  declare document: PDFDocument;

  constructor() {
    super();
    this.document = new PDFDocument();
  }

  export() {
    return this.document;
  }
}

class WordDocumentBuilder extends DocumentBuilder {
  declare document: WordDocument;

  constructor() {
    super();
    this.document = new WordDocument();
  }

  setPageMargin(margin: number) {
    this.document.margin = margin;
    return this;
  }

  export() {
    return this.document;
  }
}

class ExcelDocumentBuilder extends DocumentBuilder {
  declare document: ExcelDocument;

  constructor() {
    super();
    this.document = new ExcelDocument();
  }

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

export class DocumentClient<DT extends DocType> {
  documentBuilder: GenericDocBuilder<DT>;

  docType: DocType;

  static init<T extends DocType>(docType: T) {
    const instance = new DocumentClient<T>();
    instance.docType = docType;
    let extension = "";
    switch (docType) {
      case "pdf":
        (instance.documentBuilder as PDFDocumentBuilder) =
          new PDFDocumentBuilder();
        extension = "pdf";
        break;
      case "word":
        (instance.documentBuilder as WordDocumentBuilder) =
          new WordDocumentBuilder();
        extension = "doc";
        break;
      case "excel":
        (instance.documentBuilder as ExcelDocumentBuilder) =
          new ExcelDocumentBuilder();
        extension = "xlx";
        break;
    }

    instance.documentBuilder.setExtension(extension);
    return instance;
  }

  build() {
    return this.documentBuilder;
  }
}
