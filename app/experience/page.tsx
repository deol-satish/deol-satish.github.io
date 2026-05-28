import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase } from 'lucide-react';

const experiences: {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}[] = [
  {
    role: 'Software Developer',
    company: 'ITMagnet',
    location: 'Sydney, AU',
    period: 'April 2025 – Present',
    bullets: [
      'Contributed to the development and continuous enhancement of Onsite ERP systems, supporting both internal operational workflows and client-facing business platforms.',
      'Designed and built a Headless CMS dashboard using Builder.io, enabling flexible content management, faster UI iteration cycles, and improved editorial efficiency.',
      'Developed a Purchase Requisition system for internal employees, streamlining approval workflows, improving procurement tracking, and enhancing operational transparency.',
      'Implemented the ApplyEasy integration with OnsiteLive, enabling secure and seamless data exchange between external applications and internal enterprise systems.',
      'AI & Automation: Led integration of Large Language Models (LLMs) into production workflows, focusing on prompt engineering and AI-driven validation/chatbot systems. Enhanced the AI-powered Onsite Quote Validation engine using NLP techniques to improve data interpretation accuracy and automated decision support.',
      'IoT & Device Evaluation: Conducted structured testing and comparative analysis of IoT devices (IoTTag, Netstar) for large-scale mining asset tracking; evaluated telemetry accuracy, GPS reliability, battery performance, and API integration feasibility to inform client deployment strategy.',
    ],
  },
  {
    role: 'Associate Research Fellow',
    company: 'Deakin University',
    location: 'Melbourne, AU',
    period: 'April 2025 – October 2025',
    bullets: [
      'SmartSat Cooperative Research Centre (Defence Project) - Developed intelligent dynamic spectrum allocation (DSA) algorithms leveraging Deep Q-Networks (DQN), Asynchronous Advantage Actor-Critic (A2C), and Large Language Models (LLMs) to enable opportunistic reuse of underutilised geostationary (GEO) satellite frequency bands by low Earth orbit (LEO) satellite systems.',
      'Contributed to interdisciplinary research integrating satellite communications, artificial intelligence, and signal processing to enhance spectrum efficiency and optimise satellite network performance.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'Deakin University',
    location: 'Melbourne, AU',
    period: 'May 2024 – April 2025',
    bullets: [
      'Leveraged Large Language Models (LLMs) (Llama3/GPT2/T5) to enhance L4S performance by predicting congestion events within the FreeBSD Network stack. Created an independent AQM-LLM platform.',
      'Designed and implemented a modified Low Latency Low Loss Scalable Throughput (L4S) Active Queue Management (AQM) algorithm within the FreeBSD kernel using the C programming language.',
      'Implemented asynchronous gradient descent optimisation (A3C ML model) to refine buffer management in our custom L4S FreeBSD, achieving sub-5ms latency at the 99th percentile.',
      "Managed operations at Deakin's IoT & SE lab, guiding students in their final-year research.",
    ],
  },
  {
    role: 'Cybersecurity Engineer',
    company: 'Larson & Turbo Technology Services',
    location: 'Pune, IN',
    period: 'Oct 2023 – Jan 2024',
    bullets: [
      'Provided client-facing cybersec consulting services to Honeywell Corporation as part of a collaborative team.',
      'Conducted risk analysis, identified potential security threats using vulnerability scanning tools, and differentiated based on CVE scores.',
      'Enhanced the security of Linux-embedded devices by identifying system vulnerabilities, updating core packages, and applying patches.',
    ],
  },
  {
    role: 'Research Assistant',
    company: 'Deakin University',
    location: 'Melbourne, AU',
    period: 'Jun 2023 – Oct 2023',
    bullets: [
      'Worked on an industry-funded project by Comcast Corporation that combined DDPG with online convex optimisation to optimise fairness and performance in challenging multipath internet congestion control scenarios.',
      'Developed Linux kernel implementation and Bash testing scripts for automated experimentation, comparing DDPG-MPCC performance against state-of-the-art MPTCP solutions.',
      'Led a project to study the feasibility of a novel idea combining RF sensing technology with Correlated Knowledge Distillation (CKD) theory for real-time human pose monitoring.',
      'Developed proficiency in PyTorch and OpenCV, gained hands-on experience with AlphaPose and built teacher and student models using a sophisticated, fully Convolutional Neural Network with ResNet architecture.',
    ],
  },
];

export default function ExperiencePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <div className="flex items-center gap-3">
        <Briefcase className="size-6 text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="gradient-text">Work Experience</span>
        </h1>
      </div>
      <p className="mt-2 text-muted-foreground">Professional roles and key contributions.</p>

      <ol className="mt-8 space-y-6">
        {experiences.map((exp) => (
          <li key={`${exp.role}-${exp.company}-${exp.period}`}>
            <Card>
              <CardContent className="p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-semibold">{exp.role}</h2>
                  <Badge variant="outline">{exp.period}</Badge>
                </div>
                <p className="mt-1 text-sm font-medium">
                  {exp.company}
                  <span className="text-muted-foreground"> · {exp.location}</span>
                </p>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-foreground/90">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </li>
        ))}
      </ol>
    </div>
  );
}
