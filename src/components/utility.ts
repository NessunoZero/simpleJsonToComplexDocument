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

export type DataType = {
  [key: string]: string;
};

export type ReuseStructureItem = {
  type: string;
  data: DataType;
  children?: ReuseStructureItem[];
};

export type StructureType = {
  [key: string]: {
    tag: TagType;
    className?: string;
    data?: string[];
    children?: ReuseStructureItem[];
  };
};

export type ContentType = {
  type: string;
  data: DataType;
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
      data: { content: "Awesome params managment" },
    },
    {
      type: "twoSides",
      data: {
        left: "test left",
        right: "test right",
      },
    },
  ],
  structure: {
    title: {
      tag: "h1",
      className: "uppercase text-center text-xl p-0 m-0 text-black",
    },
    twoSides: {
      tag: "div",
      className: "w-full flex items-center justify-between",
      data: ["left", "right"],
      children: [
        {
          type: "oneChild",
          data: { content: "left" },
        },
        {
          type: "oneChild",
          data: { content: "right" },
        },
      ],
    },
    oneChild: {
      tag: "p",
      className: "capitalize",
    },
  },
  data: {},
};
