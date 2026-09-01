export type AIProject = {
  id: string;
  name: string;
  /** Cover image — a path under /public. Remote hosts are not allowed;
   *  add one to `remotePatterns` in next.config.mjs first if that changes. */
  image?: string;
  problem: string;
  architecture: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
};

/**
 * AI project lab.
 *
 * Empty on purpose — no project is listed until it exists. Add an entry and
 * the lab renders it in place of one of the empty slots.
 */
export const aiProjects: AIProject[] = [];

/** How many slots the lab shows while the list is short. */
export const LAB_SLOTS = 3;
