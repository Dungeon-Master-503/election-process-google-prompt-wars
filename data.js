// js/data.js

export const journeySteps = [
  {
    id: 1,
    title: "Voter Registration",
    icon: "ri-user-add-line",
    shortDesc: "Get registered to vote in your region.",
    timeline: "Usually 15 to 30 days before Election Day.",
    description: "Voter registration is the official process by which eligible citizens sign up to be on the voter rolls. Without registering, election officials cannot verify your identity or issue you a ballot.",
    description_eli15: "Think of voter registration like signing up for a library card. Before you can check out books, the library needs to know who you are and where you live. Registration does the same for voting!",
    documents: [
      "Driver's License or State-issued Photo ID",
      "Social Security Number (last 4 digits)",
      "Proof of Residency (utility bill, lease, bank statement if address doesn't match ID)"
    ],
    tips: [
      "Check your state's online registration portal; most states let you register in under 10 minutes.",
      "If you move, change your name, or want to switch political parties, you must update your registration.",
      "Check if your state offers 'Same-Day Voter Registration' on Election Day."
    ],
    checklist: [
      "Check state registration deadline",
      "Gather required ID or proof of residency documents",
      "Submit registration form online or by mail",
      "Verify registration confirmation status"
    ],
    faqs: [
      {
        question: "Does registering to vote cost money?",
        answer: "No, voter registration is completely free. Be careful of websites charging fees; only use official state (.gov) or trusted non-partisan portals.",
        answer_eli15: "Nope! It's 100% free, just like signing up for public school or getting a card at the public library."
      },
      {
        question: "Do I have to register every single year?",
        answer: "No, once you register at your current address, you stay registered. You only need to register again if you move, change your legal name, or wish to change your political party affiliation.",
        answer_eli15: "No! Once you are on the list, you stay there. You only need to update it if you move to a new house or change your name."
      }
    ]
  },
  {
    id: 2,
    title: "Eligibility Check",
    icon: "ri-shield-user-line",
    shortDesc: "Confirm you meet all criteria to vote.",
    timeline: "Perform this check immediately before registering.",
    description: "Before you register, you must ensure you meet the legal qualifications. In most democratic nations, this includes requirements around age, citizenship, and residence.",
    description_eli15: "Eligibility check is like verifying you meet the height requirement to ride a roller coaster. You just check a few simple rules to make sure you're legally allowed to join in!",
    documents: [
      "Proof of Citizenship (Birth Certificate, Passport, or Naturalization papers)",
      "Proof of Age (Government ID)"
    ],
    tips: [
      "You must be 18 years old by Election Day (in many places you can pre-register at 16 or 17).",
      "Living abroad? You can still vote via absentee ballots (FVAP program).",
      "If you have a past felony conviction, check your local laws as voting rights restoration varies widely."
    ],
    checklist: [
      "Confirm citizenship requirements",
      "Ensure you will be 18 years old on or before Election Day",
      "Verify residency duration requirements in your precinct"
    ],
    faqs: [
      {
        question: "Can I vote if I am 17 right now but will turn 18 by Election Day?",
        answer: "Yes, in almost all states, you can pre-register or register at 17 if your 18th birthday falls on or before the day of the general election.",
        answer_eli15: "Yes! If you blow out your 18th birthday candles on or before Election Day, you can register now and vote when the day arrives."
      },
      {
        question: "Can college students vote from their campus address?",
        answer: "Yes. College students have the choice to register at their campus address or keep their registration at their permanent home address, but they can only vote in one place.",
        answer_eli15: "Yes, you can! You get to choose whether to vote from your college dorm address or your parents' house. But no double-voting!"
      }
    ]
  },
  {
    id: 3,
    title: "Required Documents",
    icon: "ri-file-paper-2-line",
    shortDesc: "Organize identification required by your state.",
    timeline: "Prepare these documents at least a week before voting.",
    description: "Voter identification laws vary by jurisdiction. Some states require strict photo IDs, others accept non-photo IDs (like utility bills), while some use signature matching and require no document presentation at the booth.",
    description_eli15: "Think of this like buying a ticket to a concert. Before they let you in the door, security needs to check your ticket and your ID to make sure you are really you.",
    documents: [
      "State ID Card / Driver's License",
      "US Passport",
      "Student ID (only accepted in certain states)",
      "Utility Bill or Bank Statement with your current address"
    ],
    tips: [
      "Always check your local state rules as ID requirements are subject to change.",
      "If you do not have a photo ID, ask about 'Provisional Ballots' or local exemptions.",
      "Keep digital copies on your phone, but remember most polling booths require physical documents."
    ],
    checklist: [
      "Look up your state's voter identification laws",
      "Locate your physical ID card and verify it is not expired",
      "Print a backup utility bill if your state requires address verification"
    ],
    faqs: [
      {
        question: "What happens if my ID has expired?",
        answer: "Some states allow expired IDs if they expired recently or if the voter is over a certain age. However, to avoid issues, it is highly recommended to carry a valid, unexpired ID.",
        answer_eli15: "It depends on where you live. Some places let you use it if it expired recently, but it's best to renew it or bring another document to be safe."
      },
      {
        question: "Can I vote if I don't have any ID on Election Day?",
        answer: "In states with strict ID laws, you may have to vote using a 'Provisional Ballot' and return within a few days to show valid ID for your vote to count.",
        answer_eli15: "Yes, you can vote on a temporary 'provisional' ballot. But you'll need to show your ID to election officials within a couple of days so they can count it."
      }
    ]
  },
  {
    id: 4,
    title: "Finding Polling Booths",
    icon: "ri-map-pin-user-line",
    shortDesc: "Locate your assigned voting location.",
    timeline: "Find your location 1-2 weeks before Election Day.",
    description: "In person voting requires you to go to your designated polling place, which is assigned based on your residential address. Voting at the wrong location will mean your name won't be on the ledger.",
    description_eli15: "Imagine going to the wrong classroom for an exam. Your teacher won't have your test paper! You must find your specific assigned voting spot so they have your name ready.",
    documents: [
      "Voter Registration Card (optional, but helps locate your line quickly)",
      "Smart phone for navigation"
    ],
    tips: [
      "Polling locations can change from year to year. Double-check your location the morning of the election.",
      "Check wait times online if your county offers live updates.",
      "Understand transport options; many public transit networks offer free rides on Election Day."
    ],
    checklist: [
      "Search for your polling place using official state lookup databases",
      "Plan your transportation route and estimate travel time",
      "Confirm polling place hours (when doors open and close)"
    ],
    faqs: [
      {
        question: "Can I vote at any polling place in my city?",
        answer: "Usually, no. You are assigned a specific neighborhood precinct. If you go to the wrong polling place, your name will not appear on the register and you might have to fill out a provisional ballot.",
        answer_eli15: "Normally, you have to go to your designated local spot. Going to the wrong one is like showing up at a dentist office for a haircut!"
      },
      {
        question: "What if I am still standing in line when the polls close?",
        answer: "If you are in line before the official closing time, you have a legal right to vote. Do not leave the line; the poll workers are required to let everyone in line vote.",
        answer_eli15: "Stay in line! If you are standing in line before the closing bell rings, they are legally required to let you cast your vote."
      }
    ]
  },
  {
    id: 5,
    title: "Understanding Candidates",
    icon: "ri-user-search-line",
    shortDesc: "Research candidates, ballots, and measures.",
    timeline: "Research 2-3 weeks before casting your vote.",
    description: "An informed vote is a powerful vote. Citizens should review sample ballots, research candidate policies, and understand the impact of local referendums and ballot measures.",
    description_eli15: "This is like reading reviews before buying a new video game. You want to look at the features, see what other players say, and make sure it's the right choice for you!",
    documents: [
      "Sample Ballot (available online from local election office)",
      "Non-partisan voter guides (like Vote411 or League of Women Voters)"
    ],
    tips: [
      "Look up a sample ballot beforehand. This lets you research judges, school boards, and ballot initiatives you might not know about.",
      "Avoid biased social media campaigns. Cross-reference candidates' voting records and stated policies.",
      "You can bring notes or a printout of your choices into the voting booth in most states."
    ],
    checklist: [
      "Download your specific precinct's sample ballot",
      "Research candidates' platforms, debates, and funding sources",
      "Read arguments for and against local ballot measures",
      "Write down your final choices on a sheet of paper to bring along"
    ],
    faqs: [
      {
        question: "What is a ballot measure or referendum?",
        answer: "A ballot measure is a proposed law, policy, or constitutional amendment that is placed directly on the ballot for voters to approve or reject.",
        answer_eli15: "It's when the government lets citizens vote 'Yes' or 'No' directly on a specific rule, like: 'Should we build a new park in town?'"
      },
      {
        question: "Am I required to vote for every office on the ballot?",
        answer: "No. You can choose to skip any races or ballot measures you do not feel comfortable voting on. Your votes for other positions will still be counted fully.",
        answer_eli15: "No! You can leave some races blank. If you only care about voting for the President and want to skip local judges, that's totally fine."
      }
    ]
  },
  {
    id: 6,
    title: "Voting Day Process",
    icon: "ri-git-commit-line",
    shortDesc: "Cast your ballot in person or drop off mail-in ballots.",
    timeline: "Election Day! (Usually a Tuesday in November in the US).",
    description: "On Election Day, arrive at the polling booth, check in with the poll workers, verify your identity, receive your ballot, step into a private voting booth, make your selections, and feed your ballot into the scanner.",
    description_eli15: "It's game time! You walk in, check-in, go to a private desk, mark your ballot, feed it into the counting machine, and collect your 'I Voted' sticker!",
    documents: [
      "Acceptable Photo ID",
      "Note sheet with your researched candidate selections"
    ],
    tips: [
      "Go early in the morning or during mid-afternoon to avoid long lines before and after standard work hours.",
      "If you need physical assistance or a translation guide, ask the poll workers. They are trained to help.",
      "Be proud! Wear your 'I Voted' sticker and encourage others to vote."
    ],
    checklist: [
      "Pack your ID and choice checklist notes",
      "Travel to the polling place during off-peak hours if possible",
      "Check in with poll workers and state your name/address",
      "Complete your ballot carefully, checking both sides",
      "Feed the ballot into the tabulator and collect your sticker"
    ],
    faqs: [
      {
        question: "What if I make a mistake on my paper ballot?",
        answer: "Do not try to erase or cross out your mistake. Inform a poll worker immediately. They will 'spoil' your old ballot and issue you a fresh, clean ballot to start over.",
        answer_eli15: "Don't panic! Just tell a poll worker. They will shred your messed-up ballot and hand you a brand new one."
      },
      {
        question: "Can I take a selfie with my ballot inside the booth?",
        answer: "In many states, taking photos of marked ballots is illegal to protect voter privacy and prevent vote-buying. It is safest to take your selfie outside the polling station.",
        answer_eli15: "Skip the booth selfie! Taking pictures of your ballot can actually be illegal in many places. Take your cool photo outside with your sticker instead!"
      }
    ]
  },
  {
    id: 7,
    title: "Vote Counting",
    icon: "ri-cpu-line",
    shortDesc: "Learn how votes are verified and tabulated.",
    timeline: "Begins immediately when polls close on Election Night.",
    description: "Votes are counted using secure, optical scan tabulators or hand-counted in smaller jurisdictions. Mail-in ballots are verified by comparing signatures with registration records before being opened.",
    description_eli15: "After voting, all ballots are fed into smart electronic scanners that read the marks, like grading bubble-sheet exams in school. It's safe, fast, and double-checked by real humans.",
    documents: [],
    tips: [
      "Vote counting is conducted in public view. Observers from all political parties monitor the tabulation rooms.",
      "Final numbers are never official on Election Night. Officials take days to verify provisional, military, and mail-in ballots.",
      "All paper ballots are kept in locked, sealed containers in case a physical recount is required."
    ],
    checklist: [
      "Understand the difference between unofficial media projections and certified results",
      "Learn about the signature verification process for mail-in ballots",
      "Follow local non-partisan election result dashboards"
    ],
    faqs: [
      {
        question: "Are voting machines connected to the internet?",
        answer: "No. Federal regulations and security protocols dictate that voting machines and counting tabulators must never be connected to the internet to prevent hacking.",
        answer_eli15: "No! They are completely offline. Hacking them from the internet is impossible because they have no internet connection, just like an old calculator."
      },
      {
        question: "Why does it take so long to count mail-in ballots?",
        answer: "Mail-in ballots require security steps: workers must verify signatures on envelopes, open them, flatten ballots, and scan them. This process ensures only legal votes are counted.",
        answer_eli15: "Because it's a careful puzzle. Workers have to check signatures, open envelopes, and flatten the paper before scanning. Doing it right takes time!"
      }
    ]
  },
  {
    id: 8,
    title: "Result Announcements",
    icon: "ri-megaphone-line",
    shortDesc: "Official certification and final results.",
    timeline: "Certified results occur 1 to 4 weeks post-election.",
    description: "After all ballots are tabulated, election officials conduct audits, resolve provisional ballots, and perform recounts if the margin is narrow. Once audited, the results are officially certified.",
    description_eli15: "This is like reviewing video replays in sports. Officials check all the angles and scorecards. Once they confirm everything is perfect, they announce the official winner!",
    documents: [],
    tips: [
      "News channels project winners, but only election boards declare official results.",
      "Certification involves bipartisan representatives signing off on the counts.",
      "Elections show the power of peaceful transfers of power, the foundation of democracy."
    ],
    checklist: [
      "Monitor your local board of elections website for official certification updates",
      "Review the post-election audit reports published by your county",
      "Congratulate yourself for completing the voting process!"
    ],
    faqs: [
      {
        question: "What is an election audit?",
        answer: "An audit is a quality control check where election workers manually recount a random sample of paper ballots to verify that the machines counted them 100% accurately.",
        answer_eli15: "It's like a math teacher double-checking a calculator's work by doing some problems by hand. It proves the machines got it right!"
      },
      {
        question: "What happens in a tie vote?",
        answer: "In local races with a tie, state laws define resolving methods: a coin toss, drawing straws, or drawing cards. In major federal races, runoff elections are held.",
        answer_eli15: "Believe it or not, ties in small towns are sometimes broken with a coin flip or by drawing names out of a hat! In big elections, they hold a re-vote."
      }
    ]
  }
];

export const quizQuestions = [
  {
    id: 1,
    question: "What is the very first step you must take before you can cast a vote in an election?",
    options: [
      "Find a polling booth location",
      "Register to vote",
      "Choose a political party",
      "Receive a voter badge"
    ],
    correctAnswer: 1,
    explanation: "You must be registered to vote before you can cast a ballot. Registration allows election officials to verify your eligibility and prepare a list of voters for each polling station."
  },
  {
    id: 2,
    question: "If you move to a new apartment in a different city or county, what should you do regarding your voter status?",
    options: [
      "Nothing, registration updates automatically through postal tracking",
      "Vote at your old neighborhood precinct on Election Day",
      "Register/update your address in your new county",
      "Wait until the next national census to update records"
    ],
    correctAnswer: 2,
    explanation: "Registration is tied to your residential address. If you move, you must update your voter registration to ensure you vote on the correct local ballots for your new home."
  },
  {
    id: 3,
    question: "Are voting tabulator machines connected to the internet?",
    options: [
      "Yes, they use secure cloud servers to count votes faster",
      "No, they are offline machines with air-gapped security to prevent cyber threats",
      "Only during the final results transmission",
      "Yes, they connect via public Wi-Fi networks"
    ],
    correctAnswer: 1,
    explanation: "Voting tabulators and machines are strictly offline. This physical air-gap makes remote hacking from the internet impossible, ensuring high security and integrity."
  },
  {
    id: 4,
    question: "What legal right do you have if you are standing in line at the polling place when the closing time arrives?",
    options: [
      "You must leave and vote online instead",
      "You are allowed to vote as long as you were in line before closing time",
      "You must return the next morning to vote",
      "Only elderly citizens in line are permitted to vote"
    ],
    correctAnswer: 1,
    explanation: "If you are in line before the polls officially close, you are legally entitled to vote. Election officials must keep the doors open and process everyone already in line."
  },
  {
    id: 5,
    question: "If you make a mistake marking your ballot, what is the correct action to take?",
    options: [
      "Cross it out and write 'oops' next to it",
      "Erase it as cleanly as possible",
      "Ask a poll worker to spoil your ballot and give you a fresh one",
      "Submit it anyway; the computer will figure out your intent"
    ],
    correctAnswer: 2,
    explanation: "If you make an error on a paper ballot, tell a poll worker. They will cancel (spoil) your incorrect ballot and hand you a clean new one. Erasing or scratching out can cause the scanning machines to misread your ballot."
  }
];

export const timelineMilestones = [
  {
    id: 1,
    name: "Registration Period Opens",
    date: "August 1, 2026",
    status: "completed",
    details: "Voter registration databases open for updates, changes, and new registrations online and by mail."
  },
  {
    id: 2,
    name: "Mail-in / Absentee Ballot Requests Open",
    date: "September 15, 2026",
    status: "completed",
    details: "Voters can request mail-in ballots online or through county board request forms."
  },
  {
    // Let's assume current date is May 2026, or we simulate current progress as approaching early voting in late Oct.
    // The current metadata is local time 2026-05-27.
    // We will align current milestone pointer to the timeline!
    name: "Registration Deadline (Online/Mail)",
    date: "October 12, 2026",
    status: "active",
    details: "Last day to submit registration forms online or postmark mail registrations for the General Election."
  },
  {
    id: 4,
    name: "Early Voting Starts",
    date: "October 20, 2026",
    status: "pending",
    details: "Designated early voting centers open across all precincts for flexible, in-person voting."
  },
  {
    id: 5,
    name: "General Election Day",
    date: "November 3, 2026",
    status: "pending",
    details: "In-person polling stations are open from 7:00 AM to 8:00 PM. All mail-in ballots must be postmarked or dropped off."
  },
  {
    id: 6,
    name: "Certification of Results",
    date: "November 24, 2026",
    status: "pending",
    details: "Local and state election boards complete audits, recounts, and officially certify the final vote totals."
  }
];

export const mythsVsFacts = [
  {
    id: 1,
    myth: "My vote doesn't matter because one vote won't change the outcome of a national election.",
    fact: "While one vote rarely changes a presidential race, local elections (mayors, school boards, funding measures) are frequently decided by single-digit margins. Furthermore, voting is a collective action; when thousands of people think their vote doesn't matter, it dramatically shifts who holds decision-making power."
  },
  {
    id: 2,
    myth: "Mail-in voting leads to widespread voter fraud.",
    fact: "Numerous exhaustive studies show voter fraud is exceedingly rare in all voting formats, including mail-in. Mail-in ballots require strict security protocols: signature verification matching registration cards, secure barcoded envelopes tracking the ballot journey, and severe criminal penalties for interference."
  },
  {
    id: 3,
    myth: "If I register to vote, I will automatically be called for jury duty.",
    fact: "While courts use voter lists for jury pools, they also draw names from driver's license databases, state tax filings, and utility registries. Not registering to vote does not protect you from jury duty, but it does prevent you from having a voice in your government."
  },
  {
    id: 4,
    myth: "You must speak fluent English to vote in the United States.",
    fact: "There is no language requirement to vote. In fact, Section 203 of the Voting Rights Act requires many jurisdictions to provide ballots, registration materials, and assistance in Spanish, Chinese, Vietnamese, Korean, and other languages based on local demographics."
  }
];

export const civicGlossary = [
  {
    term: "Absentee Ballot",
    definition: "A ballot cast by a voter who is unable or chooses not to go to the physical polling station on Election Day. Sent and returned by mail or placed in secure drop boxes.",
    eli15: "It's like getting your school test emailed to your house because you're sick. You fill it out at home and mail it back to the teacher before the deadline."
  },
  {
    term: "Ballot Measure / Referendum",
    definition: "A proposed piece of legislation, bond issue, or constitutional amendment submitted to the electorate to be approved or rejected by direct public vote.",
    eli15: "Instead of lawmakers making the rules, they ask the whole class to vote 'Yes' or 'No' on a new rule directly."
  },
  {
    term: "Gerrymandering",
    definition: "The practice of drawing electoral district boundaries in a way that gives one political party an unfair advantage over its rivals or dilutes the voting power of specific demographic groups.",
    eli15: "Imagine dividing a class of 30 students into groups of 5, but drawing the group circles weirdly so your friends are always the majority in every group, even though they only make up half the class!"
  },
  {
    term: "Primary Election",
    definition: "An initial election held by political parties to choose their candidates who will represent the party in the subsequent general election.",
    eli15: "Think of it like a tournament bracket where team members play each other first. The winner of that match gets to represent the team in the final championship game against other schools."
  },
  {
    term: "Provisional Ballot",
    definition: "A temporary ballot issued to a voter whose eligibility cannot be immediately confirmed at the polling place. It is counted later once election officials verify registration credentials.",
    eli15: "If your name isn't on the list for a party, they let you play on a 'conditional ticket.' Once the referees check the roster and prove you are registered, your score is added to the board."
  },
  {
    term: "Electoral College",
    definition: "The formal body of electors that officially elects the President and Vice President of the United States, based on the vote outcomes in each individual state.",
    eli15: "Rather than adding up all individual votes across the country directly, each state plays its own game. The winner of a state gets that state's 'points' (electors). The first candidate to reach 270 points wins the presidency."
  }
];

export const aiDialogueTree = {
  en: {
    greetings: [
      "Hello! I am **Navigator AI**, your non-partisan civic guide. How can I help you navigate the voting process today?",
      "Welcome to Election Navigator! Ask me anything about registration, deadlines, what to bring, or how counting works. I'm here to simplify the process!"
    ],
    fallback: "I want to make sure you get accurate information. Could you try rephrasing that, or choose one of the suggested topics below? I can explain registration, voter IDs, polling booths, ballot counting safety, and more.",
    keywords: [
      {
        keys: ["register", "registration", "signup", "sign up"],
        response: "To register to vote, you must be a citizen, meet age requirements (usually 18 by Election Day), and fill out a registration form. Most states let you do this online, by mail, or in-person at a DMV or election office. You can check your registration status or learn more in our **Voter Journey Step 1** or use the **Registration Checker** widget!",
        eli15: "Registering to vote is like signing up for a library card. You fill out a quick form with your name and address, and then your town adds you to the official list of voters. You only need to do it once unless you move!"
      },
      {
        keys: ["id", "document", "documents", "license", "passport", "identification"],
        response: "ID laws vary by state. Some states require a photo ID (like a Driver's License or Passport), others accept non-photo IDs (like a bank statement or utility bill displaying your name and address), while others use signature verification. Read **Voter Journey Step 3** to check what IDs are accepted where you live.",
        eli15: "Think of voter ID like buying tickets to a concert. Before the guards let you in, they need to check your ID card to prove you are the person who bought the ticket. Most states want to see a driver's license or passport!"
      },
      {
        keys: ["booth", "polling", "where", "location", "station", "station", "precinct"],
        response: "Your polling booth is assigned to you based on your home address. To find it, use our **Polling Place Locator** widget under the 'Live Dashboards' tab. Just enter your zip code or address to see the details, maps, and peak wait hours!",
        eli15: "Your polling booth is your designated voting station, usually in a local school, gym, or community center. You are assigned to a specific one near your house so they have your name printed on their list."
      },
      {
        keys: ["count", "counting", "security", "safe", "cheat", "cheat", "hack", "machine"],
        response: "Elections are secure. Voting machines are **offline** (never connected to the internet) to prevent hacking. Paper ballots are tabulated by secure optical scanners, and random checks (audits) are run by hand to prove the counts are 100% correct. Bipartisan representatives supervise all counting rooms.",
        eli15: "Votes are counted by offline scanner machines (like the ones that grade bubble-sheet tests at school). They are never connected to the internet, so hackers can't access them. Bipartisan observers watch the entire process, and paper ballots are locked up in vaults."
      },
      {
        keys: ["deadline", "date", "calendar", "when"],
        response: "Key deadlines are shown in our **Live Timeline** tab. Registration deadlines usually fall 2 to 4 weeks before Election Day. Election Day itself is always the first Tuesday after the first Monday in November in the United States.",
        eli15: "Just like turning in school assignments, voting has deadlines. You need to register a few weeks before the big day. The main election is on the first Tuesday of November!"
      }
    ]
  },
  es: {
    greetings: [
      "¡Hola! Soy **Navigator AI**, tu guía cívico no partidista. ¿Cómo puedo ayudarte con el proceso de votación hoy?",
      "¡Bienvenido a Election Navigator! Pregúntame sobre el registro, las fechas límite, qué llevar o cómo funciona el conteo."
    ],
    fallback: "Quiero asegurarme de darte información precisa. ¿Podrías reformular tu pregunta o elegir uno de los temas sugeridos abajo?",
    keywords: [
      {
        keys: ["registrar", "registro", "inscribir", "inscripcion"],
        response: "Para registrarte para votar, debes ser ciudadano, cumplir con la edad requerida (18 años para el Día de la Elección) y completar un formulario de registro. La mayoría de los estados permiten hacerlo en línea, por correo o en persona.",
        eli15: "Registrarse para votar es como obtener una tarjeta de biblioteca. Llenas un formulario con tu nombre y dirección para que te agreguen a la lista oficial. ¡Solo lo haces una vez a menos que te mudes!"
      },
      {
        keys: ["identificacion", "id", "documento", "documentos", "licencia", "pasaporte"],
        response: "Las leyes de identificación varían según el estado. Algunos requieren una identificación con foto (como licencia de conducir o pasaporte), otros aceptan facturas de servicios con tu dirección.",
        eli15: "Es como entrar a un concierto. Los guardias necesitan ver tu identificación para confirmar que eres tú. ¡Por lo general, sirve la licencia de conducir o el pasaporte!"
      }
    ]
  },
  fr: {
    greetings: [
      "Bonjour! Je suis **Navigator AI**, votre guide civique impartial. Comment puis-je vous aider aujourd'hui?",
      "Bienvenue sur Election Navigator! Posez-moi vos questions sur l'inscription, les dates limites ou le dépouillement des votes."
    ],
    fallback: "Je veux m'assurer de vous donner des informations exactes. Pourriez-vous reformuler votre question ou choisir un des sujets suggérés?",
    keywords: [
      {
        keys: ["inscrire", "inscription", "enregistrer"],
        response: "Pour vous inscrire sur les listes électorales, vous devez être citoyen, avoir l'âge requis (18 ans le jour du vote) et remplir un formulaire d'inscription.",
        eli15: "S'inscrire sur les listes électorales, c'est comme s'inscrire à la bibliothèque électorale. Vous donnez votre adresse pour être sur la liste officielle."
      }
    ]
  }
};
