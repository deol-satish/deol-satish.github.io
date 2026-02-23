import { Link } from 'react-router-dom';
import profilePic from '../assets/ProfilePic.jpg';

const contactLinks = [
  { label: 'Business Email', href: 'mailto:deol.satish@outlook.com', text: 'deol.satish@outlook.com' },
  { label: 'GitHub', href: 'https://github.com/deol-satish', text: '@deol-satish' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/deol-satish', text: 'linkedin.com/in/deol-satish' },
];

export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center">
      <main className="w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
        {/* Profile card - centered */}
        <aside className="flex shrink-0 flex-col items-center text-center lg:w-72">
            <img
              src={profilePic}
              alt="Deol Satish"
              className="h-44 w-44 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700 sm:h-52 sm:w-52"
            />
            <h2 className="mt-4 text-xl font-bold text-zinc-900 dark:text-white">Deol Satish</h2>
            <p className="mt-1 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Software Developer
            </p>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">@ITMagnet</p>

            {/* Resume - above Contact me */}
            <section className="mt-8 w-full border-t border-zinc-200 pt-6 dark:border-zinc-700">
              <a
                href="https://docs.google.com/document/d/1uEx1EoojyLFEslbwZQtfAenkJtRI_IXk-XZwYWRhyCk/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-4 text-base font-semibold text-white shadow-md transition hover:bg-zinc-800 active:scale-[0.98] dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:active:scale-[0.98]"
              >
                <svg className="size-5 shrink-0" fill="none" strokeWidth={2} stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
                View my resume
              </a>
            </section>

            {/* Contact me - below profile */}
            <section className="mt-8 w-full border-t border-zinc-200 pt-6 dark:border-zinc-700">
              <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white">
                Contact me
              </h3>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="https://github.com/deol-satish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-full bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                  aria-label="GitHub"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/deol-satish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-10 items-center justify-center rounded-md bg-[#0A66C2] text-white hover:bg-[#004182]"
                  aria-label="LinkedIn"
                >
                  <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:deol.satish@outlook.com"
                  className="flex size-10 items-center justify-center rounded-md bg-[#EA4335] text-white hover:bg-[#c5221f]"
                  aria-label="Email"
                >
                  <svg className="size-5" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </a>
              </div>
              <ul className="mt-4 space-y-1 pl-0 text-left text-sm text-zinc-700 dark:text-zinc-300">
                {contactLinks.map(({ label, href, text }) => (
                  <li key={label}>
                    <strong>{label}: </strong>
                    <a href={href} className="text-blue-600 underline dark:text-blue-400 hover:no-underline">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1 space-y-0">
          <h1 className="mb-4 text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Deol Satish
          </h1>

          <hr className="my-6 border-zinc-300 dark:border-zinc-600" />

          <section className="space-y-2 py-6">
            <ul className="list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
              <li>
              Versatile Software Engineer Honours graduate with a strong foundation in AI/ML development, Web Development and Cybersecurity. Published research papers with Comcast and Amazon demonstrating innovation in optimising network performance using advanced algorithms and machine learning.
              </li>
            </ul>
          </section>

          <hr className="my-6 border-zinc-300 dark:border-zinc-600" />

          <section className="py-6">
            <h3 className="text-sm font-bold uppercase tracking-wide text-black dark:text-white">
              About me
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-700 dark:text-zinc-300">
              <li><strong>Programming Languages:</strong> C, C#, Python, Bash, Java, JavaScript, TypeScript.</li>
              <li><strong>Machine Learning &amp; Data Science:</strong> Large-Language Models, Hugging Face, Scikit-learn, TensorFlow, PyTorch, OpenAI Gym, OpenCV, Spark, Hadoop, Statistics, data wrangling, Data Analytics (TimeSeries, ARIMA).</li>
              <li><strong>Security:</strong> Vulnerability Scanning, Risk Assessment and Mitigation, Network Protocols—TCP/IP &amp; AQM, Network Traffic Monitoring, Patching and Fixes, Kernel Programming.</li>
              <li><strong>Web Development:</strong> .NET 10 (Backend), Node.js (Express), Frontend (Angular/React), Spring Boot, Maven, Apache Server, REST API, HTML.</li>
              <li><strong>Tools &amp; Platform:</strong> Git, AWS (EC2), Java Android Development.</li>
              <li><strong>Interests:</strong> Books, Chess, LeetCode, Cybersecurity, Science, Astronomy, Physics &amp; Math, Teaching, Mentoring; hiking, cycling, soccer, meditation, table tennis.</li>
            </ul>
          </section>

          <hr className="my-6 border-zinc-300 dark:border-zinc-600" />

          <p className="pb-6 space-y-1">
            <Link
              to="/projects"
              className="block text-blue-600 underline dark:text-blue-400 hover:no-underline"
            >
              &gt; Learn more in my Projects
            </Link>
            <Link
              to="/experience"
              className="block text-blue-600 underline dark:text-blue-400 hover:no-underline"
            >
              &gt; View my Work Experience
            </Link>
          </p>
        </div>
      </div>
    </main>
    </div>
  );
}
