// Theme toggle
const themeSwitch = document.getElementById('theme-switch');
if (themeSwitch) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitch.checked = true;
    }
    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// Calculator data
const calculators = {
    electrical: [
        "Arc Flash Calculator",
        "Battery Sizing (AH)",
        "Battery Life Estimator",
        "Breaker Sizing",
        "Busbar Ampacity",
        "Busbar Short Circuit",
        "Cable Sizing Calculator",
        "Cable Ampacity",
        "Cable Pulling Tension",
        "Comm Cable Loss",
        "Conduit Fill Calculator",
        "CT Saturation",
        "Earth Conductor Size",
        "Earthing Fault Simulator",
        "Equipment Relay Setting",
        "Grounding System Design",
        "Harmonic Distortion",
        "Harmonics Analyser",
        "HVAC Sizing Calculator",
        "LC Resonance Calculator",
        "Lighting Calculator",
        "Maintenance Guide",
        "Motor Efficiency",
        "Motor Starting Current",
        "Neutral Earth Fault",
        "Power Factor Correction",
        "Protection Device",
        "Relay Coordination",
        "Short Circuit Current",
        "Skin Depth Calculator",
        "Solar PV Array",
        "Symmetrical Components",
        "System X/R Ratio",
        "Transformer Calculator",
        "Transformer Inrush",
        "Transmission Line",
        "Unit Converter",
        "UPS Sizing",
        "VFD Selection Tool",
        "Voltage Drop Calculator",
        "Generator Sizing",
        "Industrial Lighting",
        "Logic Gates Simulator",
        "NEMA to IP Converter",
        "PCB Trace Width",
        "Resistor Color Code",
        "Solar Cable Sizing",
        "Residential Load Calc",
        "Insulation Resistance",
        "Power Triangle"
    ],
    instrumentation: [
        "ADC Resolution",
        "Capillary Length Error",
        "Cv/Kv Valve Sizing",
        "DP Level Measurement",
        "Hydrostatic Level",
        "Instrument Range",
        "Loop Impedance",
        "Orifice Plate Beta",
        "PID Tuning",
        "Profibus Calculator",
        "RTD Lead Wire Comp.",
        "Signal Scaling 4-20mA",
        "Thermocouple CJC",
        "Ultrasonic Level",
        "Valve Cavitation"
    ],
    mechanical: [
        "Air Compressor FAD",
        "ASME Vessel Design",
        "Belt & Pulley",
        "Bolt Torque",
        "Control Valve Actuator",
        "Darcy Friction Factor",
        "Fatigue Analysis",
        "Gas Properties",
        "Heat Exchanger",
        "Hydraulic Cylinder",
        "Nozzle Reinforcement",
        "Pipe Flow Calculator",
        "Pump Head",
        "Reynolds Number",
        "Thermal Expansion"
    ]
};

// Slugify name to filename
function slugify(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.html';
}

// Render calculator grids
function renderGrid(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    calculators[category].forEach(name => {
        const link = document.createElement('a');
        link.href = `${category}/${slugify(name)}`;
        link.className = 'calc-card';
        link.textContent = name;
        container.appendChild(link);
    });
}

renderGrid('electrical', 'electrical-grid');
renderGrid('instrumentation', 'instrumentation-grid');
renderGrid('mechanical', 'mechanical-grid');

// FAQ Data – exactly as you gave
const faqData = [
    {
        q: "What IEC standards are used?",
        a: "Our calculators primarily reference IEC 60364 for electrical installations, IEC 60909 for short-circuit currents, and IEC 61508 for functional safety. Each calculator page cites the specific standard used for transparency."
    },
    {
        q: "Are results suitable for detailed engineering?",
        a: "Yes, but with verification. While our tools use industry-standard formulas and factors, all results should be verified by a qualified engineer. They are excellent for reliable estimates, front-end engineering design (FEED), and quick validation."
    },
    {
        q: "How often are calculators updated?",
        a: "We review our tools quarterly to ensure alignment with the latest standard revisions (e.g., when a new IEEE or IEC version is released). We also continuously update them based on user feedback."
    },
    {
        q: "Are formulas referenced?",
        a: "Absolutely. We believe in 'White Box' calculation. Every tool includes a 'Formula & Calculation Details' section (often hidden by default) that shows the exact equations and logic used."
    },
    {
        q: "Can results be exported?",
        a: "Currently, you can print the results page to PDF (Ctrl+P) which is formatted for reports. We are working on a direct 'Export to Excel/PDF' feature for registered users."
    },
    {
        q: "Do you support both SI and Imperial units?",
        a: "Most of our calculators are designed with global engineers in mind and offer automatic conversion or specific fields for both Metric (SI) and Imperial units."
    },
    {
        q: "Is my calculation data saved?",
        a: "No. We prioritize your privacy. All calculations are performed client-side in your browser. We do not save any data."
    },
    {
        q: "Is registration required to use the tools?",
        a: "No. All tools on MEP Study & Tools are currently free and open for public use without any registration or fee."
    },
    {
        q: "Can I request a specific calculator?",
        a: "Yes! We value community feedback. If you have a specific standard or calculation you need, please contact us."
    }
];

// Render FAQ Accordion
const faqAccordion = document.getElementById('faq-accordion');
if (faqAccordion) {
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-accordion-item';
        
        faqItem.innerHTML = `
            <div class="faq-accordion-header">
                <h4>${item.q}</h4>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-accordion-content">
                <p>${item.a}</p>
            </div>
        `;
        
        faqAccordion.appendChild(faqItem);
    });

    // Accordion click functionality – ek time mein sirf ek khula
    const accordionHeaders = document.querySelectorAll('.faq-accordion-header');
    
    accordionHeaders.forEach((header, idx) => {
        header.addEventListener('click', function() {
            const currentItem = this.parentElement;
            const isActive = currentItem.classList.contains('active');
            
            // Pehle saare active hatao
            document.querySelectorAll('.faq-accordion-item.active').forEach(item => {
                item.classList.remove('active');
            });
            
            // Agar yeh pehle active nahi tha toh ise active karo
            if (!isActive) {
                currentItem.classList.add('active');
            }
        });
    });
} else {
    console.error('FAQ accordion container not found!');
}

// Search functionality (same)
const searchInput = document.getElementById('toolSearch');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        document.querySelectorAll('.calc-card').forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? '' : 'none';
        });
    });
}