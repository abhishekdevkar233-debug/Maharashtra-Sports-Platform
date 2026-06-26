export type Olympian = {
  id: string;
  name: string;
  initials: string;
  img?: string;
  sport: string;
  edition: string;
  medal: string;
  dob: string;
  gender: string;
  district: string;
  coach: string;
  academy: string;
  category: string;
  bio: string;
  appearances: string;
  totalMedals: string;
  years: string;
  gold: string;
  silver: string;
  bronze: string;
  participations: { year: string; event: string; position: string; performance: string; venue: string; badge: string; tint: string }[];
  awards: { name: string; year: string; desc: string }[];
};

export const OLYMPIANS: Olympian[] = [
  {
    id: "1", name: "P.T. Karnik", initials: "PTK", img: "/src/assets/olympians/frame_4.png", sport: "Athletics", edition: "2024", medal: "Bronze",
    dob: "14 Aug 1996", gender: "Male", district: "Kolhapur", coach: "Mr. Anil Joshi", academy: "Balewadi HPC", category: "Senior — Track",
    bio: "Born and raised in Kolhapur, P.T. Karnik discovered athletics at the district school meet and went on to dominate the national circuit by age 18. A three-time Olympian, he holds the Indian national record in the 100m sprint and continues to inspire a generation of track athletes across Maharashtra.",
    appearances: "3", totalMedals: "38", years: "12+", gold: "1", silver: "2", bronze: "3",
    participations: [
      { year: "2024", event: "100m Sprint", position: "5th", performance: "10.87 sec", venue: "Paris", badge: "Finalist", tint: "from-violet-500 to-indigo-600" },
      { year: "2020", event: "200m Sprint", position: "3rd", performance: "20.41 sec", venue: "Tokyo", badge: "Bronze", tint: "from-orange-400 to-amber-600" },
      { year: "2016", event: "4×100m Relay", position: "2nd", performance: "38.62 sec", venue: "Rio", badge: "Silver", tint: "from-slate-400 to-slate-600" },
      { year: "2012", event: "100m Sprint", position: "1st", performance: "10.21 sec", venue: "London", badge: "Gold", tint: "from-amber-400 to-yellow-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2023", desc: "National recognition for outstanding performance in athletics." },
      { name: "Shiv Chhatrapati Award", year: "2022", desc: "Maharashtra State's highest sporting honour." },
      { name: "Padma Shri", year: "2024", desc: "Civilian honour for distinguished contribution to sport." },
      { name: "Khel Ratna Nominee", year: "2024", desc: "Nominated for India's most prestigious sports award." },
      { name: "Asian Games Gold", year: "2023", desc: "Gold medal at 19th Asian Games — Hangzhou." },
      { name: "World Championship Bronze", year: "2022", desc: "Bronze at World Athletics Championships — Eugene." },
    ],
  },
  {
    id: "2", name: "Aarav Joshi", initials: "AJ", img: "/src/assets/olympians/frame_5.png", sport: "Shooting", edition: "2024", medal: "Silver",
    dob: "22 Mar 1999", gender: "Male", district: "Pune", coach: "Col. Deepak Rane", academy: "Army Sports Institute, Pune", category: "Senior — 10m Air Rifle",
    bio: "Aarav Joshi from Pune took up shooting at age 14 under the Army Sports Institute program. A two-time Olympian, he is the current national record holder in 10m Air Rifle and the first Maharashtrian to win a shooting silver at the Olympics.",
    appearances: "2", totalMedals: "22", years: "8+", gold: "0", silver: "1", bronze: "2",
    participations: [
      { year: "2024", event: "10m Air Rifle", position: "2nd", performance: "251.7 pts", venue: "Paris", badge: "Silver", tint: "from-slate-400 to-slate-600" },
      { year: "2020", event: "10m Air Rifle", position: "4th", performance: "249.2 pts", venue: "Tokyo", badge: "4th Place", tint: "from-sky-400 to-blue-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2024", desc: "National recognition for shooting excellence." },
      { name: "Shiv Chhatrapati Award", year: "2023", desc: "Maharashtra State's highest sporting honour." },
      { name: "Asian Games Silver", year: "2023", desc: "Silver at 19th Asian Games in 10m Air Rifle Team event." },
    ],
  },
  {
    id: "3", name: "Riya Patil", initials: "RP", img: "/src/assets/olympians/frame_6.png", sport: "Boxing", edition: "2020", medal: "Bronze",
    dob: "05 Jul 2000", gender: "Female", district: "Nashik", coach: "Ms. Sunita Kedare", academy: "SAI Centre Nashik", category: "Senior — 60kg",
    bio: "Riya Patil from Nashik started boxing at the local SAI centre at age 12. She made her Olympic debut at Tokyo 2020 and became the first Maharashtrian woman boxer to win an Olympic medal, inspiring thousands of young girls across the state.",
    appearances: "2", totalMedals: "18", years: "7+", gold: "0", silver: "1", bronze: "1",
    participations: [
      { year: "2024", event: "60kg Women's Boxing", position: "Quarter-final", performance: "QF Exit", venue: "Paris", badge: "QF", tint: "from-fuchsia-400 to-pink-600" },
      { year: "2020", event: "60kg Women's Boxing", position: "3rd", performance: "Bronze", venue: "Tokyo", badge: "Bronze", tint: "from-orange-400 to-amber-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2022", desc: "National recognition for boxing achievement." },
      { name: "Shiv Chhatrapati Award", year: "2021", desc: "Maharashtra State's highest sporting honour." },
      { name: "Khelo India Excellence Award", year: "2023", desc: "Recognised for grassroots impact and athletic achievement." },
    ],
  },
  {
    id: "4", name: "Vikram Kale", initials: "VK", img: "/src/assets/olympians/frame_7.png", sport: "Wrestling", edition: "2024", medal: "—",
    dob: "11 Sep 1997", gender: "Male", district: "Kolhapur", coach: "Mr. Tanaji Patil", academy: "Kolhapur Krida Mandal", category: "Senior — 74kg Freestyle",
    bio: "Vikram Kale, born in Kolhapur — India's wrestling heartland — trained under legendary coach Tanaji Patil. His Olympic debut at Paris 2024 marked a historic moment as he became only the second Maharashtrian wrestler to qualify for the Games in the modern era.",
    appearances: "1", totalMedals: "14", years: "9+", gold: "2", silver: "3", bronze: "4",
    participations: [
      { year: "2024", event: "74kg Freestyle", position: "Round of 16", performance: "QF Exit", venue: "Paris", badge: "Debut", tint: "from-emerald-400 to-teal-600" },
    ],
    awards: [
      { name: "Shiv Chhatrapati Award", year: "2024", desc: "Maharashtra State's highest sporting honour." },
      { name: "Commonwealth Gold", year: "2022", desc: "Gold medal at Commonwealth Games Birmingham — 74kg." },
      { name: "Asian Championship Silver", year: "2023", desc: "Silver at Asian Wrestling Championships." },
    ],
  },
  {
    id: "5", name: "Sneha Desai", initials: "SD", img: "/src/assets/olympians/frame_8.png", sport: "Badminton", edition: "2024", medal: "Quarter-final",
    dob: "18 Feb 2001", gender: "Female", district: "Mumbai", coach: "Mr. Prakash Nair", academy: "Pullela Gopichand Academy, Mumbai", category: "Senior — Women's Singles",
    bio: "Sneha Desai from Mumbai took up badminton at age 8 under her father's guidance. Trained at the Pullela Gopichand Academy's Mumbai centre, she became the youngest Maharashtra woman to reach the Olympic quarter-finals in badminton.",
    appearances: "1", totalMedals: "11", years: "6+", gold: "1", silver: "2", bronze: "3",
    participations: [
      { year: "2024", event: "Women's Singles Badminton", position: "Quarter-final", performance: "QF Exit", venue: "Paris", badge: "QF", tint: "from-amber-400 to-orange-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2024", desc: "National recognition for badminton excellence." },
      { name: "Shiv Chhatrapati Award", year: "2023", desc: "Maharashtra State's highest sporting honour." },
      { name: "National Championship Gold", year: "2023", desc: "Senior National Badminton Championship — Women's Singles." },
    ],
  },
  {
    id: "6", name: "Mahesh Pawar", initials: "MP", img: "/src/assets/olympians/frame_9.png", sport: "Hockey", edition: "2020", medal: "Bronze",
    dob: "30 Jan 1995", gender: "Male", district: "Aurangabad", coach: "Mr. Graham Reid (Team India)", academy: "Sports Authority of India", category: "Senior — Hockey",
    bio: "Mahesh Pawar from Aurangabad has been the backbone of India's national hockey midfield for over a decade. Part of the historic Indian team that won the Olympic bronze at Tokyo 2020 — India's first Olympic hockey medal in 41 years — he continues to play at the highest level.",
    appearances: "2", totalMedals: "30", years: "11+", gold: "0", silver: "1", bronze: "2",
    participations: [
      { year: "2024", event: "Men's Hockey", position: "5th", performance: "QF Exit", venue: "Paris", badge: "5th Place", tint: "from-sky-400 to-blue-600" },
      { year: "2020", event: "Men's Hockey", position: "3rd", performance: "Bronze", venue: "Tokyo", badge: "Bronze", tint: "from-orange-400 to-amber-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2021", desc: "National recognition for hockey excellence." },
      { name: "Shiv Chhatrapati Award", year: "2022", desc: "Maharashtra State's highest sporting honour." },
      { name: "Olympic Bronze", year: "2021", desc: "Part of the historic Indian men's hockey team — Tokyo 2020." },
    ],
  },
  {
    id: "7", name: "Priya Sawant", initials: "PS", img: "/src/assets/olympians/frame_10.png", sport: "Athletics", edition: "2024", medal: "—",
    dob: "25 Dec 2002", gender: "Female", district: "Ratnagiri", coach: "Mr. Nagesh Bhosale", academy: "Balewadi HPC", category: "Senior — 400m Hurdles",
    bio: "Priya Sawant from Ratnagiri rose through the ranks of Maharashtra athletics to qualify for Paris 2024 in the 400m hurdles — an event India had not represented at the Olympics in over two decades. Her journey from a coastal village to the Olympic track is an extraordinary story.",
    appearances: "1", totalMedals: "8", years: "5+", gold: "1", silver: "2", bronze: "1",
    participations: [
      { year: "2024", event: "400m Hurdles", position: "Heat exit", performance: "54.32 sec", venue: "Paris", badge: "Debut", tint: "from-rose-400 to-red-600" },
    ],
    awards: [
      { name: "Shiv Chhatrapati Award", year: "2024", desc: "Maharashtra State's highest sporting honour." },
      { name: "National Games Gold", year: "2023", desc: "Gold in 400m Hurdles at 37th National Games — Goa." },
    ],
  },
  {
    id: "8", name: "Rohit Mane", initials: "RM", img: "/src/assets/olympians/frame_11.png", sport: "Weightlifting", edition: "2020", medal: "—",
    dob: "08 Apr 1994", gender: "Male", district: "Solapur", coach: "Mr. Vijay Sharma", academy: "SAI Centre Patiala", category: "Senior — 73kg",
    bio: "Rohit Mane from Solapur is one of Maharashtra's finest weightlifters. He qualified for Tokyo 2020 after setting the national record in the 73kg category and continues to be among India's top performers in the discipline.",
    appearances: "1", totalMedals: "12", years: "10+", gold: "1", silver: "2", bronze: "3",
    participations: [
      { year: "2020", event: "73kg Weightlifting", position: "7th", performance: "327 kg (Total)", venue: "Tokyo", badge: "7th", tint: "from-violet-400 to-purple-600" },
    ],
    awards: [
      { name: "Shiv Chhatrapati Award", year: "2021", desc: "Maharashtra State's highest sporting honour." },
      { name: "Commonwealth Silver", year: "2022", desc: "Silver at Commonwealth Games — 73kg Weightlifting." },
      { name: "Asian Championship Bronze", year: "2022", desc: "Bronze at Asian Weightlifting Championships." },
    ],
  },
  {
    id: "9", name: "Asha Kulkarni", initials: "AK", img: "/src/assets/olympians/frame_12.png", sport: "Archery", edition: "2024", medal: "Gold",
    dob: "17 Jun 1998", gender: "Female", district: "Nagpur", coach: "Ms. Dhiraj Kumari", academy: "Tata Archery Academy", category: "Senior — Recurve",
    bio: "Asha Kulkarni from Nagpur is Maharashtra's most decorated Olympic archer. She won India's first ever Olympic gold in archery at Paris 2024 — a moment that made the entire state erupt in celebration. Her technique is regarded as world-class by international coaches.",
    appearances: "2", totalMedals: "25", years: "9+", gold: "1", silver: "2", bronze: "3",
    participations: [
      { year: "2024", event: "Women's Recurve Individual", position: "1st", performance: "Gold", venue: "Paris", badge: "Gold", tint: "from-amber-400 to-yellow-600" },
      { year: "2020", event: "Women's Recurve Individual", position: "5th", performance: "Semi-final exit", venue: "Tokyo", badge: "5th", tint: "from-sky-400 to-blue-600" },
    ],
    awards: [
      { name: "Khel Ratna", year: "2024", desc: "India's most prestigious sports award — awarded after Olympic gold." },
      { name: "Padma Bhushan", year: "2024", desc: "Civilian honour in recognition of Olympic gold." },
      { name: "Arjuna Award", year: "2021", desc: "National recognition for archery excellence." },
      { name: "Shiv Chhatrapati Award", year: "2022", desc: "Maharashtra State's highest sporting honour." },
      { name: "World Championship Gold", year: "2023", desc: "Gold at World Archery Championships — Berlin." },
    ],
  },
  {
    id: "10", name: "Tejas Naik", initials: "TN", img: "/src/assets/olympians/frame_13.png", sport: "Swimming", edition: "2020", medal: "—",
    dob: "14 Nov 2000", gender: "Male", district: "Mumbai", coach: "Mr. Nihar Amin", academy: "Aquatic Centre, Mumbai", category: "Senior — 200m Butterfly",
    bio: "Tejas Naik from Mumbai became the first Maharashtrian swimmer to qualify for the Olympics in over 15 years. His qualification for Tokyo 2020 in the 200m butterfly event was a watershed moment for aquatic sports development in Maharashtra.",
    appearances: "1", totalMedals: "9", years: "6+", gold: "0", silver: "1", bronze: "2",
    participations: [
      { year: "2020", event: "200m Butterfly", position: "Heat exit", performance: "1:58.14", venue: "Tokyo", badge: "Debut", tint: "from-cyan-400 to-sky-600" },
    ],
    awards: [
      { name: "Shiv Chhatrapati Award", year: "2021", desc: "Maharashtra State's highest sporting honour." },
      { name: "National Games Silver", year: "2022", desc: "Silver in 200m Butterfly at National Games — Goa." },
    ],
  },
  {
    id: "11", name: "Meera Shah", initials: "MS", img: "/src/assets/olympians/frame_14.png", sport: "Shooting", edition: "2016", medal: "Silver",
    dob: "02 Oct 1992", gender: "Female", district: "Pune", coach: "Col. R.K. Verma (Retd.)", academy: "Army Sports Institute, Pune", category: "Senior — 25m Pistol",
    bio: "Meera Shah from Pune is one of the most accomplished shooters in Maharashtra's history. Her silver medal at Rio 2016 in the 25m Pistol event remains one of the finest moments in Maharashtra shooting. She continues to mentor young shooters at the Army Sports Institute.",
    appearances: "3", totalMedals: "35", years: "14+", gold: "1", silver: "3", bronze: "5",
    participations: [
      { year: "2024", event: "25m Pistol", position: "Quarter-final", performance: "QF exit", venue: "Paris", badge: "QF", tint: "from-fuchsia-400 to-pink-600" },
      { year: "2020", event: "25m Pistol", position: "4th", performance: "588/600", venue: "Tokyo", badge: "4th", tint: "from-sky-400 to-blue-600" },
      { year: "2016", event: "25m Pistol", position: "2nd", performance: "591/600", venue: "Rio", badge: "Silver", tint: "from-slate-400 to-slate-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2017", desc: "National recognition for shooting excellence." },
      { name: "Shiv Chhatrapati Award", year: "2016", desc: "Maharashtra State's highest sporting honour." },
      { name: "Padma Shri", year: "2017", desc: "Civilian honour for distinguished contribution to sport." },
      { name: "Asian Games Gold", year: "2018", desc: "Gold at Jakarta Asian Games in 25m Pistol." },
    ],
  },
  {
    id: "12", name: "Sahil Gokhale", initials: "SG", img: "/src/assets/olympians/olympian_12.png", sport: "Boxing", edition: "2024", medal: "Bronze",
    dob: "19 May 2000", gender: "Male", district: "Nagpur", coach: "Mr. CA Kuttappa", academy: "SAI Centre Patiala", category: "Senior — 80kg",
    bio: "Sahil Gokhale from Nagpur trained under the national boxing program since age 15. His bronze medal at Paris 2024 in the 80kg category made him the first Maharashtrian man to win an Olympic boxing medal in the sport's history in the country.",
    appearances: "1", totalMedals: "10", years: "7+", gold: "0", silver: "1", bronze: "1",
    participations: [
      { year: "2024", event: "80kg Men's Boxing", position: "3rd", performance: "Bronze", venue: "Paris", badge: "Bronze", tint: "from-orange-400 to-amber-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2024", desc: "National recognition for boxing achievement." },
      { name: "Shiv Chhatrapati Award", year: "2024", desc: "Maharashtra State's highest sporting honour." },
      { name: "Commonwealth Gold", year: "2022", desc: "Gold at Commonwealth Games Birmingham — 80kg." },
    ],
  },
  {
    id: "13", name: "Nidhi Rane", initials: "NR", sport: "Badminton", edition: "2016", medal: "—",
    dob: "08 Aug 1990", gender: "Female", district: "Mumbai", coach: "Mr. Vimal Kumar", academy: "Gopichand Badminton Academy", category: "Senior — Women's Doubles",
    bio: "Nidhi Rane from Mumbai represented India in Women's Doubles at Rio 2016 and was part of the Indian duo that reached the pre-quarter-finals. Now retired from international play, she coaches the next generation of Maharashtra badminton players.",
    appearances: "1", totalMedals: "20", years: "12+", gold: "2", silver: "3", bronze: "5",
    participations: [
      { year: "2016", event: "Women's Doubles Badminton", position: "Pre-QF exit", performance: "PQF", venue: "Rio", badge: "Debut", tint: "from-emerald-400 to-teal-600" },
    ],
    awards: [
      { name: "Arjuna Award", year: "2018", desc: "National recognition for badminton excellence." },
      { name: "Shiv Chhatrapati Award", year: "2017", desc: "Maharashtra State's highest sporting honour." },
      { name: "Commonwealth Bronze", year: "2014", desc: "Bronze in Women's Doubles at Glasgow Commonwealth Games." },
    ],
  },
  {
    id: "14", name: "Omkar Jadhav", initials: "OJ", sport: "Wrestling", edition: "2020", medal: "Gold",
    dob: "03 Mar 1993", gender: "Male", district: "Kolhapur", coach: "Mr. Kuldeep Malik", academy: "WFI Centre Lucknow", category: "Senior — 65kg Freestyle",
    bio: "Omkar Jadhav from Kolhapur is Maharashtra's greatest Olympian wrestler and the only Maharashtrian to win Olympic gold in wrestling. His victory at Tokyo 2020 in the 65kg freestyle class was the defining sports moment for Maharashtra in a generation.",
    appearances: "2", totalMedals: "30", years: "12+", gold: "2", silver: "2", bronze: "4",
    participations: [
      { year: "2024", event: "65kg Freestyle", position: "Quarter-final", performance: "QF exit", venue: "Paris", badge: "QF", tint: "from-violet-400 to-purple-600" },
      { year: "2020", event: "65kg Freestyle", position: "1st", performance: "Gold", venue: "Tokyo", badge: "Gold", tint: "from-amber-400 to-yellow-600" },
    ],
    awards: [
      { name: "Khel Ratna", year: "2021", desc: "India's most prestigious sports award — awarded after Olympic gold." },
      { name: "Padma Shri", year: "2022", desc: "Civilian honour for distinguished contribution to sport." },
      { name: "Arjuna Award", year: "2020", desc: "National recognition for wrestling excellence." },
      { name: "Shiv Chhatrapati Award", year: "2021", desc: "Maharashtra State's highest sporting honour." },
      { name: "Asian Games Gold", year: "2023", desc: "Gold at 19th Asian Games — Hangzhou." },
    ],
  },
  {
    id: "15", name: "Kavya Deshpande", initials: "KD", sport: "Athletics", edition: "2016", medal: "Bronze",
    dob: "14 Jan 1991", gender: "Female", district: "Pune", coach: "Mr. Nikolai Snesarev", academy: "Balewadi HPC", category: "Senior — 3000m Steeplechase",
    bio: "Kavya Deshpande from Pune is a pioneering figure in Maharashtra women's athletics. Her bronze medal at Rio 2016 in the 3000m steeplechase made her the first Maharashtrian woman to win an athletics medal at the Olympics. Now a coach and mentor, she continues to inspire.",
    appearances: "2", totalMedals: "28", years: "14+", gold: "1", silver: "3", bronze: "4",
    participations: [
      { year: "2020", event: "3000m Steeplechase", position: "5th", performance: "9:12.34", venue: "Tokyo", badge: "5th", tint: "from-rose-400 to-red-600" },
      { year: "2016", event: "3000m Steeplechase", position: "3rd", performance: "9:05.18", venue: "Rio", badge: "Bronze", tint: "from-orange-400 to-amber-600" },
    ],
    awards: [
      { name: "Padma Shri", year: "2017", desc: "Civilian honour for distinguished contribution to sport." },
      { name: "Arjuna Award", year: "2016", desc: "National recognition for athletics excellence." },
      { name: "Shiv Chhatrapati Award", year: "2017", desc: "Maharashtra State's highest sporting honour." },
      { name: "Asian Games Silver", year: "2018", desc: "Silver at Jakarta Asian Games in 3000m Steeplechase." },
    ],
  },
  {
    id: "16", name: "Ishaan More", initials: "IM", sport: "Hockey", edition: "2024", medal: "—",
    dob: "22 Jul 2002", gender: "Male", district: "Mumbai", coach: "Mr. Craig Fulton (Team India)", academy: "Sports Authority of India", category: "Senior — Hockey",
    bio: "Ishaan More from Mumbai is the youngest Maharashtrian to represent India in Olympic hockey in 30 years. Selected for Paris 2024 at age 21, the dynamic midfielder is widely considered the future of Indian hockey and Maharashtra's sporting pride.",
    appearances: "1", totalMedals: "8", years: "5+", gold: "1", silver: "1", bronze: "2",
    participations: [
      { year: "2024", event: "Men's Hockey", position: "5th", performance: "QF exit", venue: "Paris", badge: "5th", tint: "from-sky-400 to-blue-600" },
    ],
    awards: [
      { name: "Shiv Chhatrapati Award", year: "2024", desc: "Maharashtra State's highest sporting honour." },
      { name: "Asian Games Silver", year: "2023", desc: "Silver at 19th Asian Games — Hangzhou, India Hockey." },
      { name: "Champions Trophy Gold", year: "2023", desc: "Gold at FIH Men's Hockey Champions Trophy." },
    ],
  },
];

export const getOlympian = (id: string) => OLYMPIANS.find(o => o.id === id) ?? OLYMPIANS[0];
