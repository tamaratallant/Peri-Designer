export interface Project {
  id: string;
  title: string;
  category: "Graphic Design" | "UI/UX Design" | "Identity" | "Package Design";
  description: string;
  descriptionRu: string;
  descriptionKy: string;
  image: string;
  tags: string[];
  date: string;
  client?: string;
}

export interface Service {
  id: string;
  title: string;
  titleRu: string;
  titleKy: string;
  description: string;
  descriptionRu: string;
  descriptionKy: string;
  price: string;
  iconName: string;
}

export interface Certificate {
  id: string;
  title: string;
  titleRu: string;
  titleKy: string;
  institution: string;
  date: string;
  skills: string[];
  imageType: "graphic" | "uiux";
}

export interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface ClientBrief {
  clientName?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  stylePreferences?: string[];
  description?: string;
}
