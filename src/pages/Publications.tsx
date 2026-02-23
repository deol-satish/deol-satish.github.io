const publications = [
  {
    citation:
      'Hendy N, Al-Hourani A, Pokhrel SR, Satish D, Sithamparanathan K, Kua J. Enabling coexistence: Dynamic channel allocation for scalable LEO-GEO networks. In: 2025 IEEE International Conference on Communication, Networks and Satellite (COMNETSAT). 2025:144–150. IEEE.',
    link: 'https://ieeexplore.ieee.org/document/11325050',
    linkLabel: 'IEEE Xplore',
    abstract:
      'Addresses dynamic channel allocation to enable coexistence between Low Earth Orbit (LEO) and Geostationary (GEO) satellite networks, supporting scalable and efficient use of spectrum.',
  },
  {
    citation:
      'Pokhrel SR, Satish D, Kua J, Walid A. Distilling large language models for network active queue management. arXiv preprint. 2025; arXiv:2501.16734.',
    link: 'https://arxiv.org/abs/2501.16734',
    linkLabel: 'arXiv',
    abstract:
      'Explores distilling Large Language Models for network Active Queue Management (AQM), extending the L4S-LLM research direction toward efficient deployment of ML-based congestion control.',
  },
  {
    citation:
      'Pokhrel SR, Kua J, Satish D, Williams P, Zaslavsky A, Loke SW, Choi J. On correlated knowledge distillation for monitoring human pose with radios. arXiv e-prints. 2023; arXiv:2305.14829.',
    link: 'https://arxiv.org/abs/2305.14829',
    linkLabel: 'arXiv',
    abstract:
      'Presents correlated knowledge distillation methods for radio-based human pose monitoring, complementing the IEEE Sensors Journal work on RF-sensing and CKD for posture estimation.',
  },
  {
    citation:
      'Pokhrel SR, Kua J, Satish D, Williams P, Zaslavsky A, Loke SW, Choi J. Deakin RF-sensing: Experiments on correlated knowledge distillation for monitoring human postures with radios. IEEE Sensors Journal. 2023;23(22):28399–28410. IEEE.',
    link: 'https://doi.org/10.1109/JSEN.2023.3320131',
    linkLabel: 'DOI',
    abstract:
      'This paper explores the use of RF sensing technology together with Correlated Knowledge Distillation (CKD) theory for real-time human posture monitoring. Teacher and student models were built using a fully Convolutional Neural Network with ResNet architecture, demonstrating the feasibility of radio-based pose estimation and knowledge distillation for lightweight deployment.',
  },
  {
    citation:
      'Satish D, Kua J, Pokhrel SR. Active queue management in L4S with asynchronous advantage actor-critic: A FreeBSD networking stack perspective. Future Internet. 2024;16(8):265. MDPI.',
    link: 'https://doi.org/10.3390/fi16080265',
    linkLabel: 'DOI',
    abstract:
      'This work presents an L4S (Low Latency, Low Loss, Scalable throughput) Active Queue Management (AQM) design that uses Asynchronous Advantage Actor-Critic (A3C) reinforcement learning to improve buffer management in the FreeBSD network stack. By integrating Large Language Models to predict congestion events and implementing a modified AQM algorithm in the kernel, the system achieves sub-5ms latency at the 99th percentile.',
  },
  {
    citation:
      'Pokhrel SR, Kua J, Satish D, Ozer S, Howe J, Walid A. DDPG-MPCC: An experience driven multipath performance oriented congestion control. Future Internet. 2024;16(2):37. MDPI.',
    link: 'https://doi.org/10.3390/fi16020037',
    linkLabel: 'DOI',
    abstract:
      'DDPG-MPCC combines Deep Deterministic Policy Gradient (DDPG) with online convex optimisation to optimise fairness and performance in challenging multipath internet congestion control scenarios. The approach was evaluated through Linux kernel implementation and automated Bash testing scripts, with performance compared against state-of-the-art MPTCP solutions. The work was supported by Comcast Corporation.',
  },
];

export default function Publications() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
        Publications
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Research papers and journal articles.
      </p>
      <ul className="mt-6 space-y-8">
        {publications.map((pub, i) => (
          <li
            key={i}
            className="rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white/50 dark:bg-zinc-900/50 px-4 py-4"
          >
            <p className="text-sm font-medium text-zinc-900 dark:text-white">
              {pub.citation}
            </p>
            {pub.abstract && (
              <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Abstract: </span>
                {pub.abstract}
              </p>
            )}
            {pub.link && pub.linkLabel && (
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-medium text-blue-600 underline dark:text-blue-400 hover:no-underline"
              >
                {pub.linkLabel} / View paper →
              </a>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
