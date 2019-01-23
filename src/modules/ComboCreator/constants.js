export const attackTypes = {
  "Ground Attacks": [
    {
      name: "neutral attack",
      term: "jab"
    },
    {
      name: "dash attack",
      term: "dashatk"
    }
  ],
  "Tilt Attacks": [
    {
      name: "forward tilt",
      term: "ftilt"
    },
    {
      name: "up tilt",
      term: "utilt"
    },
    {
      name: "down tilt",
      term: "dtilt"
    }
  ],
  "Smash Attacks": [
    {
      name: "forward smash",
      term: "fsmash"
    },
    {
      name: "up smash",
      term: "usmash"
    },
    {
      name: "down smash",
      term: "dsmash"
    }
  ],
  "Aerial Attacks": [
    {
      name: "neutral aerial",
      term: "nair"
    },
    {
      name: "forward aerial",
      term: "fair"
    },
    {
      name: "backward aerial",
      term: "bair"
    },
    {
      name: "up aerial",
      term: "uair"
    },
    {
      name: "down aerial",
      term: "dair"
    },
    {
      name: "grab aerial",
      term: "zair"
    }
  ],
  Throws: [
    {
      name: "grab",
      term: "grab"
    },
    {
      name: "pummel",
      term: "pummel"
    },
    {
      name: "forward throw",
      term: "fthrow"
    },
    {
      name: "backward throw",
      term: "bthrow"
    },
    {
      name: "up throw",
      term: "uthrow"
    },
    {
      name: "down throw",
      term: "dthrow"
    }
  ],
  "Special Moves": [
    {
      name: "neutral special",
      term: "nspecial"
    },
    {
      name: "side special",
      term: "sspecial"
    },
    {
      name: "up special",
      term: "uspecial"
    },
    {
      name: "down special",
      term: "dspecial"
    }
  ]
};

export const attackModifiers = [
  {
    name: "short hop",
    term: "sh"
  },
  {
    name: "full hop",
    term: "fh"
  },
  {
    name: "double jump",
    term: "dj"
  },
  {
    name: "attack canceled",
    term: "atkc"
  },
  {
    name: "auto canceled",
    term: "ac"
  },
  {
    name: "fast fall",
    term: "ff"
  },
  {
    name: "rising",
    term: "rising"
  },
  {
    name: "falling",
    term: "falling"
  },
  {
    name: "pivot canceled",
    term: "pc"
  },
  {
    name: "sweetspotted",
    term: "sweet"
  },
  {
    name: "sourspotted",
    term: "sour"
  }
];

export const InputScreenSubscreens = {
  GroundAttacks: 0,
  TiltAttacks: 1,
  SmashAttacks: 2,
  AerialAttacks: 3,
  Throws: 4,
  SpecialMoves: 5,
  Modifiers: 6
};

export const inputScreenSubscreenToTitleHash = {
  [InputScreenSubscreens.GroundAttacks]: "Ground Attacks",
  [InputScreenSubscreens.TiltAttacks]: "Tilt Attacks",
  [InputScreenSubscreens.SmashAttacks]: "Smash Attacks",
  [InputScreenSubscreens.AerialAttacks]: "Aerial Attacks",
  [InputScreenSubscreens.Throws]: "Throws",
  [InputScreenSubscreens.SpecialMoves]: "Special Moves",
  [InputScreenSubscreens.Modifiers]: "Modifiers"
};

export const comboTags = [
  {
    label: "DI-able",
    value: "diable"
  },
  {
    label: "Kill Confirm",
    value: "killConfirm"
  },
  {
    label: "Fast Faller",
    value: "fastFaller"
  },
  {
    label: "Floatie",
    value: "floatie"
  },
  {
    label: "Big Body",
    value: "bigBody"
  }
];

export const comboPercentages = [
  {
    label: "Balloonweight",
    value: "balloonweight"
  },
  {
    label: "Featherweight",
    value: "featherweight"
  },
  {
    label: "Lightweight",
    value: "lightweight"
  },
  {
    label: "Middleweight",
    value: "middleweight"
  },
  {
    label: "Heavyweight",
    value: "heavyweight"
  },
  {
    label: "Super Heavyweight",
    value: "superheavyweight"
  }
];
