import { Card, CardContent } from '@/components/ui/card';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';

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
      {
        url: 'https://github.com/ajalaba/Baby-Monitoring-System/blob/master/web/screenshots/chrome-Protractor%20Baby%20Monitoring%20System%20register%20device%20App%20testing%20redirect%20to%20register-device%20page%20error%20free%20.png',
        label: 'Screenshot',
      },
    ],
  },
  {
    title:
      'Active Queue Management in L4S with Asynchronous Advantage Actor-Critic: A FreeBSD Networking Stack Perspective',
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

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <FolderGit2 className="size-6 text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="gradient-text">Projects</span>
        </h1>
      </div>
      <p className="mt-2 text-muted-foreground">Software projects and research work.</p>

      <ul className="mt-8 space-y-5">
        {projects.map((p) => (
          <li key={p.title}>
            <Card>
              <CardContent className="p-5">
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="mt-2 text-sm text-foreground/85">{p.description}</p>
                {p.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-4">
                    {p.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 underline-offset-4 hover:underline dark:text-blue-400"
                      >
                        {isGitHubLink(link.url) ? (
                          <Github className="size-4 shrink-0" />
                        ) : (
                          <ExternalLink className="size-4 shrink-0" />
                        )}
                        {link.label} →
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
