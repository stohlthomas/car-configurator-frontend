export const colors = [
  { label: "Weiß", value: "white", price: 0 },
  { label: "Schwarz", value: "black", price: 1500 },
  { label: "Silber Metallic", value: "silver", price: 1500 },
  { label: "Blau Metallic", value: "blue", price: 1500 },
  { label: "Rot Matellic", value: "red", price: 2500 }
];

export const interiorColors = [
  { label: "Schwarz gemasertes Eschenholzdekor", value: "all_black", price: 0 },
  { label: "Schwarz-weißes dunkles Eschenholzdekor", value: "black_and_white", price: 1500 },
  { label: "Cremefarbenes Eichenholzdekor", value: "cream", price: 1500 },
];

export const specialEquipment = [
  { label: "Klimaanlage", value: "full_self_driving", price: 10000 }
];

export const interiorLayouts = [
  { label: "Klimaanlage", value: "air_conditioner", price: 1000 },
  { label: "Soundsystem", value: "sound_system", price: 6500 },
  { label: "Fahrsicherheitssysteme", value: "driving_assistence", price: 3500 },
];

export const models = [
  {
    key: 's',
    name: "Model S",
    colors: colors,
    wheels: [
      {
        src: `${process.env.PUBLIC_URL}/wheels/model_s/model_s_wheel_1.png`,
        label: '19" Tempest Reifen',
        value: "wheel_1",
        price: 0
      },
      {
        src: `${process.env.PUBLIC_URL}/wheels/model_s/model_s_wheel_2.png`,
        label: '21" Sonic Carbon Reifen',
        value: "wheel_2",
        price: 4500
      }
    ],
    types: [
      {
        label: "Langstrecke",
        value: "long_range_plus",
        specs: {
          range: 402,
          top_speed: 155,
          acceleration_time: 3.7,
        },
        price: 69420
      },
      {
        label: "Performance",
        value: "performance",
        specs: {
          range: 387,
          top_speed: 163,
          acceleration_time: 2.3,
        },
        price: 91990,
        benefits: [
          "Schnellere Beschleunigung: 0-100 km/h in <= 4s",
          "Carbonfaser-Spoiler"
        ]
      },
      {
        label: "Sport",
        value: "plaid",
        specs: {
          range: 320,
          top_speed: 200,
          acceleration_time: 2.0,
        },
        price: 139990,
        benefits: [
          "Schnellste Beschleunigung von 0 auf 60 Meilen pro Stunde und Viertelmeile aller Serienautos aller Zeiten",
          "Beschleunigung von 0–100 Kilometer pro Stunde in 3,1 s",
          "1,100+ PS",
          "Dreimotoriger Allradantrieb"
        ]
      },
    ],
    // interiorColors: interiorColors,
    interiorLayouts: interiorLayouts
  },
  {
    key: 'x',
    name: "Model X",
    colors: colors,
    wheels: [
      {
        src: `${process.env.PUBLIC_URL}/wheels/model_x/model_x_wheel_1.png`,
        label: '20" silberne Felgen',
        value: "wheel_1",
        price: 0
      },
      {
        src: `${process.env.PUBLIC_URL}/wheels/model_x/model_x_wheel_2.png`,
        label: '22" Onyx schwarze Felgen',
        value: "wheel_2",
        price: 5500
      }
    ],
    types: [
      {
        label: "Long Range Plus",
        value: "long_range_plus",
        specs: {
          range: 371,
          top_speed: 155,
          acceleration_time: 4.4
        },
        price: 79900
      },
      {
        label: "Performance",
        value: "performance",
        specs: {
          range: 341,
          top_speed: 163,
          acceleration_time: 2.6
        },
        price: 99990,
        benefits: [
          "Quicker acceleration: 0-60 mph in 2.6s",
          "Ludicrous Mode",
          "Enhanced Interior Styling"
        ]
      }
    ],
    // interiorColors: interiorColors,
    interiorLayouts: interiorLayouts
  },
  {
    key: 'y',
    name: "Model Y",
    colors: colors,
    wheels: [
      {
        src: `${process.env.PUBLIC_URL}/wheels/model_y/model_y_wheel_1.png`,
        label: '19’’ Gemini Wheels',
        value: "wheel_1",
        price: 0
      },
      {
        src: `${process.env.PUBLIC_URL}/wheels/model_y/model_y_wheel_2.png`,
        label: '20’’ Induction Wheels',
        value: "wheel_2",
        price: 2000
      }
    ],
    types: [
      {
        label: "Long Range",
        value: "long_range",
        specs: {
          range: 326,
          top_speed: 135,
          acceleration_time: 4.8
        },
        price: 45690
      },
      {
        label: "Performance",
        value: "performance",
        specs: {
          range: 303,
          top_speed: 155,
          acceleration_time: 3.5
        },
        price: 55690,
        benefits: [
          "Increased top speed from 135mph to 155mph",
          "21’’ Überturbine Wheels",
          "Performance Brakes",
          "Lowered suspension",
          "Aluminum alloy pedals"
        ]
      }
    ],
    // interiorColors: interiorColors.slice(0,2),
    interiorLayouts: [interiorLayouts[0], interiorLayouts[2]]
  }
];

export const initialConfig = {
  's': {
    car_type: "long_range_plus",
    model: "s",
    color: "white",
    wheels: "wheel_1",
    interior_color: "all_black",
    interior_layout: []
  },
  'x': {
    car_type: "long_range_plus",
    model: "x",
    color: "white",
    wheels: "wheel_1",
    interior_color: "all_black",
    interior_layout: []
  },
  'y': {
    car_type: "long_range",
    model: "y",
    color: "white",
    wheels: "wheel_1",
    interior_color: "all_black",
    interior_layout: []
  }
};