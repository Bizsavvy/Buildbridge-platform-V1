export const NIGERIA_LOCATIONS = [
  {
    state: "Lagos",
    id: "lagos",
    lgas: [
      "Ikeja",
      "Alimosho",
      "Eti-Osa",
      "Lagos Island",
      "Kosofe",
      "Mushin",
      "Oshodi-Isolo",
      "Surulere",
    ],
  },
  {
    state: "Oyo",
    id: "oyo",
    lgas: ["Ibadan North", "Ibadan South-West", "Ogbomosho North", "Oyo East", "Iseyin"],
  },
  {
    state: "Anambra",
    id: "anambra",
    lgas: ["Awka South", "Onitsha North", "Onitsha South", "Nnewi North"],
  },
  {
    state: "Rivers",
    id: "rivers",
    lgas: ["Port Harcourt", "Obio-Akpor", "Eleme", "Bonny"],
  },
  {
    state: "Kano",
    id: "kano",
    lgas: ["Kano Municipal", "Fagge", "Dala", "Gwale", "Tarauni"],
  },
  {
    state: "Kaduna",
    id: "kaduna",
    lgas: ["Kaduna North", "Kaduna South", "Chikun", "Zaria"],
  },
  {
    state: "Abuja FCT",
    id: "abuja_fct",
    lgas: ["Abuja Municipal", "Gwagwalada", "Kuje", "Bwari"],
  },
  {
    state: "Ogun",
    id: "ogun",
    lgas: ["Abeokuta South", "Abeokuta North", "Ijebu Ode", "Sagamu"],
  },
  {
    state: "Enugu",
    id: "enugu",
    lgas: ["Enugu North", "Enugu South", "Nsukka"],
  },
  {
    state: "Delta",
    id: "delta",
    lgas: ["Warri South", "Asaba", "Uvwie"],
  },
  {
    state: "Edo",
    id: "edo",
    lgas: ["Egor", "Ikpoba-Okha", "Oredo"],
  },
  {
    state: "Imo",
    id: "imo",
    lgas: ["Owerri Municipal", "Owerri North", "Owerri West"],
  },
  {
    state: "Kwara",
    id: "kwara",
    lgas: ["Ilorin South", "Ilorin West", "Ilorin East"],
  },
  {
    state: "Osun",
    id: "osun",
    lgas: ["Osogbo", "Ife Central", "Ife East"],
  },
  {
    state: "Ondo",
    id: "ondo",
    lgas: ["Akure South", "Akure North", "Ondo West"],
  },
  {
    state: "Abia",
    id: "abia",
    lgas: ["Umuahia North", "Umuahia South", "Aba North", "Aba South"],
  },
  {
    state: "Ekiti",
    id: "ekiti",
    lgas: ["Ado-Ekiti", "Ikere", "Oye"],
  },
  {
    state: "Plateau",
    id: "plateau",
    lgas: ["Jos North", "Jos South", "Bukuru"],
  },
  {
    state: "Bayelsa",
    id: "bayelsa",
    lgas: ["Yenagoa", "Southern Ijaw", "Sagbama"],
  },
  {
    state: "Cross River",
    id: "cross_river",
    lgas: ["Calabar Municipal", "Calabar South", "Akamkpa"],
  },
];

export type NigerianState = (typeof NIGERIA_LOCATIONS)[number]["id"];
