export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  image: string;
}

export interface Track {
  title: string;
  artist: string;
  url: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
  description: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon?: 'school' | 'code' | 'work' | 'star';
}

export interface AboutTab {
  id: string;
  label: string;
  icon: any; // Lucide icon component
  content: string;
}

export interface FocusArea {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon
  color: string;
}