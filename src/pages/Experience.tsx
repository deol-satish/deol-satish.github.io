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
      'Shipped features across the Onsite ERP suite, supporting internal operational workflows and client-facing business platforms.',
      'Built an internal Purchase Requisition system with a team that streamlined approval workflows and improved procurement tracking and transparency.',
      'Delivered the ApplyEasy integration with OnsiteLive for secure, seamless data exchange between an external form-filler application and internal enterprise systems.',
      'Designed a Headless CMS dashboard (Builder.io), enabling flexible content management and faster UI iteration cycles.',
      "Maintain and operate Azure cloud infrastructure powering Onsite Services' production and internal platforms.",
      'Ran structured evaluation of IoT tracking devices (IoTTag, Netstar) for large-scale mining asset tracking — telemetry accuracy, GPS reliability, battery, and API feasibility — to inform client deployment strategy.',
      'Led integration of Large Language Models (LLMs) into production workflows — prompt engineering and AI-driven validation/chatbot systems — and re-architected the AI-powered Onsite Quote Validation engine with NLP to improve interpretation accuracy and automated decision support.',
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
      'Leveraged Large Language Models (Llama3 / GPT-2 / T5) to predict congestion events in the FreeBSD network stack, boosting L4S (Low Latency, Low Loss, Scalable throughput) performance; built a standalone AQM-LLM platform.',
      'Designed and implemented a modified L4S Active Queue Management (AQM) algorithm in the FreeBSD kernel in C, and applied asynchronous gradient descent (A3C) to refine buffer management — achieving sub-5ms latency at the 99th percentile.',
      'Delivered an industry-funded project for Comcast, combining DDPG with online convex optimisation to improve fairness and performance in multipath congestion control; built a Linux kernel implementation and Bash automation benchmarking DDPG-MPCC against state-of-the-art MPTCP.',
      'Led a feasibility study pairing RF sensing with Correlated Knowledge Distillation (CKD) for real-time human pose monitoring; built teacher/student ResNet-based fully convolutional models in PyTorch and OpenCV (AlphaPose).',
      "Managed operations at Deakin's IoT & SE lab, mentoring students through final-year research.",
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
];

export default function Experience() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
        Work Experience
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Professional roles and key contributions.
      </p>
      <ul className="mt-6 space-y-8">
        {experiences.map((exp) => (
          <li
            key={`${exp.role}-${exp.company}-${exp.period}`}
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-4 py-4"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {exp.role}
              </h2>
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {exp.period}
              </span>
            </div>
            <p className="mt-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {exp.company}
              <span className="text-zinc-500 dark:text-zinc-500"> · {exp.location}</span>
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
