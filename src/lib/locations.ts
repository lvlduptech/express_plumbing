// src/lib/locations.ts

export interface ServiceAreaMap {
    [key: string]: string[]; // e.g., { Ocean: ["Toms River", "Brick"], ... }
}

// Function to clean up municipality names (remove suffixes, handle renames, disambiguate)
function cleanName(name: string, county?: string): string {
    // Handle known renames first
    if (name.toUpperCase() === 'DOVER TWP.') return 'Toms River';
    if (name.toUpperCase() === 'SOUTH BELMAR BORO') return 'Lake Como';
    if (name.toUpperCase() === 'PRINCETON BORO') return 'Princeton';
    if (name.toUpperCase() === 'PRINCETON TWP.') return ''; // Remove duplicate Princeton Twp
    if (name.toUpperCase() === 'WEST PATERSON BORO') return 'Woodland Park';
    if (name.toUpperCase() === 'OCEAN TWP.' && county === 'Ocean') return 'Waretown (Ocean Twp)'; // Disambiguate Ocean Twps

    // Disambiguate common names based on county context
    if (county) {
        const upperName = name.toUpperCase();
        if (upperName.startsWith('WASHINGTON TWP')) return `Washington Twp (${county})`;
        if (upperName.startsWith('GREENWICH TWP')) return `Greenwich Twp (${county})`;
        if (upperName.startsWith('FRANKLIN TWP')) return `Franklin Twp (${county})`;
        if (upperName.startsWith('MANSFIELD TWP')) return `Mansfield Twp (${county})`;
        if (upperName.startsWith('SPRINGFIELD TWP')) return `Springfield Twp (${county})`;
        if (upperName.startsWith('CHESTER TWP') && county === 'Morris') return `Chester Twp (${county})`;
        if (upperName.startsWith('UNION TWP')) return `Union Twp (${county})`;
        if (upperName.startsWith('OCEAN TWP') && county === 'Monmouth') return `Ocean Twp (${county})`;
        if (upperName.startsWith('HAMILTON TWP')) return `Hamilton Twp (${county})`;
        if (upperName.startsWith('HOPEWELL TWP')) return `Hopewell Twp (${county})`;
        if (upperName.startsWith('LAWRENCE TWP')) return `Lawrence Twp (${county})`;
        // Handle Chesterfield rename specifically for Burlington
        if (upperName.startsWith('CHESTER TWP') && county === 'Burlington') return 'Chesterfield';
    }


    // General suffix removal
    let cleaned = name.replace(/ (CITY|BORO|TWP\.?|TOWN|VILLAGE)$/i, '').trim();
    // Specific known cases like Evesham (Marlton) if needed
    cleaned = cleaned.replace('EVESHAM', 'Evesham (Marlton)');
    return cleaned;
}

// Curated list of ~8 major/representative municipalities per county
export const serviceAreas: ServiceAreaMap = {
  Ocean: ["Toms River", "Brick", "Lakewood", "Jackson", "Lacey", "Manchester", "Berkeley", "Stafford"].map(name => cleanName(name, 'Ocean')).filter(Boolean).sort(),
  Monmouth: ["Middletown", "Howell", "Freehold Twp", "Manalapan", "Wall Twp", "Neptune Twp", "Long Branch", "Asbury Park"].map(name => cleanName(name, 'Monmouth')).filter(Boolean).sort(),
  Atlantic: ["Egg Harbor Twp", "Galloway", "Hamilton Twp", "Pleasantville", "Hammonton", "Somers Point", "Atlantic City", "Margate"].map(name => cleanName(name, 'Atlantic')).filter(Boolean).sort(),
  Burlington: ["Mount Laurel", "Evesham (Marlton)", "Medford", "Moorestown", "Burlington Twp", "Willingboro", "Cinnaminson", "Pemberton Twp"].map(name => cleanName(name, 'Burlington')).filter(Boolean).sort(),
  Bergen: ["Hackensack", "Teaneck", "Fort Lee", "Paramus", "Ridgewood", "Fair Lawn", "Garfield", "Englewood"].map(name => cleanName(name, 'Bergen')).filter(Boolean).sort(),
  Camden: ["Camden", "Cherry Hill", "Gloucester Twp", "Pennsauken", "Voorhees", "Winslow", "Haddonfield", "Collingswood"].map(name => cleanName(name, 'Camden')).filter(Boolean).sort(),
  'Cape May': ["Ocean City", "Lower Twp", "Middle Twp", "Upper Twp", "Wildwood", "Cape May", "Sea Isle City", "Avalon"].map(name => cleanName(name, 'Cape May')).filter(Boolean).sort(),
  Cumberland: ["Vineland", "Millville", "Bridgeton", "Upper Deerfield", "Fairfield", "Maurice River", "Commercial", "Lawrence Twp"].map(name => cleanName(name, 'Cumberland')).filter(Boolean).sort(),
  Essex: ["Newark", "East Orange", "Irvington", "West Orange", "Bloomfield", "Montclair", "Belleville", "Livingston"].map(name => cleanName(name, 'Essex')).filter(Boolean).sort(),
  Gloucester: ["Washington Twp", "Deptford", "Monroe", "Glassboro", "West Deptford", "Franklin Twp", "Woolwich", "Harrison"].map(name => cleanName(name, 'Gloucester')).filter(Boolean).sort(),
  Hudson: ["Jersey City", "Union City", "North Bergen", "Bayonne", "Hoboken", "West New York", "Kearny", "Secaucus"].map(name => cleanName(name, 'Hudson')).filter(Boolean).sort(),
  Hunterdon: ["Raritan Twp", "Readington", "Clinton Twp", "Flemington", "Tewksbury", "Alexandria", "Delaware", "Union Twp"].map(name => cleanName(name, 'Hunterdon')).filter(Boolean).sort(),
  Mercer: ["Hamilton Twp", "Trenton", "Ewing", "Lawrence Twp", "Princeton", "West Windsor", "East Windsor", "Hopewell Twp"].map(name => cleanName(name, 'Mercer')).filter(Boolean).sort(),
  Middlesex: ["Edison", "Woodbridge", "Old Bridge", "Piscataway", "New Brunswick", "Perth Amboy", "East Brunswick", "South Brunswick"].map(name => cleanName(name, 'Middlesex')).filter(Boolean).sort(),
  Morris: ["Parsippany-Troy Hills", "Mount Olive", "Randolph", "Rockaway Twp", "Morris Twp", "Morristown", "Denville", "Roxbury"].map(name => cleanName(name, 'Morris')).filter(Boolean).sort(),
  Passaic: ["Paterson", "Clifton", "Wayne", "Passaic", "Hawthorne", "West Milford", "Woodland Park", "Ringwood"].map(name => cleanName(name, 'Passaic')).filter(Boolean).sort(),
  Salem: ["Pennsville", "Carneys Point", "Salem", "Penns Grove", "Pilesgrove", "Upper Pittsgrove", "Woodstown", "Oldmans"].map(name => cleanName(name, 'Salem')).filter(Boolean).sort(),
  Somerset: ["Franklin Twp", "Bridgewater", "Hillsborough", "Bernards", "Montgomery", "North Plainfield", "Somerville", "Warren"].map(name => cleanName(name, 'Somerset')).filter(Boolean).sort(),
  Sussex: ["Vernon", "Sparta", "Hopatcong", "Wantage", "Newton", "Hardyston", "Frankford", "Byram"].map(name => cleanName(name, 'Sussex')).filter(Boolean).sort(),
  Union: ["Elizabeth", "Union Twp", "Plainfield", "Linden", "Westfield", "Rahway", "Cranford", "Summit"].map(name => cleanName(name, 'Union')).filter(Boolean).sort(),
  Warren: ["Phillipsburg", "Washington Twp", "Hackettstown", "Lopatcong", "Mansfield Twp", "Greenwich Twp", "Blairstown", "White"].map(name => cleanName(name, 'Warren')).filter(Boolean).sort(),
};

// Helper function to generate slugs (used by dynamic pages)
function generateSlug(name: string): string {
    const nameStr = String(name || '');
    // Include county disambiguation in slug if present
    const slugBase = nameStr.toLowerCase()
        .replace(/ \([^)]+\)/g, '') // Remove county part for base slug if needed, or keep it
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    // Optional: Add county back for uniqueness if removed above
    const countyMatch = nameStr.match(/ \(([^)]+)\)/);
    if (countyMatch) {
        return `${slugBase}-${countyMatch[1].toLowerCase()}`;
    }
    return slugBase;
}

// Helper function to get all CURATED locations as a flat array
// Needed for generateStaticParams and generateMetadata
export function getAllLocations() {
    const locations: { slug: string; name: string }[] = [];
    for (const county in serviceAreas) {
        serviceAreas[county].forEach(town => {
            if (town) { // Ensure town is not empty string
              locations.push({
                  slug: generateSlug(town), // Generate slug from potentially disambiguated name
                  name: town // Use the potentially disambiguated name for display/metadata
              });
            }
        });
    }
    // Remove potential duplicates (less likely now)
    const uniqueLocations = Array.from(new Map(locations.map(item => [item.slug, item])).values());
    // Sort the final unique list alphabetically by name
    uniqueLocations.sort((a, b) => a.name.localeCompare(b.name));
    return uniqueLocations;
}
