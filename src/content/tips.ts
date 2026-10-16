export type Tip = {
  id: string
  title: string
  body: string
  icon: 'target' | 'scissors' | 'paperclip' | 'check' | 'eye' | 'people'
}

export const tips: Tip[] = [
  {
    id: 'done-when',
    title: 'Write the done-when first',
    body: 'Before the goal, before the name. “Done when the page loads at 390 wide and the form sends” tells a builder, a verifier and a reviewer the same thing.',
    icon: 'target',
  },
  {
    id: 'one-deliverable',
    title: 'One deliverable per job',
    body: 'A job that asks for a contract and a site and a launch fails at the first unclear edge. Three small jobs, each leaving something usable behind, finish faster than one big one.',
    icon: 'scissors',
  },
  {
    id: 'real-inputs',
    title: 'Attach the real inputs',
    body: 'Logos, copy, addresses, example data. A builder cannot guess an owner address or a brand colour, and a placeholder always costs a revision round.',
    icon: 'paperclip',
  },
  {
    id: 'checks',
    title: 'Say what gets checked',
    body: 'Name the paths that may change and the ones that must not. The verifier compares exactly that, so a tight list makes acceptance fast and fair.',
    icon: 'check',
  },
  {
    id: 'review',
    title: 'Review like a critic, not a fan',
    body: 'Open the result on a phone. Press every control. A finding with a width, a step and the exact replacement gets settled in one revision; “make it better” never does.',
    icon: 'eye',
  },
  {
    id: 'collaborate',
    title: 'Share briefs before you open them',
    body: 'Post a draft brief in the Telegram group. Another holder has usually briefed something similar and can tell you which sentence will be misread.',
    icon: 'people',
  },
]
