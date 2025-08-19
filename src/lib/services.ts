// src/lib/services.ts

export interface Service {
  slug: string; // e.g., 'cooling', 'heating', 'plumbing'
  title: string; // Generic title, e.g., "Air Conditioning & Cooling Services"
  metaDescription: string; // Generic meta description, can use [City Name] or [City Name]
  shortDescription: string; // Used on service cards
  iconIdentifier: string;   // Iconify string, e.g., 'mdi:snowflake-thermometer'
  heroTitle: string; // e.g., "Cooling" - used for cards and as base for page hero
  heroSubtitle?: string; // Generic subtitle, can use [City Name] or [City Name]
  content: {
    introduction: string;
    callToActionNumber: string;
    sections: Array<{
      title: string;
      points?: string[];
      description?: string;
      subsections?: Array<{
        title: string;
        description: string;
        items?: string[];
      }>;
    }>;
    whyChooseUs: {
      title: string;
      points: string[];
    };
    process?: {
      title: string;
      steps: string[];
    };
    finalCallToAction: string;
  };
}

const COMMON_PHONE_NUMBER = '(609) 361-2727';
const COMMON_WHY_CHOOSE_US_TITLE = 'Why Choose Express Plumbing, Heating, Cooling, & Roofing?';
const GENERIC_WHY_CHOOSE_POINTS = [
  'Experienced & Certified Technicians: Our team is highly trained and certified.',
  'Straightforward Pricing: Transparent costs with no hidden fees before we start.',
  'Quality Products & Materials: We use reliable, top-quality brands and materials.',
  'Customer Satisfaction Guaranteed: Your comfort and satisfaction are our top priorities.',
  'Comprehensive Services: We offer a full range of solutions for your home or business in [City Name].', // Added [City Name]
  'Prompt & Reliable: We arrive on time and get the job done right.',
];
const GENERIC_PROCESS_TITLE = 'Our Service Process';
const GENERIC_PROCESS_STEPS = [
  'Initial Consultation & Assessment: We discuss your needs and assess the situation thoroughly.',
  'Customized Solution & Quote: We propose a tailored solution and provide a clear, upfront quote.',
  'Professional Service Execution: Our skilled technicians perform the work with precision and care.',
  'Final Inspection & Cleanup: We ensure everything meets our high standards and clean up the work area.',
  'Ongoing Support & Follow-up: We stand by our work and offer support for any future needs.',
];

export const services: Service[] = [
  {
    slug: 'cooling',
    title: 'Air Conditioning & Cooling Services in [Your Area]',
    metaDescription: 'Expert AC installation and replacement services in [City Name] by Express Plumbing. Call for energy-efficient solutions.',
    shortDescription: 'Stay cool with expert AC installation, repair, and tune-ups.',
    iconIdentifier: 'mdi:snowflake-thermometer',
    heroTitle: 'Cooling',
    heroSubtitle: 'Your trusted experts for AC solutions in [City Name] and surrounding communities.',
    content: {
      introduction: 'Welcome to Express Plumbing, Heating, Cooling, & Roofing, your trusted provider for professional AC installation and replacement services in [City Name]. Our experienced technicians are dedicated to ensuring your home stays cool and comfortable with high-quality, energy-efficient air conditioning systems. Whether you need a new installation or a replacement for an outdated unit, we are here to help.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        {
          title: 'Expert AC Installation in [City Name]',
          description: 'A properly installed air conditioning system is crucial for achieving maximum efficiency and comfort. Our team of skilled technicians provides expert AC installation services for residential and commercial properties in [City Name]. We work with top-quality brands and products to ensure you receive a reliable and energy-efficient system that meets your cooling needs. Our installation process includes:',
          points: [
            'Site Assessment: We begin with a thorough assessment of your property to determine the best location for your new AC unit. This includes evaluating your home’s size, layout, and specific cooling requirements.',
            'System Selection: Based on our assessment, we help you select the right air conditioning system that fits your needs and budget. We offer a variety of high-efficiency units from leading manufacturers.',
            'Professional Installation: Our technicians handle every aspect of the installation, from setting up the outdoor unit to installing the indoor components and connecting the necessary ductwork. We ensure all components are installed correctly and safely.',
            'Testing and Calibration: After installation, we thoroughly test and calibrate the system to ensure it operates efficiently and effectively. We also provide instructions on how to use and maintain your new AC unit.',
          ],
        },
        {
          title: 'Efficient AC Replacement for [City Name] Residents',
          description: 'If your current air conditioning system is old, inefficient, or frequently breaking down, it may be time for a replacement. Our AC replacement services in [City Name] are designed to upgrade your system with minimal disruption to your daily life. We provide:',
          points: [
            'System Evaluation: Our technicians perform a detailed evaluation of your existing AC system to determine if a replacement is necessary. We consider factors such as the age of the unit, repair history, and overall efficiency.',
            'Removal of Old Unit: We safely and efficiently remove your old air conditioning unit, ensuring proper disposal and recycling of materials.',
            'New System Installation: We install the new, energy-efficient AC unit, ensuring all components are properly connected and functioning correctly. Our goal is to enhance your home’s comfort and reduce energy consumption.',
            'Post-Installation Support: We offer ongoing support and maintenance services to keep your new AC system running smoothly. Our team is always available to answer any questions and provide assistance as needed.',
           ],
        },
        {
          title: 'Energy-Efficient Cooling Solutions',
          description: 'Upgrading to an energy-efficient air conditioning system can significantly reduce your utility bills and environmental footprint. At Express Plumbing, Heating, Cooling, & Roofing, we prioritize energy efficiency in all our installations and replacements. Our energy-efficient solutions include:',
          points: [
            'High-Efficiency Units: We offer a range of high-efficiency AC units that provide superior cooling while consuming less energy. These units are designed to meet the latest energy standards and reduce operational costs.',
            'Programmable Thermostats: Installing a programmable thermostat can help you manage your cooling system more effectively, allowing you to set specific temperatures for different times of the day and save on energy costs.',
            'Proper Insulation and Sealing: Ensuring your home is properly insulated and sealed helps maintain consistent indoor temperatures and improves the efficiency of your AC system. Our technicians can assess and recommend improvements to enhance energy savings.',
           ],
        },
      ],
      whyChooseUs: {
        title: 'Why Choose Us for Cooling in [City Name]?',
        points: GENERIC_WHY_CHOOSE_POINTS,
      },
      process: {
        title: 'Our AC Installation & Replacement Process in [City Name]',
        steps: GENERIC_PROCESS_STEPS,
      },
      finalCallToAction: 'Ensure your home in [City Name] stays cool and comfortable with Express Plumbing, Heating, Cooling, & Roofing’s expert AC installation and replacement services. Our commitment to quality, customer satisfaction, and straightforward pricing makes us the preferred choice for homeowners in the area. Whether you need a new air conditioning system installed or an old one replaced, our team is here to help.',
    },
  },
  {
    slug: 'heating',
    title: 'Reliable Heating Services in [City Name], NJ',
    metaDescription: 'Expert furnace and boiler installation, repair, and maintenance. Call Express Plumbing for winter comfort in [City Name].',
    shortDescription: 'Reliable furnace and boiler services to keep you warm all winter.',
    iconIdentifier: 'mdi:fire',
    heroTitle: 'Heating',
    heroSubtitle: 'Your local experts for dependable heating solutions in [City Name].',
    content: {
      introduction: 'When the chill of winter sets in, a reliable heating system isn’t a luxury—it’s a necessity. Express Plumbing, Heating, Cooling, & Roofing offers comprehensive heating services in [City Name], ensuring your home or business stays warm and comfortable. From furnace repairs to new boiler installations, our certified technicians are equipped to handle all your heating needs.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        {
          title: 'Furnace Services in [City Name]',
          description: 'Our expert furnace services include installation, repair, and routine maintenance to ensure your system operates efficiently and reliably. We work with all major brands and models.',
          points: [
            'New Furnace Installation: Selection and installation of high-efficiency furnaces tailored to your space.',
            'Furnace Repair: Prompt diagnosis and repair of any furnace issues, from minor fixes to major overhauls.',
            'Preventative Maintenance: Regular tune-ups to extend the life of your furnace and prevent unexpected breakdowns.',
          ],
        },
        {
          title: 'Boiler Services for [City Name] Properties',
          description: 'Boilers are a robust heating solution, and our team specializes in their installation, repair, and maintenance. Whether you have a steam or hot water boiler, we can help.',
          points: [
            'Boiler Installation & Replacement: Upgrading to modern, energy-efficient boilers.',
            'Boiler Repair: Addressing leaks, pressure issues, and no-heat situations quickly.',
            'Annual Boiler Maintenance: Keeping your boiler in peak condition for optimal performance.',
          ],
        },
        {
          title: 'Heat Pump Services',
          description: 'Heat pumps offer an energy-efficient way to both heat and cool your home. We provide installation, repair, and maintenance for various types of heat pump systems.',
        }
      ],
      whyChooseUs: {
        title: 'Why Choose Us for Heating in [City Name]?',
        points: GENERIC_WHY_CHOOSE_POINTS,
      },
      process: {
        title: 'Our Heating Service Process in [City Name]',
        steps: GENERIC_PROCESS_STEPS,
      },
      finalCallToAction: 'Don’t get left in the cold! For expert heating services in [City Name], trust the professionals at Express Plumbing, Heating, Cooling, & Roofing. Call us today to schedule your service or get a free estimate.',
    },
  },
  {
    slug: 'plumbing',
    title: 'Comprehensive Plumbing Services in [City Name], NJ',
    metaDescription: 'Your trusted local plumbers for all repairs, installations, and emergencies in [City Name]. Call Express Plumbing!',
    shortDescription: 'Comprehensive plumbing services, from fixtures to pipes.',
    iconIdentifier: 'mdi:wrench-cog-outline',
    heroTitle: 'Plumbing',
    heroSubtitle: 'Expert plumbing solutions for your home and business in [City Name].',
    content: {
      introduction: 'From minor leaks to major plumbing emergencies, Express Plumbing, Heating, Cooling, & Roofing provides reliable and professional plumbing services throughout [City Name]. Our licensed plumbers are equipped to handle a wide range of issues, ensuring your plumbing system functions smoothly and efficiently. We offer prompt service, quality workmanship, and straightforward pricing.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        {
          title: 'General Plumbing Repairs in [City Name]',
          description: 'No job is too small or too large for our team. We handle all common plumbing repairs:',
          points: [
            'Leaky Faucet & Fixture Repair',
            'Toilet Repair & Replacement',
            'Shower & Tub Issues',
            'Sump Pump Repair & Installation',
            'Water Line Repair',
            'Garbage Disposal Repair & Installation',
          ],
        },
        {
          title: 'Water Heater Services for [City Name] Homes',
          description: 'We specialize in water heater installation, repair, and maintenance for both traditional tank and tankless models, ensuring you always have hot water when you need it.',
        },
        {
          title: 'Emergency Plumbing',
          description: 'Plumbing emergencies can happen at any time. We offer prompt emergency services to address urgent issues like burst pipes or severe leaks, minimizing damage to your property.',
        }
      ],
      whyChooseUs: {
        title: 'Why Choose Us for Plumbing in [City Name]?',
        points: GENERIC_WHY_CHOOSE_POINTS,
      },
      process: {
        title: 'Our Plumbing Service Process in [City Name]',
        steps: GENERIC_PROCESS_STEPS,
      },
      finalCallToAction: 'For reliable and professional plumbing services in [City Name], look no further than Express Plumbing, Heating, Cooling, & Roofing. Call us today to schedule an appointment!',
    },
  },
  // The following services were in your original Services.tsx, adding them here with generic content
  {
    slug: 'hvac-maintenance',
    title: 'Preventative HVAC Maintenance in [City Name], NJ',
    metaDescription: 'Keep your heating and cooling systems running smoothly with our HVAC maintenance plans in [City Name]. Avoid costly repairs.',
    shortDescription: 'Preventative tune-ups to keep your systems running efficiently.',
    iconIdentifier: 'mdi:toolbox-outline',
    heroTitle: 'HVAC Maintenance',
    heroSubtitle: 'Protect your investment with regular HVAC tune-ups in [City Name].',
    content: {
      introduction: 'Regular maintenance is key to the longevity and efficiency of your HVAC system. Express Plumbing offers comprehensive HVAC maintenance plans for homeowners and businesses in [City Name]. Our preventative tune-ups help identify potential issues early, saving you from costly repairs and ensuring optimal performance year-round.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        {
          title: 'Benefits of Regular HVAC Maintenance',
          description: 'Investing in routine maintenance offers numerous advantages:',
          points: [
            'Improved Energy Efficiency: Clean systems use less energy, lowering utility bills.',
            'Extended System Lifespan: Regular care prolongs equipment life.',
            'Reduced Repair Costs: Catch minor issues early.',
            'Enhanced Comfort & Safety.',
          ],
        },
        {
          title: 'Our Comprehensive HVAC Tune-Ups',
          description: 'We cover all aspects of your heating and cooling systems during our maintenance visits.',
        },
      ],
      whyChooseUs: { title: 'Why Choose Us for HVAC Maintenance in [City Name]?', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our HVAC Maintenance Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Protect your HVAC investment in [City Name]. Contact Express Plumbing today for our maintenance plans!',
    },
  },
  {
    slug: 'iaq', // Indoor Air Quality
    title: 'Indoor Air Quality Solutions in [City Name], NJ',
    metaDescription: 'Breathe cleaner, healthier air with our IAQ solutions in [City Name], including air purifiers and humidifiers.',
    shortDescription: 'Solutions for cleaner, healthier air in your home.',
    iconIdentifier: 'mdi:leaf-circle-outline',
    heroTitle: 'Indoor Air Quality',
    heroSubtitle: 'Improve your home’s air for a healthier living environment in [City Name].',
    content: {
      introduction: 'The air inside your [City Name] home can be more polluted than outside. Express Plumbing offers IAQ solutions like air purifiers, humidifiers, and ventilation systems to create a healthier living space.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'Air Purification Systems', description: 'Installation of whole-home air purifiers to remove allergens and pollutants.' },
        { title: 'Humidity Control', description: 'Balance your home\'s humidity with humidifiers and dehumidifiers for optimal comfort.' },
      ],
      whyChooseUs: { title: 'Improve Your Air Quality in [City Name]', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our IAQ Service Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Breathe easier in [City Name] with our indoor air quality solutions. Call today!',
    },
  },
  {
    slug: 'drain-cleaning',
    title: 'Fast & Effective Drain Cleaning in [City Name], NJ',
    metaDescription: 'Clogged drains? Express Plumbing offers expert drain and sewer cleaning services in [City Name]. Clear your pipes today!',
    shortDescription: 'Fast and effective clearing of clogged drains and sewers.',
    iconIdentifier: 'mdi:pipe-valve',
    heroTitle: 'Drain Cleaning',
    heroSubtitle: 'Say goodbye to clogs with our professional drain services in [City Name].',
    content: {
      introduction: 'Slow or clogged drains in your [City Name] home can be a major nuisance. Express Plumbing provides fast drain cleaning services using advanced tools to clear blockages and restore flow.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'Signs You Need Drain Cleaning', points: ['Slow Draining Fixtures', 'Gurgling Sounds', 'Unpleasant Odors', 'Water Backups'] },
        { title: 'Our Drain Cleaning Methods', description: 'We use drain snaking, hydro jetting, and video camera inspections.' },
      ],
      whyChooseUs: { title: 'Expert Drain Cleaning in [City Name]', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our Drain Cleaning Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Don’t let clogs disrupt your day in [City Name]! Contact Express Plumbing for expert drain cleaning.',
    },
  },
  {
    slug: 'pipe-repair',
    title: 'Expert Pipe Line Repair in [City Name], NJ',
    metaDescription: 'Leaking or broken pipes? Express Plumbing offers professional pipe line repair and replacement in [City Name].',
    shortDescription: 'Expert solutions for broken, leaking, or damaged pipes.',
    iconIdentifier: 'mdi:pipe-wrench',
    heroTitle: 'Pipe Line Repair',
    heroSubtitle: 'Reliable solutions for all your pipe repair needs in [City Name].',
    content: {
      introduction: 'Damaged pipes in [City Name] can lead to water waste and property damage. Express Plumbing specializes in pipe line repair and replacement, using advanced techniques for accurate diagnosis and resolution.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'Common Pipe Problems We Address', points: ['Leaking Pipes', 'Burst/Frozen Pipes', 'Corroded Pipes', 'Cracked Pipes'] },
        { title: 'Our Repair & Replacement Techniques', description: 'Including pipe repair, replacement, and trenchless methods.' },
      ],
      whyChooseUs: { title: 'Pipe Line Experts in [City Name]', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our Pipe Repair Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Suspect a pipe problem in [City Name]? Contact Express Plumbing today!',
    },
  },
  {
    slug: 'roof-repair',
    title: 'Professional Roofing Repair in [City Name], NJ',
    metaDescription: 'Leaky or damaged roof? Express Roofing offers expert roof repair services in [City Name] to protect your home.',
    shortDescription: 'Addressing leaks, damage, and wear to extend your roof\'s life.',
    iconIdentifier: 'mdi:hammer-screwdriver',
    heroTitle: 'Roofing Repair',
    heroSubtitle: 'Timely and effective repairs to keep your [City Name] roof strong.',
    content: {
      introduction: 'Your [City Name] home’s roof is its first defense. Express Plumbing provides professional roofing repairs to fix leaks, replace damaged shingles, and address other issues, protecting your property.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'Common Roofing Problems', points: ['Missing/Cracked Shingles', 'Roof Leaks', 'Damaged Flashing', 'Wind/Hail Damage'] },
        { title: 'Our Roof Repair Process', description: 'Thorough inspection, detailed quote, quality materials, and expert workmanship.' },
      ],
      whyChooseUs: { title: 'Your [City Name] Roofing Repair Specialists', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our Roof Repair Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Don’t let roof damage compromise your [City Name] home. Contact Express Plumbing for a free inspection!',
    },
  },
  {
    slug: 'roof-replacement',
    title: 'Quality Roofing Replacement in [City Name], NJ',
    metaDescription: 'Need a new roof? Express Roofing provides top-quality roof replacement services in [City Name] with durable materials.',
    shortDescription: 'Quality materials and installation for a durable new roof.',
    iconIdentifier: 'mdi:home-roof',
    heroTitle: 'Roofing Replacement',
    heroSubtitle: 'Invest in a new roof for long-lasting protection in [City Name].',
    content: {
      introduction: 'A roof replacement is a significant investment. Express Plumbing offers top-quality roofing replacement in [City Name], using durable materials and expert installation for lasting protection.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'When to Consider Roof Replacement', points: ['Roof Age', 'Widespread Damage', 'Persistent Leaks', 'Storm Damage'] },
        { title: 'Our Replacement Process', description: 'Consultation, material selection, old roof removal, deck preparation, new system installation, and cleanup.' },
      ],
      whyChooseUs: { title: 'Trusted Roof Replacement in [City Name]', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our Roof Replacement Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Ready for a new roof in [City Name]? Trust Express Plumbing for quality installation. Contact us for a free estimate!',
    },
  },
  {
    slug: 'roof-repair',
    title: 'Professional Roofing Repair in [City Name], NJ',
    metaDescription: 'Leaky or damaged roof? Express Roofing offers expert roof repair services in [City Name] to protect your home.',
    shortDescription: 'Addressing leaks, damage, and wear to extend your roof\'s life.',
    iconIdentifier: 'mdi:hammer-screwdriver',
    heroTitle: 'Roofing Repair',
    heroSubtitle: 'Timely and effective repairs to keep your [City Name] roof strong.',
    content: {
      introduction: 'Your [City Name] home’s roof is its first defense. Express Plumbing provides professional roofing repairs to fix leaks, replace damaged shingles, and address other issues, protecting your property.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'Common Roofing Problems', points: ['Missing/Cracked Shingles', 'Roof Leaks', 'Damaged Flashing', 'Wind/Hail Damage'] },
        { title: 'Our Roof Repair Process', description: 'Thorough inspection, detailed quote, quality materials, and expert workmanship.' },
      ],
      whyChooseUs: { title: 'Your [City Name] Roofing Repair Specialists', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our Roof Repair Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Don’t let roof damage compromise your [City Name] home. Contact Express Plumbing for a free inspection!',
    },
  },
  {
    slug: 'roofing',
    title: 'Quality Roofing Replacement in [City Name], NJ',
    metaDescription: 'Need a new roof? Express Roofing provides top-quality roof replacement services in [City Name] with durable materials.',
    shortDescription: 'Quality materials and installation for a durable new roof.',
    iconIdentifier: 'mdi:home-roof',
    heroTitle: 'Roofing Replacement',
    heroSubtitle: 'Invest in a new roof for long-lasting protection in [City Name].',
    content: {
      introduction: 'A roof replacement is a significant investment. Express Plumbing offers top-quality roofing replacement in [City Name], using durable materials and expert installation for lasting protection.',
      callToActionNumber: COMMON_PHONE_NUMBER,
      sections: [
        { title: 'When to Consider Roof Replacement', points: ['Roof Age', 'Widespread Damage', 'Persistent Leaks', 'Storm Damage'] },
        { title: 'Our Replacement Process', description: 'Consultation, material selection, old roof removal, deck preparation, new system installation, and cleanup.' },
      ],
      whyChooseUs: { title: 'Trusted Roof Replacement in [City Name]', points: GENERIC_WHY_CHOOSE_POINTS },
      process: { title: 'Our Roof Replacement Process in [City Name]', steps: GENERIC_PROCESS_STEPS },
      finalCallToAction: 'Ready for a new roof in [City Name]? Trust Express Plumbing for quality installation. Contact us for a free estimate!',
    },
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};

export const getAllServiceSlugs = () => {
  return services.map(service => ({
    params: { slug: service.slug }, // Ensures this matches the [slug] folder name
  }));
};
