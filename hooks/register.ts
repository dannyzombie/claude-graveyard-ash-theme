import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Night: a graveyard lit by toxic green. Day: soft ash with deep, moody accents.
const { theme, problems } = makeColors({
  label: 'Zombie',
  // A surface keeps its own highlighting if it doesn't offer this one.
  codeTheme: { light: 'catppuccin-latte', dark: 'vitesse-dark' },
  roles: {
    accent: '#5fae1e', // toxic green
    danger: '#c8323c', // blood red
    success: '#2f9e5b', // antidote green
    warning: '#c98a12', // biohazard amber
    pro: '#8a4fd0', // bruise purple
  },
  // Day is dim ash: low glare, with deep purple, red, olive and rust accents.
  light: {
    roles: {
      accent: { seed: '#4a1d8c', fillShade: 600 }, // headset purple
      danger: { seed: '#8f0f18', fillShade: 600 }, // devil-horn red
      success: { seed: '#2f4a0c', fillShade: 600 }, // olive scarf
      warning: { seed: '#7a3d00', fillShade: 600 }, // burnt flame
      pro: { seed: '#7a2a0c', fillShade: 600 }, // rust hair
    },
    gray: {
      anchors: {
        'surface-0': '#d8dacf',
        'surface-1': '#dee0d5',
        'surface-2': '#e4e6db',
        'text-primary': '#060704',
        'text-secondary': '#0e100a',
        'text-muted': '#1a1c14',
      },
      // The in-between grays, kept dark enough for small labels.
      stops: {
        150: '#484b3e',
        200: '#404336',
        250: '#383b2f',
        300: '#303328',
        350: '#282b21',
      },
    },
    git: {
      added: '#1c3d05',
      removed: '#7c0d16',
      modified: '#5c2a00',
      merged: '#3f1478',
      closed: '#700c14',
      conflicting: '#5c2a00',
      draft: '#2f3226',
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0e140f',
        'surface-1': '#151d16',
        'surface-2': '#1b251c',
        'surface-3': '#1f2a20',
        'text-primary': '#e6f0d8',
        'text-secondary': '#c0cfb2',
        'text-muted': '#9aab8c',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  // Palette names follow the mode, so one soft glow serves day and night.
  backdrop: {
    gradient: {
      shape: 'radial',
      stops: [
        { at: 0, color: 'surface-2' },
        { at: 1, color: 'surface-0' },
      ],
    },
  },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }

    await $.theme.set(LOOK)

    return next(e)
  })
}
