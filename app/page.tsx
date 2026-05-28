import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FileText, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const contactLinks = [
  { label: 'Business Email', href: 'mailto:deol.satish@outlook.com', text: 'deol.satish@outlook.com' },
  { label: 'GitHub', href: 'https://github.com/deol-satish', text: '@deol-satish' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/deol-satish', text: 'linkedin.com/in/deol-satish' },
];

const skills = [
  'TypeScript', 'Python', 'C / C#', 'Java', 'PyTorch', 'TensorFlow',
  'Next.js', 'React', '.NET', 'Node.js', 'AWS', 'Linux Kernel',
];

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-center lg:gap-14">
        <aside className="flex shrink-0 flex-col items-center text-center lg:w-80">
          <div className="relative">
            <div className="absolute inset-0 -m-2 rounded-full bg-gradient-to-tr from-primary/30 via-foreground/20 to-primary/30 blur-xl" />
            <Image
              src="/ProfilePic.jpg"
              alt="Deol Satish"
              width={224}
              height={224}
              className="relative h-44 w-44 rounded-full object-cover ring-2 ring-border sm:h-52 sm:w-52"
              priority
            />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight">Deol Satish</h2>
          <p className="mt-1 text-sm font-medium text-muted-foreground">Software Developer</p>
          <p className="text-sm text-muted-foreground/80">@ITMagnet</p>

          <Card className="mt-6 w-full">
            <CardContent className="p-4">
              <Button asChild size="lg" className="w-full">
                <a
                  href="https://docs.google.com/document/d/1uEx1EoojyLFEslbwZQtfAenkJtRI_IXk-XZwYWRhyCk/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText />
                  View my resume
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="mt-4 w-full">
            <CardContent className="p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact me</h3>
              <div className="mt-3 flex items-center justify-center gap-3">
                <a
                  href="https://github.com/deol-satish"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:scale-110 hover:bg-primary/90"
                >
                  <Github className="size-5" />
                </a>
                <a
                  href="https://linkedin.com/in/deol-satish"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-full bg-[#0A66C2] text-white transition hover:scale-110 hover:bg-[#004182]"
                >
                  <Linkedin className="size-5" />
                </a>
                <a
                  href="mailto:deol.satish@outlook.com"
                  aria-label="Email"
                  className="flex size-10 items-center justify-center rounded-full bg-[#EA4335] text-white transition hover:scale-110 hover:bg-[#c5221f]"
                >
                  <Mail className="size-5" />
                </a>
              </div>
              <ul className="mt-4 space-y-1 text-left text-sm text-muted-foreground">
                {contactLinks.map(({ label, href, text }) => (
                  <li key={label}>
                    <strong className="text-foreground">{label}: </strong>
                    <a href={href} className="text-blue-500 underline hover:no-underline dark:text-blue-400">
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>

        <div className="min-w-0 flex-1 space-y-6">
          <div>
            <Badge variant="outline" className="mb-3 animate-shimmer">
              Available for opportunities
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Hi, I&apos;m <span className="gradient-text">Deol</span>.
            </h1>
            <p className="mt-3 text-lg text-muted-foreground">
              Versatile Software Engineer Honours graduate with a strong foundation in AI/ML
              development, Web Development, and Cybersecurity. Published research papers with
              Comcast and Amazon demonstrating innovation in optimising network performance using
              advanced algorithms and machine learning.
            </p>
          </div>

          <Separator />

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About me</h3>
            <ul className="mt-3 space-y-2 text-sm text-foreground/90">
              <li>
                <strong>Programming Languages:</strong> C, C#, Python, Bash, Java, JavaScript,
                TypeScript.
              </li>
              <li>
                <strong>Machine Learning &amp; Data Science:</strong> Large-Language Models, Hugging
                Face, Scikit-learn, TensorFlow, PyTorch, OpenAI Gym, OpenCV, Spark, Hadoop,
                Statistics, data wrangling, Data Analytics (TimeSeries, ARIMA).
              </li>
              <li>
                <strong>Security:</strong> Vulnerability Scanning, Risk Assessment and Mitigation,
                Network Protocols—TCP/IP &amp; AQM, Network Traffic Monitoring, Patching and Fixes,
                Kernel Programming.
              </li>
              <li>
                <strong>Web Development:</strong> .NET 10 (Backend), Node.js (Express), Frontend
                (Angular/React/Next.js), Spring Boot, Maven, Apache Server, REST API, HTML.
              </li>
              <li>
                <strong>Tools &amp; Platform:</strong> Git, AWS (EC2), Java Android Development.
              </li>
              <li>
                <strong>Interests:</strong> Books, Chess, LeetCode, Cybersecurity, Science,
                Astronomy, Physics &amp; Math, Teaching, Mentoring; hiking, cycling, soccer,
                meditation, table tennis.
              </li>
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Tech I love
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/projects">
                Projects
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/experience">
                Work Experience
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/publications">
                Publications
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
