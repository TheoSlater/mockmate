export interface Question {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SubjectContent {
  topics: string[];
  questions: Question[];
}

export const questionsData: Record<string, Record<string, SubjectContent>> = {
  Physics: {
    AQA: {
      topics: [
        // P1 - Energy
        "Energy stores and systems",
        "Changes in energy",
        "Kinetic and elastic energy calculations",
        "Gravitational potential energy",
        "Specific heat capacity",
        "Power",
        "Efficiency",
        "National and global energy resources",

        // P2 - Electricity
        "Standard circuit symbols",
        "Electric current and charge",
        "Potential difference and resistance",
        "Ohm's Law",
        "Series and parallel circuits",
        "Direct and alternating potential difference",
        "Mains electricity and the National Grid",
        "Electrical power and energy transfer",
        "The three-core cable (live, neutral, earth)",
        "Safety features in mains circuits",

        // P3 - Particle Model of Matter
        "Density",
        "States of matter and state changes",
        "Internal energy",
        "Specific latent heat",
        "Particle motion in gases",
        "Pressure in gases and volume-temperature relationships",

        // P4 - Atomic Structure
        "Structure of the atom",
        "The history of the atomic model (Dalton to Bohr)",
        "Isotopes and ions",
        "Radioactive decay",
        "Types of radiation (alpha, beta, gamma)",
        "Half-life and radioactive activity",
        "Uses and dangers of radiation",
        "Contamination vs irradiation",
        "Background radiation sources",

        // P5 - Forces
        "Scalar and vector quantities",
        "Contact and non-contact forces",
        "Resultant forces",
        "Work done and energy transfer",
        "Hooke's Law and elastic potential energy",
        "Distance, speed, velocity",
        "Acceleration",
        "Newton's Laws of motion (1st, 2nd, 3rd)",
        "Stopping distances and braking",
        "Momentum (Higher tier only)",

        // P6 - Waves
        "Types of waves (transverse and longitudinal)",
        "Properties of waves (wavelength, frequency, amplitude, speed)",
        "Wave speed equation",
        "Reflection and refraction",
        "The electromagnetic (EM) spectrum",
        "Uses and dangers of EM waves",
        "Absorption and emission of radiation",

        // P7 - Magnetism and Electromagnetism
        "Magnetic fields",
        "Magnetic materials",
        "Electromagnets and solenoids",
        "The motor effect (Higher tier only)",
        "Induced potential and transformers (Higher tier only)",
      ],

      questions: [
        // Energy stores and systems
        {
          id: "phys-aqa-ener-stores-1",
          topic: "Energy stores and systems",
          question: "Which of these is NOT an energy store?",
          options: [
            "Kinetic energy",
            "Elastic potential energy",
            "Magnetic energy",
            "Cold",
          ],
          correctAnswer: 3,
          explanation:
            "'Cold' is not an energy store; it's simply the absence of heat energy.",
        },
        {
          id: "phys-aqa-ener-stores-2",
          topic: "Energy stores and systems",
          question:
            "When an object is raised to a height, which energy store increases?",
          options: [
            "Chemical energy",
            "Gravitational potential energy",
            "Kinetic energy",
            "Thermal energy",
          ],
          correctAnswer: 1,
          explanation:
            "Raising an object increases its gravitational potential energy due to its position.",
        },

        // Changes in energy
        {
          id: "phys-aqa-energy-changes-1",
          topic: "Changes in energy",
          question:
            "What happens to kinetic energy when an object slows down due to friction?",
          options: [
            "Increases",
            "Transfers to thermal energy",
            "Remains the same",
            "Is destroyed",
          ],
          correctAnswer: 1,
          explanation:
            "Kinetic energy is converted into thermal energy because friction generates heat.",
        },
        {
          id: "phys-aqa-energy-changes-2",
          topic: "Changes in energy",
          question: "Which energy change occurs when a battery powers a bulb?",
          options: [
            "Chemical → Electrical → Thermal",
            "Thermal → Chemical",
            "Kinetic → Chemical",
            "Nuclear → Electrical",
          ],
          correctAnswer: 0,
          explanation:
            "Chemical energy in the battery converts to electrical energy, then thermal (and light) energy in the bulb.",
        },

        // Kinetic and elastic energy calculations
        {
          id: "phys-aqa-kin-elastic-1",
          topic: "Kinetic and elastic energy calculations",
          question:
            "Calculate kinetic energy of a 3 kg object moving at 4 m/s.",
          options: ["12 J", "24 J", "36 J", "48 J"],
          correctAnswer: 2,
          explanation: "KE = 0.5 × mass × velocity² = 0.5 × 3 × 4² = 24 J.",
        },
        {
          id: "phys-aqa-kin-elastic-2",
          topic: "Kinetic and elastic energy calculations",
          question:
            "What happens to elastic potential energy when a stretched spring is released?",
          options: [
            "Destroyed",
            "Converted to kinetic energy",
            "Becomes thermal energy only",
            "Remains stored",
          ],
          correctAnswer: 1,
          explanation:
            "Elastic potential energy converts into kinetic energy as the spring returns to original shape.",
        },

        // Gravitational potential energy
        {
          id: "phys-aqa-gpe-1",
          topic: "Gravitational potential energy",
          question: "Calculate GPE of a 5 kg object raised 10 m (g=10 N/kg).",
          options: ["50 J", "100 J", "250 J", "500 J"],
          correctAnswer: 3,
          explanation: "GPE = mass × g × height = 5 × 10 × 10 = 500 J.",
        },
        {
          id: "phys-aqa-gpe-2",
          topic: "Gravitational potential energy",
          question:
            "If height doubles, what happens to gravitational potential energy?",
          options: ["Halves", "Doubles", "Stays same", "Quadruples"],
          correctAnswer: 1,
          explanation:
            "GPE is directly proportional to height, so doubling height doubles GPE.",
        },

        // Specific heat capacity
        {
          id: "phys-aqa-shc-1",
          topic: "Specific heat capacity",
          question: "Approximate specific heat capacity of water is:",
          options: ["100 J/kg°C", "4200 J/kg°C", "5000 J/kg°C", "2500 J/kg°C"],
          correctAnswer: 1,
          explanation: "Water requires ~4200 J/kg°C to raise 1 kg by 1°C.",
        },
        {
          id: "phys-aqa-shc-2",
          topic: "Specific heat capacity",
          question:
            "Energy supplied: 2000 J, mass: 0.5 kg, temp rise: 2°C. Find specific heat capacity.",
          options: ["2000 J/kg°C", "4000 J/kg°C", "1000 J/kg°C", "500 J/kg°C"],
          correctAnswer: 2,
          explanation:
            "c = energy / (mass × ΔT) = 2000 / (0.5 × 2) = 2000 J/kg°C.",
        },

        // Power
        {
          id: "phys-aqa-power-1",
          topic: "Power",
          question: "Power of machine doing 300 J work in 5 seconds?",
          options: ["15 W", "60 W", "300 W", "1500 W"],
          correctAnswer: 1,
          explanation: "Power = work / time = 300 / 5 = 60 W.",
        },
        {
          id: "phys-aqa-power-2",
          topic: "Power",
          question: "Device uses 1000 J every second. Power consumption?",
          options: ["1000 W", "100 W", "10 W", "1 W"],
          correctAnswer: 0,
          explanation: "Power = energy/time, so 1000 J/s = 1000 W.",
        },

        // Efficiency
        {
          id: "phys-aqa-efficiency-1",
          topic: "Efficiency",
          question: "Machine input 200 J, useful output 150 J. Efficiency?",
          options: ["75%", "50%", "80%", "85%"],
          correctAnswer: 0,
          explanation:
            "Efficiency = (useful output / input) × 100 = (150/200) × 100 = 75%.",
        },
        {
          id: "phys-aqa-efficiency-2",
          topic: "Efficiency",
          question: "Why can efficiency never be greater than 100%?",
          options: [
            "Energy cannot be created",
            "Machines always waste energy",
            "Input energy less than output",
            "Useful energy can exceed input energy",
          ],
          correctAnswer: 0,
          explanation:
            "Conservation of energy means you cannot get more energy out than you put in.",
        },

        // National and global energy resources
        {
          id: "phys-aqa-energy-resources-1",
          topic: "National and global energy resources",
          question: "Which is a renewable energy resource?",
          options: ["Coal", "Oil", "Wind", "Natural Gas"],
          correctAnswer: 2,
          explanation: "Wind is renewable; fossil fuels are not.",
        },
        {
          id: "phys-aqa-energy-resources-2",
          topic: "National and global energy resources",
          question: "Main disadvantage of fossil fuels?",
          options: [
            "Expensive",
            "Produce greenhouse gases",
            "Renewable",
            "No waste produced",
          ],
          correctAnswer: 1,
          explanation:
            "Burning fossil fuels releases greenhouse gases, driving climate change.",
        },

        // P2 - Electricity

        // Standard circuit symbols
        {
          id: "phys-aqa-circuit-symbols-1",
          topic: "Standard circuit symbols",
          question: "Which symbol represents a resistor in a circuit diagram?",
          options: [
            "A zigzag line",
            "A circle",
            "A triangle",
            "A straight line",
          ],
          correctAnswer: 0,
          explanation: "The resistor symbol is a zigzag line.",
        },
        {
          id: "phys-aqa-circuit-symbols-2",
          topic: "Standard circuit symbols",
          question:
            "What does this symbol represent? (A straight line with a shorter line parallel below it)",
          options: ["Battery", "Cell", "Switch", "Lamp"],
          correctAnswer: 1,
          explanation: "This symbol represents a cell.",
        },

        // Electric current and charge
        {
          id: "phys-aqa-electric-current-1",
          topic: "Electric current and charge",
          question: "What is the unit of electric current?",
          options: ["Volt", "Ampere", "Ohm", "Coulomb"],
          correctAnswer: 1,
          explanation: "Electric current is measured in amperes (A).",
        },
        {
          id: "phys-aqa-electric-current-2",
          topic: "Electric current and charge",
          question:
            "What is the relationship between current (I), charge (Q), and time (t)?",
          options: ["I = Q × t", "Q = I × t", "t = I × Q", "I = Q / t"],
          correctAnswer: 3,
          explanation:
            "Current (I) equals charge flow (Q) divided by time (t): I = Q / t.",
        },

        // Potential difference and resistance
        {
          id: "phys-aqa-pd-resistance-1",
          topic: "Potential difference and resistance",
          question: "What is the unit of potential difference?",
          options: ["Volt", "Ampere", "Ohm", "Watt"],
          correctAnswer: 0,
          explanation: "Potential difference is measured in volts (V).",
        },
        {
          id: "phys-aqa-pd-resistance-2",
          topic: "Potential difference and resistance",
          question:
            "What happens to the resistance of a wire if its length is doubled?",
          options: [
            "Resistance halves",
            "Resistance doubles",
            "Resistance stays the same",
            "Resistance quadruples",
          ],
          correctAnswer: 1,
          explanation:
            "Resistance is directly proportional to length; doubling length doubles resistance.",
        },

        // Ohm's Law
        {
          id: "phys-aqa-ohms-law-1",
          topic: "Ohm's Law",
          question:
            "If a resistor has a potential difference of 12 V and a current of 2 A, what is its resistance?",
          options: ["6 Ω", "24 Ω", "14 Ω", "10 Ω"],
          correctAnswer: 0,
          explanation: "R = V / I = 12 / 2 = 6 Ω.",
        },
        {
          id: "phys-aqa-ohms-law-2",
          topic: "Ohm's Law",
          question: "Ohm's Law states that:",
          options: [
            "Current is proportional to voltage at constant resistance",
            "Resistance changes with voltage",
            "Voltage is inversely proportional to current",
            "Current decreases with resistance",
          ],
          correctAnswer: 0,
          explanation:
            "Ohm's Law says current is directly proportional to voltage if resistance is constant.",
        },

        // Series and parallel circuits
        {
          id: "phys-aqa-series-parallel-1",
          topic: "Series and parallel circuits",
          question: "In a series circuit, what happens if one component fails?",
          options: [
            "The whole circuit stops working",
            "Other components still work",
            "Voltage increases",
            "Current stops in failed component only",
          ],
          correctAnswer: 0,
          explanation:
            "In series, current must pass through all components, so one failure stops all current.",
        },
        {
          id: "phys-aqa-series-parallel-2",
          topic: "Series and parallel circuits",
          question: "Which is TRUE about current in a parallel circuit?",
          options: [
            "Current is the same in all branches",
            "Current splits between branches",
            "Current stops at branches",
            "Current doubles in each branch",
          ],
          correctAnswer: 1,
          explanation:
            "Current divides among parallel branches according to resistance.",
        },

        // Direct and alternating potential difference
        {
          id: "phys-aqa-dc-ac-1",
          topic: "Direct and alternating potential difference",
          question:
            "Which type of current flows in household mains electricity?",
          options: [
            "Direct current (DC)",
            "Alternating current (AC)",
            "Pulsed current",
            "Static current",
          ],
          correctAnswer: 1,
          explanation: "Household mains use alternating current (AC).",
        },
        {
          id: "phys-aqa-dc-ac-2",
          topic: "Direct and alternating potential difference",
          question: "In which device is direct current commonly used?",
          options: [
            "Batteries",
            "Mains power sockets",
            "Transformer",
            "Electric heater",
          ],
          correctAnswer: 0,
          explanation: "Batteries supply direct current (DC).",
        },

        // Mains electricity and the National Grid
        {
          id: "phys-aqa-national-grid-1",
          topic: "Mains electricity and the National Grid",
          question:
            "What voltage and frequency is mains electricity in the UK?",
          options: [
            "230 V, 50 Hz",
            "110 V, 60 Hz",
            "120 V, 50 Hz",
            "240 V, 60 Hz",
          ],
          correctAnswer: 0,
          explanation:
            "UK mains is approximately 230 volts at 50 hertz frequency.",
        },
        {
          id: "phys-aqa-national-grid-2",
          topic: "Mains electricity and the National Grid",
          question: "Why are transformers used in the National Grid?",
          options: [
            "To increase current for efficiency",
            "To increase voltage for efficient power transfer",
            "To decrease voltage for safety",
            "To change AC to DC",
          ],
          correctAnswer: 1,
          explanation:
            "Transformers increase voltage to reduce current and energy loss during transmission.",
        },

        // Electrical power and energy transfer
        {
          id: "phys-aqa-power-energy-1",
          topic: "Electrical power and energy transfer",
          question: "Power in an electrical device is given by:",
          options: [
            "Voltage × current",
            "Current / voltage",
            "Voltage / current",
            "Resistance × current",
          ],
          correctAnswer: 0,
          explanation: "Power (W) = Voltage (V) × Current (A).",
        },
        {
          id: "phys-aqa-power-energy-2",
          topic: "Electrical power and energy transfer",
          question: "Energy transferred by an electrical device is:",
          options: [
            "Power × time",
            "Voltage × current",
            "Current × resistance",
            "Resistance / time",
          ],
          correctAnswer: 0,
          explanation: "Energy (J) = Power (W) × Time (s).",
        },

        // The three-core cable (live, neutral, earth)
        {
          id: "phys-aqa-3core-cable-1",
          topic: "The three-core cable (live, neutral, earth)",
          question: "Which wire carries current to the appliance?",
          options: ["Live", "Neutral", "Earth", "None"],
          correctAnswer: 0,
          explanation: "The live wire carries current to the appliance.",
        },
        {
          id: "phys-aqa-3core-cable-2",
          topic: "The three-core cable (live, neutral, earth)",
          question: "What is the function of the earth wire?",
          options: [
            "Completes the circuit",
            "Carries current away",
            "Prevents electric shock by safety",
            "Supplies current",
          ],
          correctAnswer: 2,
          explanation: "Earth wire provides a safety path to prevent shocks.",
        },

        // Safety features in mains circuits
        {
          id: "phys-aqa-safety-1",
          topic: "Safety features in mains circuits",
          question:
            "Which device cuts off current if there's a fault to prevent electric shock?",
          options: ["Fuse", "Transformer", "Earth wire", "Battery"],
          correctAnswer: 0,
          explanation:
            "A fuse melts if current is too high, cutting off the circuit.",
        },
        {
          id: "phys-aqa-safety-2",
          topic: "Safety features in mains circuits",
          question: "What does a circuit breaker do?",
          options: [
            "Automatically switches off in faults",
            "Increases voltage",
            "Stores energy",
            "Changes AC to DC",
          ],
          correctAnswer: 0,
          explanation:
            "Circuit breakers switch off current in fault conditions automatically.",
        },

        // Particle Model of Matter
        // Density
        {
          id: "phys-aqa-density-1",
          topic: "Density",
          question: "Density is defined as:",
          options: [
            "Mass per unit volume",
            "Volume per unit mass",
            "Mass × volume",
            "Force per unit area",
          ],
          correctAnswer: 0,
          explanation: "Density = mass / volume.",
        },
        {
          id: "phys-aqa-density-2",
          topic: "Density",
          question: "Calculate density of 10 kg object with volume 2 m³.",
          options: ["5 kg/m³", "20 kg/m³", "12 kg/m³", "8 kg/m³"],
          correctAnswer: 0,
          explanation: "Density = mass / volume = 10 / 2 = 5 kg/m³.",
        },

        // States of matter and state changes
        {
          id: "phys-aqa-states-1",
          topic: "States of matter and state changes",
          question: "Which state has a fixed volume but no fixed shape?",
          options: ["Solid", "Liquid", "Gas", "Plasma"],
          correctAnswer: 1,
          explanation: "Liquids have fixed volume but take shape of container.",
        },
        {
          id: "phys-aqa-states-2",
          topic: "States of matter and state changes",
          question: "What is the change from liquid to gas called?",
          options: ["Freezing", "Condensation", "Evaporation", "Melting"],
          correctAnswer: 2,
          explanation: "Liquid to gas is evaporation (or boiling).",
        },

        // Internal energy
        {
          id: "phys-aqa-internal-energy-1",
          topic: "Internal energy",
          question: "Internal energy of a substance includes:",
          options: [
            "Kinetic energy of particles",
            "Potential energy of particles",
            "Both kinetic and potential energy",
            "Only chemical energy",
          ],
          correctAnswer: 2,
          explanation:
            "Internal energy is total kinetic + potential energy of particles.",
        },
        {
          id: "phys-aqa-internal-energy-2",
          topic: "Internal energy",
          question: "What increases internal energy in heating a substance?",
          options: [
            "Temperature rises or state changes",
            "Only temperature rises",
            "Only state changes",
            "None of the above",
          ],
          correctAnswer: 0,
          explanation:
            "Heating raises internal energy by increasing temperature or changing state.",
        },

        // Specific latent heat
        {
          id: "phys-aqa-slh-1",
          topic: "Specific latent heat",
          question: "What does specific latent heat describe?",
          options: [
            "Energy to raise temp by 1°C",
            "Energy to change state without temp change",
            "Energy to melt all solid",
            "Energy per kg to heat liquid",
          ],
          correctAnswer: 1,
          explanation:
            "Specific latent heat is energy required to change state per kg without temperature change.",
        },
        {
          id: "phys-aqa-slh-2",
          topic: "Specific latent heat",
          question:
            "Energy required to melt 3 kg ice with specific latent heat 334,000 J/kg?",
          options: ["100,200 J", "1,002,000 J", "334,000 J", "1,002 J"],
          correctAnswer: 1,
          explanation:
            "Energy = mass × latent heat = 3 × 334,000 = 1,002,000 J.",
        },

        // Particle motion in gases
        {
          id: "phys-aqa-particle-gas-1",
          topic: "Particle motion in gases",
          question: "Pressure in gases is caused by:",
          options: [
            "Particles colliding with container walls",
            "Particles vibrating",
            "Particles moving slower",
            "Particles absorbing heat",
          ],
          correctAnswer: 0,
          explanation:
            "Gas pressure arises from particle collisions with walls.",
        },
        {
          id: "phys-aqa-particle-gas-2",
          topic: "Particle motion in gases",
          question:
            "If gas volume decreases but temperature stays constant, pressure will:",
          options: ["Increase", "Decrease", "Stay the same", "Become zero"],
          correctAnswer: 0,
          explanation:
            "At constant temperature, pressure increases as volume decreases (Boyle's Law).",
        },

        // Pressure in gases and volume-temperature relationships
        {
          id: "phys-aqa-pv-t-1",
          topic: "Pressure in gases and volume-temperature relationships",
          question:
            "At constant volume, what happens to gas pressure when temperature increases?",
          options: [
            "Pressure increases",
            "Pressure decreases",
            "Pressure stays constant",
            "Pressure halves",
          ],
          correctAnswer: 0,
          explanation:
            "Increasing temperature at constant volume increases pressure (particles move faster).",
        },
        {
          id: "phys-aqa-pv-t-2",
          topic: "Pressure in gases and volume-temperature relationships",
          question: "Charles' Law states volume is proportional to:",
          options: ["Pressure", "Temperature (K)", "Mass", "Density"],
          correctAnswer: 1,
          explanation:
            "At constant pressure, volume of gas ∝ temperature (Kelvin).",
        },

        // Atomic Structure
        {
          id: "phys-aqa-atomic-structure-1",
          topic: "Structure of the atom",
          question: "Which particles are found in the nucleus?",
          options: [
            "Protons and electrons",
            "Neutrons and electrons",
            "Protons and neutrons",
            "Only electrons",
          ],
          correctAnswer: 2,
          explanation:
            "The nucleus contains protons and neutrons; electrons orbit outside.",
        },
        {
          id: "phys-aqa-atomic-structure-2",
          topic: "Structure of the atom",
          question: "What is the charge of an electron?",
          options: ["Positive", "Negative", "Neutral", "No charge"],
          correctAnswer: 1,
          explanation: "Electrons have a negative charge.",
        },

        // The history of the atomic model (Dalton to Bohr)
        {
          id: "phys-aqa-atomic-history-1",
          topic: "The history of the atomic model",
          question: "Who proposed the plum pudding model?",
          options: ["Dalton", "Thomson", "Rutherford", "Bohr"],
          correctAnswer: 1,
          explanation: "J.J. Thomson proposed the plum pudding model.",
        },
        {
          id: "phys-aqa-atomic-history-2",
          topic: "The history of the atomic model",
          question: "Rutherford's gold foil experiment proved atoms have:",
          options: [
            "No nucleus",
            "A dense, positive nucleus",
            "Electrons embedded",
            "Only empty space",
          ],
          correctAnswer: 1,
          explanation:
            "Rutherford showed atoms have a small, dense, positively charged nucleus.",
        },

        // Isotopes and ions
        {
          id: "phys-aqa-isotopes-ions-1",
          topic: "Isotopes and ions",
          question: "Isotopes differ in:",
          options: [
            "Number of protons",
            "Number of neutrons",
            "Number of electrons",
            "Charge",
          ],
          correctAnswer: 1,
          explanation: "Isotopes have the same protons but different neutrons.",
        },
        {
          id: "phys-aqa-isotopes-ions-2",
          topic: "Isotopes and ions",
          question: "An ion is an atom that:",
          options: [
            "Has equal protons and electrons",
            "Has lost or gained electrons",
            "Has different number of neutrons",
            "Is radioactive",
          ],
          correctAnswer: 1,
          explanation:
            "Ions form when atoms gain or lose electrons, gaining a charge.",
        },

        // Radioactive decay
        {
          id: "phys-aqa-radioactive-decay-1",
          topic: "Radioactive decay",
          question: "Which type of decay decreases atomic number by 2?",
          options: [
            "Alpha decay",
            "Beta decay",
            "Gamma decay",
            "Neutron decay",
          ],
          correctAnswer: 0,
          explanation:
            "Alpha decay emits 2 protons, reducing atomic number by 2.",
        },
        {
          id: "phys-aqa-radioactive-decay-2",
          topic: "Radioactive decay",
          question: "Beta decay involves:",
          options: [
            "Emission of an electron",
            "Emission of an alpha particle",
            "Emission of gamma radiation",
            "Emission of a neutron",
          ],
          correctAnswer: 0,
          explanation:
            "Beta decay emits an electron and increases atomic number by 1.",
        },

        // Types of radiation (alpha, beta, gamma)
        {
          id: "phys-aqa-types-radiation-1",
          topic: "Types of radiation",
          question: "Which radiation has the least penetrating power?",
          options: ["Alpha", "Beta", "Gamma", "Neutron"],
          correctAnswer: 0,
          explanation:
            "Alpha particles are stopped by paper or skin; least penetrating.",
        },
        {
          id: "phys-aqa-types-radiation-2",
          topic: "Types of radiation",
          question: "Gamma radiation is stopped by:",
          options: [
            "Paper",
            "Thin metal sheet",
            "Thick lead or concrete",
            "Nothing",
          ],
          correctAnswer: 2,
          explanation: "Gamma rays require thick lead or concrete to block.",
        },

        // Half-life and radioactive activity
        {
          id: "phys-aqa-half-life-1",
          topic: "Half-life and radioactive activity",
          question: "What is half-life?",
          options: [
            "Time taken for activity to double",
            "Time taken for activity to halve",
            "Time taken for decay to stop",
            "Time taken for atom to lose electrons",
          ],
          correctAnswer: 1,
          explanation:
            "Half-life is time for half the radioactive nuclei to decay.",
        },
        {
          id: "phys-aqa-half-life-2",
          topic: "Half-life and radioactive activity",
          question: "After 3 half-lives, what fraction remains?",
          options: ["1/8", "1/3", "1/2", "1/4"],
          correctAnswer: 0,
          explanation:
            "After each half-life, half remains; so after 3, (1/2)^3 = 1/8.",
        },
      ],
    },
  },
};
