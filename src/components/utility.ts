export type TagType =
  | "h1"
  | "h2"
  | "h3"
  | "p"
  | "ul"
  | "li"
  | "row"
  | "div"
  | "img"
  | "a"
  | "span";

export type ContentType = {
  type: string;
  content: ContentType[] | string;
};

export type StructureType = {
  [key: string]: {
    tag: TagType;
    className?: string;
  };
};

export type DataType = {
  [key: string]: string;
};

export type ValidJSON = {
  title: string;
  contents: ContentType[];
  structure: StructureType;
  data: DataType;
};

export const initialJSON: ValidJSON = {
  title: "My awesome Doc",
  contents: [
    {
      type: "title",
      content: "Is an awesome Doc",
    },
  ],
  structure: {
    title: {
      tag: "h1",
      className: "uppercase text-center text-xl p-0 m-0 text-black",
    },
  },
  data: {},
};
