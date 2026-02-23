type ProjectLink = { url: string; label: string };

const projects: { title: string; description: string; links: ProjectLink[] }[] = [
  {
    title: 'Smart Lighting System',
    description:
      'Developed a scalable system architecture for seamless user management and device control. Maintained the system using AWS EC2 instances and load balancers to optimise performance and handle high traffic. Implemented microservices with JavaScript, AngularJS, NodeJS, and MongoDB. Users can register lighting devices and control settings via MQTT.',
    links: [{ url: 'https://github.com/deol-satish/Smart-Lighting-System', label: 'Code' }],
  },
  {
    title: 'Baby Monitoring System',
    description:
      'Led the scrum-based development of a web application for an IoT product that monitors babies and sends critical information through IFTTT triggers and Emergency Email Notifications. Used Express.js for web servers and REST APIs, Passport.js for authentication, AngularJS for front-end with Karma & Jasmine unit testing and Protractor for E2E testing. Enhanced UI/UX with Bootstrap and Semantic UI.',
    links: [
      { url: 'https://github.com/ajalaba/Baby-Monitoring-System', label: 'Code' },
      { url: 'https://github.com/ajalaba/Baby-Monitoring-System/blob/master/web/screenshots/chrome-Protractor%20Baby%20Monitoring%20System%20register%20device%20App%20testing%20redirect%20to%20register-device%20page%20error%20free%20.png', label: 'Screenshot' },
    ],
  },
  {
    title: 'Active Queue Management in L4S with Asynchronous Advantage Actor-Critic: A FreeBSD Networking Stack Perspective',
    description:
      'Research on active queue management in Low Latency, Low Loss, Scalable throughput (L4S) using Asynchronous Advantage Actor-Critic (A3C) from a FreeBSD networking stack perspective. Implemented A3C to refine buffer management in the FreeBSD kernel. Published in Future Internet (MDPI, 2024). Authors: Deol Satish, Jonathan Kua, Shiva Raj Pokhrel.',
    links: [
      { url: 'https://github.com/MPTCP-FreeBSD/FreeBSD-DRL-L4S', label: 'A3C-L4S (Code)' },
      { url: 'https://www.mdpi.com/1999-5903/16/8/265', label: 'Paper' },
    ],
  },
  {
    title: 'DDPG-MPCC: Multipath Congestion Control',
    description:
      'Industry-funded project (Comcast Corporation) combining Deep Deterministic Policy Gradient (DDPG) with online convex optimisation to optimise fairness and performance in multipath internet congestion control. Developed Linux kernel implementation and Bash testing scripts for automated experimentation, comparing DDPG-MPCC against state-of-the-art MPTCP solutions. Published in Future Internet (2024).',
    links: [
      { url: 'https://github.com/MPTCP-FreeBSD/DDPG-MPCC-SRC', label: 'Code' },
      { url: 'https://doi.org/10.3390/fi16020037', label: 'Paper' },
    ],
  },
  {
    title: 'Distilling Large Language Models for Network Active Queue Management',
    description:
      'Explores distilling Large Language Models for network Active Queue Management (AQM), extending the L4S-LLM research direction toward efficient deployment of ML-based congestion control. arXiv preprint (2025).',
    links: [{ url: 'https://arxiv.org/abs/2501.16734', label: 'Paper' }],
  },
  {
    title: 'Enabling Coexistence: Dynamic Channel Allocation for Scalable LEO-GEO Networks',
    description:
      'Addresses dynamic channel allocation to enable coexistence between Low Earth Orbit (LEO) and Geostationary (GEO) satellite networks, supporting scalable and efficient use of spectrum. Presented at IEEE COMNETSAT (2025).',
    links: [{ url: 'https://ieeexplore.ieee.org/document/11325050', label: 'Paper' }],
  },
  {
    title: 'Deakin RF-sensing: Correlated Knowledge Distillation for Posture Monitoring',
    description:
      'Research on combining RF sensing technology with Correlated Knowledge Distillation (CKD) theory for real-time human pose monitoring. Built teacher and student models using a fully Convolutional Neural Network with ResNet architecture. Developed proficiency in PyTorch, OpenCV, and AlphaPose. Published in IEEE Sensors Journal (2023).',
    links: [
      { url: 'https://github.com/MPTCP-FreeBSD/AX200-RF-Sensing', label: 'AX200-RF-Sensing (Code)' },
      { url: 'https://github.com/MPTCP-FreeBSD/SDR-RF', label: 'SDR-RF (Code)' },
      { url: 'https://doi.org/10.1109/JSEN.2023.3320131', label: 'Paper' },
    ],
  },
  {
    title: 'On Correlated Knowledge Distillation for Monitoring Human Pose with Radios',
    description:
      'Presents correlated knowledge distillation methods for radio-based human pose monitoring, complementing the IEEE Sensors Journal work on RF-sensing and CKD for posture estimation. arXiv e-prints (2023).',
    links: [{ url: 'https://arxiv.org/abs/2305.14829', label: 'Paper' }],
  },
];

function isGitHubLink(href: string): boolean {
  try {
    return new URL(href).hostname === 'github.com';
  } catch {
    return false;
  }
}

export default function Projects() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
        Projects
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Software projects and research work.
      </p>
      <ul className="mt-6 space-y-6">
        {projects.map((p) => (
          <li
            key={p.title}
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-4 py-4"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {p.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {p.description}
            </p>
            {p.links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-4">
                {p.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 underline dark:text-blue-400 hover:no-underline"
                  >
                    {isGitHubLink(link.url) ? (
                      <svg className="size-4 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="size-4 shrink-0" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                      </svg>
                    )}
                    {link.label} →
                  </a>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
