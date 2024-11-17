export type SubsectionModel = {
  id: number;
  title: string;
  from?: Date;
  to?: Date;
  description: string;
};

export type SectionModel = {
  id: number;
  title: string;
  subsections: SubsectionModel[];
};
