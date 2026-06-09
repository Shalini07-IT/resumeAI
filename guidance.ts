export const ACTION_VERBS = {
  leadership: ['Spearheaded', 'Orchestrated', 'Directed', 'Championed', 'Pioneered', 'Guided', 'Mentored'],
  development: ['Developed', 'Engineered', 'Architected', 'Designed', 'Implemented', 'Built', 'Crafted'],
  optimization: ['Optimized', 'Accelerated', 'Streamlined', 'Enhanced', 'Improved', 'Reduced', 'Eliminated'],
  delivery: ['Delivered', 'Launched', 'Released', 'Deployed', 'Shipped', 'Executed', 'Completed'],
  collaboration: ['Collaborated', 'Partnered', 'Coordinated', 'Aligned', 'Facilitated', 'Liaised'],
  analysis: ['Analyzed', 'Evaluated', 'Assessed', 'Investigated', 'Diagnosed', 'Identified', 'Researched'],
  automation: ['Automated', 'Modernized', 'Migrated', 'Transformed', 'Integrated', 'Consolidated'],
};

export const ALL_ACTION_VERBS = Object.values(ACTION_VERBS).flat();

export const METRIC_EXAMPLES = [
  'Increased revenue by 25%',
  'Reduced load time by 40%',
  'Improved efficiency by 15%',
  'Saved $50K annually',
  'Served 1M+ users',
  'Reduced errors by 90%',
  'Cut deployment time by 60%',
  'Grew team from 2 to 8 engineers',
  'Processed 500K events/day',
  'Achieved 99.9% uptime',
];

export const FORM_GUIDANCE = {
  personal: {
    fullName: {
      placeholder: 'e.g., Alexandra Chen',
      tip: 'Use your full legal name as it appears on official documents.',
    },
    professionalTitle: {
      placeholder: 'e.g., Senior Full-Stack Engineer',
      tip: 'Match the job title you\'re applying for when possible.',
    },
    email: {
      placeholder: 'professional@email.com',
      tip: 'Use a professional email. Avoid nicknames or numbers.',
    },
    phone: {
      placeholder: '+1 (555) 123-4567',
      tip: 'Include country code for international applications.',
    },
    location: {
      placeholder: 'City, State / Remote',
      tip: 'City and state is sufficient. No need for full address.',
    },
    linkedinUrl: {
      placeholder: 'https://linkedin.com/in/yourprofile',
      tip: 'Customize your LinkedIn URL for a cleaner look.',
    },
    githubUrl: {
      placeholder: 'https://github.com/yourusername',
      tip: 'Include if you have public repositories relevant to the role.',
    },
    portfolioUrl: {
      placeholder: 'https://yourportfolio.com',
      tip: 'Essential for design, frontend, or freelance roles.',
    },
  },
  summary: {
    placeholder: 'Results-driven [Title] with [X] years of experience [key achievement]. Spearheaded [major initiative] resulting in [measurable outcome]. Proven track record of [core strength] that [business impact].',
    tip: 'Keep to 2-4 sentences. Lead with years of experience, then your biggest achievement, then your core value proposition.',
    minWords: 30,
    maxWords: 80,
  },
  experience: {
    accomplishment: {
      placeholder: 'Implemented X using Y technology, resulting in Z% improvement in [metric]',
      tip: 'Follow the CAR method: Challenge → Action → Result. Always quantify impact.',
    },
  },
  project: {
    description: {
      placeholder: 'Built X feature that reduced Y by Z%, used by N users',
      tip: 'Highlight technical complexity and real-world impact.',
    },
  },
};
