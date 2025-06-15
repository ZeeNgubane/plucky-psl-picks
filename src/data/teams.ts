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
  
  // Orlando Pirates
  { id: '5', name: 'Richard Ofori', position: 'GK', team: 'Orlando Pirates', price: 4.5, points: 88, form: [8, 9, 7, 8, 8] },
  { id: '6', name: 'Innocent Maela', position: 'DEF', team: 'Orlando Pirates', price: 3.2, points: 69, form: [6, 7, 8, 6, 7] },
  { id: '7', name: 'Monnapule Saleng', position: 'MID', team: 'Orlando Pirates', price: 7.2, points: 95, form: [10, 9, 8, 9, 10] },
  { id: '8', name: 'Evidence Makgopa', position: 'FWD', team: 'Orlando Pirates', price: 6.5, points: 87, form: [8, 7, 9, 8, 8] },

  // Mamelodi Sundowns
  { id: '9', name: 'Denis Onyango', position: 'GK', team: 'Mamelodi Sundowns', price: 5.5, points: 98, form: [10, 9, 9, 10, 9] },
  { id: '10', name: 'Mothobi Mvala', position: 'DEF', team: 'Mamelodi Sundowns', price: 4.8, points: 82, form: [8, 8, 9, 7, 8] },
  { id: '11', name: 'Themba Zwane', position: 'MID', team: 'Mamelodi Sundowns', price: 8.2, points: 105, form: [10, 10, 9, 10, 10] },
  { id: '12', name: 'Peter Shalulile', position: 'FWD', team: 'Mamelodi Sundowns', price: 8.3, points: 112, form: [10, 9, 10, 10, 9] },

  // More players for other teams
  { id: '13', name: 'Bradley Grobler', position: 'FWD', team: 'Supersport United', price: 5.8, points: 79, form: [7, 8, 6, 9, 7] },
  { id: '14', name: 'Khanyisa Mayo', position: 'FWD', team: 'Cape Town City', price: 6.2, points: 89, form: [9, 8, 8, 9, 8] },
  { id: '15', name: 'Iqraam Rayners', position: 'FWD', team: 'Stellenbosch FC', price: 4.5, points: 76, form: [7, 7, 8, 6, 8] },
  { id: '16', name: 'Bongi Ntuli', position: 'FWD', team: 'AmaZulu FC', price: 3.8, points: 71, form: [6, 7, 7, 8, 6] },

  // Additional players
  { id: '17', name: 'Veli Mothwa', position: 'GK', team: 'AmaZulu FC', price: 2.8, points: 65, form: [6, 6, 7, 6, 7] },
  { id: '18', name: 'Thabo Matlaba', position: 'DEF', team: 'Royal AM', price: 2.2, points: 62, form: [6, 5, 7, 6, 6] },
  { id: '19', name: 'Nduduzo Sibiya', position: 'MID', team: 'Golden Arrows', price: 3.5, points: 68, form: [7, 6, 6, 7, 7] },
  { id: '20', name: 'Pule Mmodi', position: 'MID', team: 'Golden Arrows', price: 4.2, points: 73, form: [7, 8, 6, 7, 8] }
];
