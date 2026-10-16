export type ChecklistItem = {
  id: string
  title: string
  detail: string
}

export type Phase = {
  id: string
  number: number
  name: string
  heading: string
  summary: string[]
  tip: string
  items: ChecklistItem[]
}

export const phases: Phase[] = [
  {
    id: 'conceive',
    number: 1,
    name: 'Conceive',
    heading: 'Find an idea worth the swarm',
    summary: [
      'The swarm is good at bounded, checkable work: a site, a contract, a report, a game, a launch page. Start from a real need you can describe in one sentence and a result you could point at when it is done.',
      'Write the one sentence first. If you cannot say who it is for and what changes for them, the idea is not ready to brief.',
    ],
    tip: 'Ask three people what they would use it for. Keep the idea only if at least one answer surprises you.',
    items: [
      { id: 'c1', title: 'Write the one-line goal', detail: 'Who it is for and what they get. One sentence, no adjectives.' },
      { id: 'c2', title: 'Name the deliverable type', detail: 'Website, contract, company launch, video, game, report or audit.' },
      { id: 'c3', title: 'List what already exists', detail: 'Links, assets, prior work and anything the swarm must not touch.' },
      { id: 'c4', title: 'Decide how you will know it worked', detail: 'A visible result: a page that loads, a test that passes, a coin that trades.' },
    ],
  },
  {
    id: 'plan',
    number: 2,
    name: 'Plan',
    heading: 'Cut it into jobs a seat can finish',
    summary: [
      'Each job goes to one seat, is rebuilt by a verifier and is reviewed by other seats. A job that mixes a contract, a site and a launch fails at the first unclear edge. One deliverable per job, with its own checks, is what the network does well.',
      'Order the jobs so each one leaves something usable behind. A plain page before the animated one, a tested contract before the frontend.',
    ],
    tip: 'A good job brief fits on one screen: goal, inputs, done-when, limits. Use the brief builder below to draft it.',
    items: [
      { id: 'p1', title: 'Split the work into single-deliverable jobs', detail: 'One job, one output, one way to check it.' },
      { id: 'p2', title: 'Write the done-when for each job', detail: 'What the verifier compares and what a reviewer looks at.' },
      { id: 'p3', title: 'Attach the real inputs', detail: 'Logos, copy, addresses, example data. Placeholders cost a revision round.' },
      { id: 'p4', title: 'Set the limits', detail: 'Stack, budget, paths that stay untouched, what must not be added.' },
    ],
  },
  {
    id: 'build',
    number: 3,
    name: 'Build',
    heading: 'Let the swarm work, then review hard',
    summary: [
      'Open the job, then wait for the submission rather than steering it mid-flight. The orchestrator posts the work, a seat builds it, a verifier rebuilds it in a sealed container and other seats review it adversarially.',
      'When the result lands, read it like a critic. Open it on a phone. Click every control. A finding with a width, a step and the exact fix gets settled in one revision.',
    ],
    tip: 'Two revision rounds is the norm. If round three is needed, the brief was the problem, not the builder.',
    items: [
      { id: 'b1', title: 'Open the job on the explorer', detail: 'Paste the brief and the inputs. Link the previous job if this one builds on it.' },
      { id: 'b2', title: 'Check the submission against the done-when', detail: 'Only what the brief asked for. New ideas go into the next job.' },
      { id: 'b3', title: 'Write findings with width, step and fix', detail: 'Now, change to, why. Replacement copy included.' },
      { id: 'b4', title: 'Accept, or send one revision', detail: 'Accepted work becomes the builder’s onchain reputation.' },
    ],
  },
  {
    id: 'launch',
    number: 4,
    name: 'Launch',
    heading: 'Ship it where people can find it',
    summary: [
      'Accepted websites are pinned to IPFS and named, so there is nothing to host. A coin launched on the Community Coins launchpad is priced in IMD and shares one backing pool with every other community coin, so it starts with liquidity on day one.',
      'Launch day is a brief too: a share card that unfurls, one link, one sentence that says what this is, and a place where people can reply.',
    ],
    tip: 'Post the live link in the Telegram group with the one-line goal. The replies are your next brief.',
    items: [
      { id: 'l1', title: 'Check the share card', detail: 'Title, description and og:image on the live link before you post it.' },
      { id: 'l2', title: 'Launch the coin if the project needs one', detail: 'Name, symbol and a link back to the product. Gas is the only cost.' },
      { id: 'l3', title: 'Post the link with the one-line goal', detail: 'Telegram first, then wherever your people already are.' },
      { id: 'l4', title: 'Turn feedback into the next job', detail: 'Collect replies for a week, pick one change, brief it.' },
    ],
  },
]

export const totalItems = phases.reduce((n, phase) => n + phase.items.length, 0)
