import { VectorCustomizationItem } from "@yandex/ymaps3-types";

export const yandexMapStyles: VectorCustomizationItem[] = [
  // Administrative areas
  {
    tags: {
      all: ["administrative"],
    },
    stylers: {
      saturation: -1, // -100% saturation in Google Maps equals -1 in Yandex
    },
  },
  {
    tags: {
      all: ["administrative", "province"],
    },
    stylers: {
      visibility: "off", // 'off' in Google Maps equals 'none' in Yandex
    },
  },

  // Landscape
  {
    tags: {
      all: ["landscape"],
    },
    stylers: {
      saturation: -1,
      lightness: 0.65, // lightness 65 in Google Maps equals 0.65 in Yandex
      //visibility: "full", // 'on' in Google Maps equals 'full' in Yandex
    },
  },

  // Points of interest
  {
    tags: {
      all: ["poi"],
    },
    stylers: {
      saturation: -1,
      lightness: 0.5,
      // visibility: "simplified",
    },
  },

  // Roads
  {
    tags: {
      all: ["road"],
    },
    stylers: {
      saturation: -1,
    },
  },
  {
    tags: {
      all: ["road", "highway"],
    },
    stylers: {
      //visibility: "simplified",
    },
  },
  {
    tags: {
      all: ["road", "arterial"],
    },
    stylers: {
      lightness: 0.3,
    },
  },
  {
    tags: {
      all: ["road", "local"],
    },
    stylers: {
      lightness: 0.4,
    },
  },

  // Transit
  {
    tags: {
      all: ["transit"],
    },
    stylers: {
      saturation: -1,
      // visibility: "simplified",
    },
  },

  // Water
  {
    tags: {
      all: ["water"],
    },
    elements: "geometry",
    stylers: {
      color: "#878782", // hue in Google Maps becomes color in Yandex
      lightness: -0.25,
      saturation: -0.97,
    },
  },
  {
    tags: {
      all: ["water"],
    },
    elements: "label",
    stylers: {
      lightness: -0.25,
      saturation: -1,
    },
  },
];
