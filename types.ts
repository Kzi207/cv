
export interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
}

export interface Project {
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
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
  degree_en?: string;
  year: string;
  description: string;
  description_en?: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  message: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  icon?: 'school' | 'code' | 'work' | 'star';
}

export interface AboutTab {
  id: string;
  label: string;
  label_en?: string;
  icon: any; // Lucide icon component
  content: string;
  content_en?: string;
}

export interface FocusArea {
  id: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  icon: any; // Lucide icon
  color: string;
}
