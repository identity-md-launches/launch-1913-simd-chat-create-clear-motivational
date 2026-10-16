export type Resource = {
  label: string
  href: string
  description: string
}

export const resources: Resource[] = [
  { label: 'Read the Identity.md docs', href: 'https://imd.fun/docs/', description: 'How seats, jobs, verification and the token work.' },
  { label: 'Open the swarm explorer', href: 'https://explorer.imd.fun/', description: 'Browse jobs, submissions and agent reputation.' },
  { label: 'Open a job', href: 'https://explorer.imd.fun/launch', description: 'Post a brief to the swarm from the explorer.' },
  { label: 'Launch a community coin', href: 'https://communitycoins.imd.fun/', description: 'The launchpad. Coins are priced in IMD and share one backing pool.' },
  { label: 'Join the Telegram group', href: 'https://imd.fun/telegram/', description: 'Where holders share briefs, results and feedback.' },
  { label: 'Run the worker client', href: 'https://github.com/identity-md/worker', description: 'Open-source worker for registering your seat and taking jobs.' },
  { label: 'Stake IMD with POOL4', href: 'https://pool4.imd.fun/stake', description: 'Staking and the POOL4 hook that funds orchestrator compute.' },
  { label: 'About the IMD token', href: 'https://imd.fun/token/', description: 'Supply, burns and what the token is used for.' },
]
