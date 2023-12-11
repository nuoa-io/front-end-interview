export enum CareerEnum {
  STUDENT = "Student",
  WORKER = "Worker",
  RETIRED = "Retired",
}

export enum JobEnum {
  ELEMENTARY_SCHOOL = "Elementary School",
  MIDDLE_SCHOOL = "Middle School",
  HIGH_SCHOOL = "High School",
  UNIVERSITY = "University",
  ACCOUNTANT = "Accountant",
  SALES = "Sales",
  CONSTRUCTOR = "Constructor",
  BANKER = "Banker",
  ENGINEER = "Engineer",
  OTHERS = "Others",
}

export const Jobs = {
  [CareerEnum.STUDENT]: [
    JobEnum.ELEMENTARY_SCHOOL,
    JobEnum.MIDDLE_SCHOOL,
    JobEnum.HIGH_SCHOOL,
    JobEnum.UNIVERSITY,
  ],
  [CareerEnum.WORKER]: [
    JobEnum.ACCOUNTANT,
    JobEnum.SALES,
    JobEnum.CONSTRUCTOR,
    JobEnum.BANKER,
    JobEnum.ENGINEER,
    JobEnum.OTHERS,
  ],
  [CareerEnum.RETIRED]: [],
};

export interface UserType {
  id: number;
  name: string;
  age: number;
  career: CareerEnum;
  job: JobEnum | null;
}

export type ErrorType = {
  name?: string;
  age?: string;
  job?: string;
  career?: string;
  common?: string;
};

export type CallbackSuccess = {
  (): void;
};
