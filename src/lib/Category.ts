export type Category = {
  id: number;
  name: string;
  children?: Category[];
};

export const categories: Category[] = [
  {
    id: 1,
    name: "실내자율주행로봇",
    children: [
      { id: 11, name: "서비스/안내형" },
      { id: 12, name: "서빙/배송형" },
      { id: 13, name: "물류/제조형" },
      { id: 14, name: "방역/청소형" },
      { id: 15, name: "가정용" },
    ],
  },
  {
    id: 2,
    name: "실외자율주행로봇",
    children: [
      { id: 21, name: "라스트마일 배송형" },
      { id: 22, name: "순찰/보안형" },
      { id: 23, name: "도로 청소/방역형" },
      { id: 24, name: "특수 산업형" },
    ],
  },
];