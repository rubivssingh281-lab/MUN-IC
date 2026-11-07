/**
 * Conference Static Dataset
 * SAARTHI Model United Nations 2026
 */

export const COMMITTEES_DATA = [
    {
        id: 'UNGA',
        name: 'UNGA',
        fullName: 'United Nations General Assembly',
        icon: 'ph-shield-check',
        badge: null,
        description: 'Addressing complex international security landscapes, multilateral disarmament pacts, and the preservation of global peace.',
        experienceLevel: 'All Levels',
        status: 'Filling Fast',
        keyPortfolios: ['USA', 'Russia', 'China', 'UK', 'France', 'India', 'Japan', 'Germany']
    },
    {
        id: 'WHO',
        name: 'WHO',
        fullName: 'World Health Organization - Beginner',
        icon: 'ph-heartbeat',
        badge: { text: 'Beginner Friendly', type: 'beginner' },
        description: 'An accessible committee tailored for first-time delegates to build parliamentary acumen while tackling global health equity and pandemics.',
        experienceLevel: 'Beginner Friendly',
        status: 'Available',
        keyPortfolios: ['Brazil', 'South Africa', 'Canada', 'Australia', 'Switzerland', 'Italy']
    },
    {
        id: 'AIPPM',
        name: 'AIPPM',
        fullName: 'All India Political Parties Meet',
        icon: 'ph-bank',
        badge: null,
        description: 'A fiery simulation of Indian parliamentary politics, deliberating upon constitutional governance, national policy, and socio-economic legislation.',
        experienceLevel: 'Intermediate / Advanced',
        status: 'Filling Fast',
        keyPortfolios: ['Prime Minister', 'Leader of Opposition', 'Key Union Ministers', 'State CMs']
    },
    {
        id: 'UNCSW',
        name: 'UNCSW',
        fullName: 'Commission on the Status of Women',
        icon: 'ph-scales',
        badge: null,
        description: "Advancing global gender equality, socio-economic empowerment, eliminating institutional vulnerabilities, and upholding women's fundamental rights.",
        experienceLevel: 'All Levels',
        status: 'Available',
        keyPortfolios: ['Sweden', 'New Zealand', 'Rwanda', 'Mexico', 'Spain', 'UAE']
    },
    {
        id: 'UNHRC',
        name: 'UNHRC',
        fullName: 'United Nations Human Rights Council',
        icon: 'ph-hand-heart',
        badge: null,
        description: 'Investigating urgent human rights situations, protecting civil liberties, upholding humanitarian covenants, and championing justice worldwide.',
        experienceLevel: 'All Levels',
        status: 'Available',
        keyPortfolios: ['Norway', 'Argentina', 'Netherlands', 'Ghana', 'South Korea']
    },
    {
        id: 'MAHABHARATA',
        name: 'MAHABHARATA',
        fullName: 'Historic & Dharmic Crisis Committee',
        icon: 'ph-sword',
        badge: { text: 'Special Crisis', type: 'special' },
        description: 'Enter the epic political and ethical battlefield of Hastinapur. Test strategic diplomacy, moral rajneeti, and timeless dharma amidst monumental stakes.',
        experienceLevel: 'Special Crisis / All',
        status: 'Limited Slots',
        keyPortfolios: ['Yudhishthira', 'Duryodhana', 'Bhishma', 'Karna', 'Vidura', 'Drona']
    },
    {
        id: 'NATO',
        name: 'NATO',
        fullName: 'North Atlantic Treaty Organization',
        icon: 'ph-shield-star',
        badge: null,
        description: 'Executing collective security doctrines, deterrence strategies, modern alliance dynamics, and response protocols to emerging regional conflicts.',
        experienceLevel: 'Intermediate / Advanced',
        status: 'Available',
        keyPortfolios: ['USA', 'Turkey', 'Poland', 'UK', 'Germany', 'Estonia', 'Finland']
    }
];

export const LEADERSHIP_DATA = [
    {
        id: 'founder',
        name: 'IPSHITA CHAUDHARY',
        title: 'Founder',
        badge: null,
        image: 'assets/profile.jpg',
        bio: 'Envisioning SAARTHI as a beacon of principled leadership and transformative dialogue where youth step up to solve global dilemmas.'
    },
    {
        id: 'sec-gen',
        name: 'Secretary-General',
        title: 'Secretary-General',
        badge: 'Executive Head',
        image: 'assets/profile.jpg',
        bio: 'Leading the conference operations and substantive vision, ensuring an equitable, high-standard diplomatic platform for every delegate.'
    },
    {
        id: 'chief-advisor',
        name: 'Chief Advisor',
        title: 'Chief Advisor',
        badge: null,
        image: 'assets/profile.jpg',
        bio: 'Providing strategic mentorship, institutional guidance, and diplomatic expertise to steer SAARTHI towards unprecedented heights.'
    }
];

export const RESOURCES_DATA = [
    {
        id: 'brochure',
        title: 'Brochure',
        subtitle: 'Conference Prospectus & Guide',
        badge: 'Official PDF',
        icon: 'ph-file-pdf',
        description: 'Comprehensive conference overview containing the vision, committee briefs, rules of procedure, schedule, and delegate code of conduct.',
        actionType: 'modal',
        actionTarget: 'brochure',
        actionText: 'Download Brochure'
    },
    {
        id: 'individual-form',
        title: 'Individual Delegate Form',
        subtitle: 'Solo Delegate Application',
        badge: 'Open Now',
        icon: 'ph-user',
        description: 'Register as an individual delegate. Select your committee preferences and preferred country/character portfolios across all 7 committees.',
        actionType: 'link',
        actionTarget: '#registration',
        track: 'individual',
        actionText: 'Register as Delegate'
    },
    {
        id: 'matrix',
        title: 'Country & Portfolio Matrix',
        subtitle: 'Real-Time Committee Allocations',
        badge: 'Live Allocations',
        icon: 'ph-table',
        description: 'Browse the exhaustive matrix of available countries, ministries, and crisis portfolios across UNGA, WHO, AIPPM, UNCSW, UNHRC, Mahabharata, and NATO.',
        actionType: 'modal',
        actionTarget: 'matrix',
        actionText: 'View Country Matrix'
    },
    {
        id: 'school-form',
        title: 'School Delegation Form',
        subtitle: 'Institutional Delegation Portal',
        badge: 'Institutions',
        icon: 'ph-buildings',
        description: 'Register institutional contingents from schools and colleges with faculty advisor coordination and group portfolio allocation perks.',
        actionType: 'link',
        actionTarget: '#registration',
        track: 'school',
        actionText: 'Register Delegation'
    },
    {
        id: 'eb-form',
        title: 'EB Application',
        subtitle: 'Executive Board Portal',
        badge: 'Leadership',
        icon: 'ph-gavel',
        description: 'Apply to adjudicate and preside over one of the 7 committees as Chairperson, Vice-Chairperson, or Director. Shape debate from the dais.',
        actionType: 'link',
        actionTarget: '#registration',
        track: 'eb',
        actionText: 'Apply for EB'
    },
    {
        id: 'rapporteur-form',
        title: 'Rapporteur Application',
        subtitle: 'International Press & Reporting',
        badge: 'Press Corps',
        icon: 'ph-newspaper',
        description: 'Join the conference reporting and journalism corps. Draft official press releases, committee summaries, and investigative conference chronicles.',
        actionType: 'link',
        actionTarget: '#registration',
        track: 'rapporteur',
        actionText: 'Apply as Rapporteur'
    }
];
