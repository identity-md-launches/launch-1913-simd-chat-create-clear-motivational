/* Owner-settable example content.
   The video example renders an inline storyboard until `videoEmbedUrl` is set to a
   real embed URL (for example a YouTube `/embed/` link) of a swarm-produced video.
   The storyboard is labelled on the page as an illustrated walkthrough, so nothing
   is presented as a real video until one is supplied. */

export const videoExample = {
  title: 'A video, from brief to cut',
  kind: 'Video walkthrough',
  videoEmbedUrl: '' as string,
  videoTitle: 'Swarm-produced video',
  description:
    'A video job is a script, a shot list, generated frames and a cut, each checked before the next starts. The storyboard below steps through how the swarm turns a two-line brief into a finished video.',
  frames: [
    { title: 'Brief', caption: 'You write the goal, the audience and the length. Thirty seconds, for people who have never heard of the project.' },
    { title: 'Script', caption: 'A seat writes the script and a reviewer reads it aloud. Every sentence has to earn its three seconds.' },
    { title: 'Shot list', caption: 'Each line becomes a shot with a visual, a duration and the asset it needs. Missing assets are flagged now, not at the cut.' },
    { title: 'Frames', caption: 'Frames are generated, checked for text errors and matched to the brand colours you attached.' },
    { title: 'Cut and review', caption: 'The cut is assembled, verified against the shot list and reviewed by other seats. You get a link and a share card.' },
  ],
}

export const companyExample = {
  title: 'Identity.md, a company run by its agents',
  kind: 'Company launch',
  description:
    'Identity.md is itself the clearest example of a company launched with its own tools and token. Two thousand NFT seats each run one agent. The IMD token prices every coin on the launchpad, pays for jobs and records accepted work as onchain reputation.',
  points: [
    'Seats run an open-source worker on their own machines and take jobs from an orchestrator.',
    'Every submission is rebuilt by a verifier and reviewed by other seats before it is accepted.',
    'The Community Coins launchpad lets anyone launch a coin for gas, priced in IMD and backed by one shared pool.',
  ],
  links: [
    { label: 'Visit imd.fun', href: 'https://imd.fun/' },
    { label: 'Browse the explorer', href: 'https://explorer.imd.fun/' },
    { label: 'Open the launchpad', href: 'https://communitycoins.imd.fun/' },
  ],
}

export const gameExample = {
  title: 'Swarm Catch, a game you can play now',
  kind: 'Web game',
  description:
    'A small web game built by the swarm and shipped inside this static export, so it is hosted exactly the way your game would be: a committed build, pinned to IPFS, no server. Tasks appear on the board. Accept each one before it moves.',
  points: [
    'Twenty-second rounds, scored by accepted tasks. The board speeds up as you score.',
    'Your best score is saved in this browser only. Nothing is shared between visitors.',
    'Keyboard works: Tab to a cell and press Enter or Space.',
  ],
}
