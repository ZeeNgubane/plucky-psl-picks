
export interface Team {
  id: string;
  name: string;
  logo: string;
  city: string;
}

export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  team: string;
  price: number;
  points: number;
  form: number[];
}

export const teams: Team[] = [
  { id: '1', name: 'Kaizer Chiefs', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Kaizer%20Chiefs.jpg', city: 'Johannesburg' },
  { id: '2', name: 'Orlando Pirates', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Orlando%20Pirates.jpg', city: 'Johannesburg' },
  { id: '3', name: 'Mamelodi Sundowns', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Mamelodi%20Sundowns.jpg', city: 'Pretoria' },
  { id: '4', name: 'Supersport United', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/SuperSport%20United.jpg', city: 'Pretoria' },
  { id: '5', name: 'Cape Town City', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Cape%20Town%20City%20FC.jpg', city: 'Cape Town' },
  { id: '6', name: 'Stellenbosch FC', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Stellenbosch%20FC.jpg', city: 'Stellenbosch' },
  { id: '7', name: 'AmaZulu FC', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/AmaZulu%20FC.jpg', city: 'Durban' },
  { id: '8', name: 'Sekhukhune United', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Sekhukhune%20United.jpg', city: 'Limpopo' },
  { id: '9', name: 'Golden Arrows', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Golden%20Arrows.jpg', city: 'Durban' },
  { id: '10', name: 'Royal AM', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Royal%20AM.jpg', city: 'Durban' },
  { id: '11', name: 'Chippa United', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Chippa%20United.jpg', city: 'Port Elizabeth' },
  { id: '12', name: 'TS Galaxy', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/TS%20Galaxy.jpg', city: 'Mpumalanga' },
  { id: '13', name: 'Polokwane City', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Polokwane%20City.jpg', city: 'Polokwane' },
  { id: '14', name: 'Baroka FC', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Baroka_FC.svg/200px-Baroka_FC.svg.png', city: 'Limpopo' },
  { id: '15', name: 'Richards Bay FC', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Richards%20Bay.jpg', city: 'Richards Bay' },
  { id: '16', name: 'Magesi FC', logo: 'https://www.psl.co.za/newpsl/images/clublogos/large/Magesi%20FC.jpg', city: 'Limpopo' }
];

export const players: Player[] = [
  // Kaizer Chiefs
  { id: '1', name: 'Itumeleng Khune', position: 'GK', team: 'Kaizer Chiefs', price: 4.2, points: 85, form: [6, 8, 7, 9, 8] },
  { id: '2', name: 'Siyabonga Ngezana', position: 'DEF', team: 'Kaizer Chiefs', price: 3.8, points: 72, form: [7, 6, 8, 7, 9] },
  { id: '3', name: 'Yusuf Maart', position: 'MID', team: 'Kaizer Chiefs', price: 5.2, points: 78, form: [8, 7, 6, 8, 7] },
  { id: '4', name: 'Ashley Du Preez', position: 'FWD', team: 'Kaizer Chiefs', price: 6.8, points: 92, form: [9, 8, 10, 7, 9] },
  { id: '20', name: 'Pule Mmodi', position: 'MID', team: 'Kaizer Chiefs', price: 4.2, points: 73, form: [7, 8, 6, 7, 8] },
  
  // Orlando Pirates
  { id: '5', name: 'Richard Ofori', position: 'GK', team: 'Orlando Pirates', price: 4.5, points: 88, form: [8, 9, 7, 8, 8] },
  { id: '6', name: 'Innocent Maela', position: 'DEF', team: 'Orlando Pirates', price: 3.2, points: 69, form: [6, 7, 8, 6, 7] },
  { id: '7', name: 'Monnapule Saleng', position: 'MID', team: 'Orlando Pirates', price: 7.2, points: 95, form: [10, 9, 8, 9, 10] },
  { id: '8', name: 'Evidence Makgopa', position: 'FWD', team: 'Orlando Pirates', price: 6.5, points: 87, form: [8, 7, 9, 8, 8] },
  { id: '21', name: 'Melusi Buthelezi', position: 'GK', team: 'Orlando Pirates', price: 3.8, points: 68, form: [7, 7, 6, 8, 6] },

  // Mamelodi Sundowns
  { id: '9', name: 'Ronwen Williams', position: 'GK', team: 'Mamelodi Sundowns', price: 5.5, points: 98, form: [10, 9, 9, 10, 9] },
  { id: '10', name: 'Mothobi Mvala', position: 'DEF', team: 'Mamelodi Sundowns', price: 4.8, points: 82, form: [8, 8, 9, 7, 8] },
  { id: '11', name: 'Themba Zwane', position: 'MID', team: 'Mamelodi Sundowns', price: 8.2, points: 105, form: [10, 10, 9, 10, 10] },
  { id: '12', name: 'Peter Shalulile', position: 'FWD', team: 'Mamelodi Sundowns', price: 8.3, points: 112, form: [10, 9, 10, 10, 9] },
  { id: '22', name: 'Teboho Mokoena', position: 'MID', team: 'Mamelodi Sundowns', price: 7.8, points: 101, form: [9, 10, 8, 9, 9] },

  // Supersport United
  { id: '13', name: 'Bradley Grobler', position: 'FWD', team: 'Supersport United', price: 5.8, points: 79, form: [7, 8, 6, 9, 7] },
  { id: '23', name: 'Ricardo Goss', position: 'GK', team: 'Supersport United', price: 4.0, points: 70, form: [7, 6, 8, 7, 6] },
  { id: '24', name: 'Grant Margeman', position: 'MID', team: 'Supersport United', price: 5.1, points: 75, form: [8, 7, 7, 8, 7] },

  // Cape Town City
  { id: '14', name: 'Khanyisa Mayo', position: 'FWD', team: 'Cape Town City', price: 6.2, points: 89, form: [9, 8, 8, 9, 8] },
  { id: '25', name: 'Darren Keet', position: 'GK', team: 'Cape Town City', price: 3.9, points: 68, form: [6, 7, 7, 6, 8] },
  { id: '26', name: 'Thamsanqa Mkhize', position: 'DEF', team: 'Cape Town City', price: 3.5, points: 66, form: [7, 6, 7, 7, 6] },
  
  // Stellenbosch FC
  { id: '15', name: 'Iqraam Rayners', position: 'FWD', team: 'Stellenbosch FC', price: 4.5, points: 76, form: [7, 7, 8, 6, 8] },
  { id: '27', name: 'Sage Stephens', position: 'GK', team: 'Stellenbosch FC', price: 3.7, points: 64, form: [6, 6, 7, 8, 5] },
  { id: '28', name: 'Deano van Rooyen', position: 'DEF', team: 'Stellenbosch FC', price: 3.3, points: 61, form: [6, 7, 5, 6, 7] },

  // AmaZulu FC
  { id: '16', name: 'Bongi Ntuli', position: 'FWD', team: 'AmaZulu FC', price: 3.8, points: 71, form: [6, 7, 7, 8, 6] },
  { id: '17', name: 'Veli Mothwa', position: 'GK', team: 'AmaZulu FC', price: 2.8, points: 65, form: [6, 6, 7, 6, 7] },
  { id: '29', name: 'Riaan Hanamub', position: 'DEF', team: 'AmaZulu FC', price: 3.1, points: 63, form: [7, 6, 6, 7, 6] },
  
  // Sekhukhune United
  { id: '30', name: 'Badra Sangaré', position: 'GK', team: 'Sekhukhune United', price: 3.4, points: 59, form: [5, 6, 7, 6, 5] },
  { id: '31', name: 'Daniel Cardoso', position: 'DEF', team: 'Sekhukhune United', price: 3.6, points: 67, form: [7, 7, 6, 7, 8] },
  { id: '32', name: 'Kamohelo Mokotjo', position: 'MID', team: 'Sekhukhune United', price: 4.9, points: 74, form: [8, 6, 7, 8, 7] },

  // Golden Arrows
  { id: '19', name: 'Nduduzo Sibiya', position: 'MID', team: 'Golden Arrows', price: 3.5, points: 68, form: [7, 6, 6, 7, 7] },
  { id: '33', name: 'Ryan Moon', position: 'FWD', team: 'Golden Arrows', price: 4.0, points: 70, form: [6, 8, 7, 7, 6] },
  { id: '34', name: 'Knox Mutizwa', position: 'FWD', team: 'Golden Arrows', price: 4.3, points: 72, form: [7, 7, 8, 6, 8] },

  // Royal AM
  { id: '18', name: 'Thabo Matlaba', position: 'DEF', team: 'Royal AM', price: 2.2, points: 62, form: [6, 5, 7, 6, 6] },
  { id: '35', name: 'Mfundo Thikazi', position: 'FWD', team: 'Royal AM', price: 4.1, points: 69, form: [7, 7, 6, 8, 6] },
  { id: '36', name: 'Hugo Nyamé', position: 'GK', team: 'Royal AM', price: 3.0, points: 55, form: [5, 6, 5, 6, 5] },
  
  // Chippa United
  { id: '37', name: 'Stanley Nwabali', position: 'GK', team: 'Chippa United', price: 4.3, points: 80, form: [8, 8, 9, 7, 8] },
  { id: '38', name: 'Justice Chabalala', position: 'DEF', team: 'Chippa United', price: 3.0, points: 58, form: [6, 5, 6, 7, 6] },
  { id: '39', name: 'Craig Martin', position: 'MID', team: 'Chippa United', price: 4.0, points: 67, form: [7, 6, 7, 6, 7] },

  // TS Galaxy
  { id: '40', name: 'Marks Munyai', position: 'DEF', team: 'TS Galaxy', price: 3.2, points: 60, form: [6, 6, 7, 5, 7] },
  { id: '41', name: 'Sphiwe Mahlangu', position: 'MID', team: 'TS Galaxy', price: 4.4, points: 71, form: [7, 8, 6, 7, 8] },
  { id: '42', name: 'Pogiso Sanoka', position: 'DEF', team: 'TS Galaxy', price: 3.4, points: 63, form: [6, 7, 6, 7, 6] },

  // Polokwane City
  { id: '43', name: 'Manuel Sapunga', position: 'GK', team: 'Polokwane City', price: 3.3, points: 62, form: [7, 6, 5, 7, 6] },
  { id: '44', name: 'Bulelani Nikani', position: 'DEF', team: 'Polokwane City', price: 2.9, points: 57, form: [5, 6, 6, 5, 6] },
  { id: '45', name: 'Oswin Appollis', position: 'FWD', team: 'Polokwane City', price: 4.6, points: 74, form: [8, 7, 8, 6, 7] },
  
  // Richards Bay FC
  { id: '46', name: 'Salim Magoola', position: 'GK', team: 'Richards Bay FC', price: 3.6, points: 66, form: [6, 7, 7, 6, 7] },
  { id: '47', name: 'Sanele Barns', position: 'FWD', team: 'Richards Bay FC', price: 4.1, points: 68, form: [7, 6, 8, 6, 7] },

  // Magesi FC
  { id: '48', name: 'Elvis Chipezeze', position: 'GK', team: 'Magesi FC', price: 3.1, points: 58, form: [6, 5, 6, 7, 5] },
  { id: '49', name: 'Rhulani Manzini', position: 'FWD', team: 'Magesi FC', price: 3.9, points: 65, form: [7, 6, 7, 5, 7] }
];
