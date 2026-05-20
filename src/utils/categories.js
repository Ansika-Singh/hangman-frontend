export const CATEGORIES = {
  "🧠 General": [
    "abbreviation","abomination","acceleration","accommodation","accomplishment","acknowledgment","acquaintance","administration",
    "affectionate","aggravation","ameliorate","amplification","anticipation","apprehension","approximately","architecture",
    "argumentative","articulation","atmospheric","authorization","bewilderment","bureaucratic","catastrophic","ceremonially",
    "championship","characteristic","choreography","circumstances","classification","collaboration","commemorate","communication",
    "complications","comprehension","concentration","condescending","configuration","congratulation","conscientious","conservation",
    "consolidation","constellation","controversial","conventional","counterclockwise","declaration","deforestation","deliberation",
    "demonstration","denomination","deportation","despondency","determination","differentiate","disqualification","documentation",
    "dramatically","elaboration","electromagnetic","embellishment","embarrassment","encouragement","entrepreneurship","environmental",
    "establishment","exaggeration","examination","exasperation","experimentation","extraordinary","fabrication","fascination",
    "flabbergasted","flamboyant","formidable","fragmentation","fundamentally","generalization","glorification","grammatically",
    "gratification","hallucination","humanitarian","humiliation","hypothetically","identification","illustration","imagination",
    "impersonation","implementation","impossibility","imprisonment","incarceration","incomprehensible","indeterminate",
    "indistinguishable","industrialization","infatuation","infrastructure","inquisitive","interpretation","intoxication",
    "intimidation","investigation","justification","kaleidoscope","knowledgeable","lamentation","legislation","liberalization",
    "manipulation","meaningfully","miscellaneous","misinterpret","misrepresentation","modification","multiplication",
    "municipality","nonchalantly","observation","overwhelming","participation","persecution","personification","persuasion",
    "polarization","precipitation","preoccupation","proclamation","pronunciation","proportional","psychological","qualification",
    "rationalization","reconciliation","reinforcement","reorganization","representation","resurrection","reverberation",
    "revolutionary","satisfaction","sensationalize","significantly","sophisticated","specification","standardization",
    "straightforward","subordination","substantially","supernatural","transformation","transportation","underestimate",
    "unfortunately","urbanization","vulnerability","uncomfortable","uncontrollable","understanding","unforgettable",
    "unpredictable","systematically","internationally","simultaneously","enthusiastically","disproportionate","responsibility",
    "misunderstanding","interconnected","accountability","thunderstorm","butterfingers","neighborhood","introduction",
    "underground","adventurous","calculation","mountainous","perspective","wonderfully","spectacular","electricity",
    "problematic","influential","credentials","competitive","descriptive","persistence","resilience","conspiracy","substantial",
    "compelling","geographic","microscopic","telescopic","motorcycle","helicopter","philosophy","psychology","sociology",
    "astronomy","democracy","bureaucracy","diplomacy","pharmacy","advocacy","prophecy","emergency","frequency","accuracy"
  ],
  "🔬 Science": [
    "photosynthesis","mitochondria","thermodynamics","electromagnetism","biodiversity","chromosome","gravitational",
    "atmospheric","molecules","radioactive","vaccination","experiment","laboratory","hypothesis","evaporation",
    "combustion","resistance","acceleration","wavelength","frequency","microscopic","telescopic","planetary",
    "ecosystem","metamorphosis","hibernation","evolution","adaptation","carnivorous","herbivorous","omnivorous",
    "bioluminescence","crystallization","decomposition","fermentation","germination","magnetosphere","nanotechnology",
    "oscillation","precipitation","quantification","radioactivity","spectroscopy","stratosphere","sublimation",
    "tectonic","ultraviolet","vaccination","vertebrates","wavelength","xenobiology","yellowstone","zooplankton",
    "antibiotics","atmosphere","biochemistry","catalysis","centrifugal","chlorophyll","circulation","conduction",
    "convection","cytoplasm","diffraction","digestion","deoxyribose","electrode","electrolyte","embryology",
    "endothermic","exothermic","filtration","fluorescence","fossilization","geothermal","gravitation","hemoglobin",
    "hydraulics","infectious","ionization","kinematics","luminescence","metabolism","neutron","nucleotide",
    "osmosis","oxidation","parasite","permeability","photon","polymer","proton","radiation","refraction",
    "respiration","satellite","seismology","symbiosis","taxonomy","transpiration","turbulence","ultrasound",
    "viscosity","volcanology","weathering","absorption","adaptation","aerodynamics","alchemy","algae"
  ],
  "🌍 Geography": [
    "Mediterranean","archipelago","mountaineering","geographical","continental","hemisphere","coordinates","longitude",
    "latitude","equatorial","subtropical","temperate","peninsula","tributary","watershed","elevation","topography",
    "cartography","urbanization","deforestation","desertification","irrigation","agriculture","civilization","settlement",
    "infrastructure","population","migration","emigration","immigration","sovereignty","territory","boundaries",
    "landlocked","coastline","oceanography","glaciation","permafrost","savannah","rainforest","deciduous","coniferous",
    "biodiversity","endangered","conservation","reservation","indigenous","archaeological","prehistoric","monument",
    "cathedral","parliament","skyscraper","boulevard","metropolis","megacity","suburb","municipality","province",
    "confederation","federation","republic","democracy","monarchy","dictatorship","parliament","constitution",
    "legislation","ambassador","diplomatic","international","geopolitical","strategic","economic","industrial",
    "commercial","residential","agricultural","recreational","transportation","infrastructure","electricity",
    "renewable","sustainable","environmental","ecological","biological","chemical","physical","natural",
    "artificial","traditional","historical","cultural","religious","political","social","economic","technological"
  ],
  "🎭 Entertainment": [
    "cinematography","choreography","performance","documentary","blockbuster","screenplay","protagonist","antagonist",
    "characterization","improvisation","orchestra","symphony","percussion","microphone","broadcasting","publication",
    "illustration","animation","production","distribution","advertisement","collaboration","entertainment","competition",
    "championship","tournament","elimination","qualification","spectacular","extraordinary","phenomenal","celebration",
    "appreciation","recognition","achievement","accomplishment","demonstration","presentation","exhibition","festival",
    "carnival","theatrical","dramatic","comedic","satirical","biographical","fictional","experimental","documentary",
    "interactive","multimedia","broadcasting","streaming","subscription","recommendation","algorithm","trending",
    "influencer","collaboration","sponsorship","merchandise","branding","marketing","promotion","advertisement",
    "audience","viewership","popularity","recognition","celebrity","stardom","performance","audition","rehearsal",
    "production","direction","screenplay","dialogue","monologue","soliloquy","narrative","storyline","character",
    "protagonist","antagonist","supporting","background","atmosphere","soundtrack","composition","arrangement",
    "improvisation","interpretation","expression","creativity","imagination","inspiration","dedication","passion"
  ],
  "💻 Technology": [
    "cybersecurity","cryptocurrency","programming","algorithm","blockchain","artificial","intelligence","machine",
    "framework","repository","database","encryption","authentication","authorization","infrastructure","deployment",
    "configuration","optimization","performance","scalability","reliability","availability","maintenance","development",
    "engineering","architecture","integration","automation","virtualization","containerization","microservices",
    "serverless","bandwidth","latency","throughput","processing","computing","networking","protocol","interface",
    "application","software","hardware","firmware","middleware","operating","environment","simulation","modeling",
    "visualization","analytics","monitoring","debugging","refactoring","documentation","collaboration","agile",
    "iterative","incremental","continuous","deployment","integration","testing","validation","verification",
    "authentication","authorization","permission","privilege","vulnerability","exploitation","penetration",
    "investigation","forensics","recovery","backup","redundancy","failover","disaster","mitigation","prevention",
    "detection","response","remediation","notification","escalation","resolution","documentation","reporting",
    "communication","coordination","collaboration","management","leadership","organization","planning","strategy",
    "execution","measurement","evaluation","improvement","innovation","transformation","disruption","revolution"
  ]
};

export const ALL_CATEGORY_NAMES = Object.keys(CATEGORIES);

export function getRandomWords(category, n) {
  const pool = category === "🎲 Random"
    ? Object.values(CATEGORIES).flat()
    : CATEGORIES[category] || CATEGORIES["🧠 General"];
  const long = [...new Set(pool)].filter(w => w.length >= 7);
  return long.sort(() => Math.random() - 0.5).slice(0, n);
}
