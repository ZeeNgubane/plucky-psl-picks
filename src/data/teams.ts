export interface Team {
  id: string;
  name: string;
  logo: string;
  city: string;
  kitImage: string;
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
  { id: '1', name: 'Kaizer Chiefs', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/568.png?lm=1770202601', city: 'Johannesburg', kitImage: 'https://www.sollymsports.com/wp-content/uploads/2024/08/photo-output_3.jpeg' },
  { id: '2', name: 'Orlando Pirates', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/2557.png?lm=1770195429', city: 'Johannesburg', kitImage: 'https://www.piratesshop.co.za/wp-content/uploads/2024/07/JJ2287_FL-1-copy.png' },
  { id: '3', name: 'Mamelodi Sundowns', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/6356.png?lm=1770203751', city: 'Pretoria', kitImage: 'https://images.puma.com/image/upload/f_auto,q_auto,w_600,b_rgb:FAFAFA/global/images/782742/22/fnd/ZAF/fmt/png' },
  { id: '4', name: 'Stellenbosch FC', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/23287.png?lm=1770202548', city: 'Stellenbosch', kitImage: 'https://cdn.footballkitarchive.com/2023/07/28/f3tL2M1sV9jR8cQ.jpg' },
  { id: '5', name: 'Sekhukhune United', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/85501.png?lm=1770196093', city: 'Limpopo', kitImage: 'https://cdn.footballkitarchive.com/2023/08/23/l1V9Z0vN4c8Q7Gj.jpg' },
  { id: '6', name: 'AmaZulu FC', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/9370.png?lm=1770202476', city: 'Durban', kitImage: 'https://cdn.footballkitarchive.com/2023/07/28/vX3bN6yK2zR1mHk.jpg' },
  { id: '7', name: 'Chippa United', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/31283.png?lm=1770194721', city: 'Port Elizabeth', kitImage: 'https://cdn.footballkitarchive.com/2023/08/11/g4VjL9bR2nF3oT.jpg' },
  { id: '8', name: 'Lamontville Golden Arrows', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/7011.png?lm=1451237378', city: 'Durban', kitImage: 'https://cdn.footballkitarchive.com/2023/08/04/iK6dJ9cM1bN2fE.jpg' },
  { id: '9', name: 'Richards Bay FC', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/12668.png?lm=1770202101', city: 'Richards Bay', kitImage: 'https://cdn.footballkitarchive.com/2023/08/11/x5F8rV2kH3bL1jQ.jpg' },
  { id: '10', name: 'Polokwane City FC', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/21202.png?lm=1770202417', city: 'Polokwane', kitImage: 'https://cdn.footballkitarchive.com/2023/08/25/h2gR8uF5wD7Z6bY.jpg' },
  { id: '11', name: 'TS Galaxy FC', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/67074.png?lm=1543132402', city: 'Mpumalanga', kitImage: 'https://cdn.footballkitarchive.com/2023/07/28/a9C1oP4uJ7bF0Kx.jpg' },
  { id: '12', name: 'Marumo Gallants FC', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/61852.png?lm=1770199218', city: 'Limpopo', kitImage: 'https://cdn.footballkitarchive.com/2023/07/28/a9C1oP4uJ7bF0Kx.jpg' },
  { id: '13', name: 'Siwelele Football Club', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/132785.png?lm=1770201955', city: 'Free State', kitImage: 'https://cdn.footballkitarchive.com/2023/08/04/o1eR3G2c7N8P4Zk.jpg' },
  { id: '14', name: 'Durban City Football Club', logo: 'https://tmssl.akamaized.net//images/wappen/verysmall/14187.png?lm=1770194595', city: 'Durban', kitImage: 'https://cdn.footballkitarchive.com/2023/08/04/o1eR3G2c7N8P4Zk.jpg' },
];

export const players: Player[] = [
  // === Mamelodi Sundowns (14 players) ===
  { id: '1', name: 'Iqraam Rayners', position: 'FWD', team: 'Mamelodi Sundowns', price: 3.0, points: 112, form: [10, 9, 10, 10, 9] },
  { id: '2', name: 'Marcelo Allende', position: 'MID', team: 'Mamelodi Sundowns', price: 2.5, points: 105, form: [10, 10, 9, 10, 10] },
  { id: '3', name: 'Teboho Mokoena', position: 'MID', team: 'Mamelodi Sundowns', price: 2.5, points: 101, form: [9, 10, 8, 9, 9] },
  { id: '4', name: 'Tashreeq Matthews', position: 'FWD', team: 'Mamelodi Sundowns', price: 2.4, points: 98, form: [10, 9, 9, 10, 9] },
  { id: '5', name: 'Nuno Santos', position: 'MID', team: 'Mamelodi Sundowns', price: 2.2, points: 95, form: [9, 9, 8, 10, 9] },
  { id: '6', name: 'Aubrey Modiba', position: 'DEF', team: 'Mamelodi Sundowns', price: 1.8, points: 88, form: [8, 9, 7, 8, 8] },
  { id: '7', name: 'Brayan León', position: 'FWD', team: 'Mamelodi Sundowns', price: 1.6, points: 87, form: [9, 8, 8, 9, 8] },
  { id: '8', name: 'Jayden Adams', position: 'MID', team: 'Mamelodi Sundowns', price: 1.4, points: 85, form: [8, 8, 9, 7, 8] },
  { id: '9', name: 'Fawaaz Basadien', position: 'DEF', team: 'Mamelodi Sundowns', price: 1.4, points: 82, form: [8, 8, 7, 8, 9] },
  { id: '10', name: 'Monnapule Saleng', position: 'FWD', team: 'Mamelodi Sundowns', price: 1.2, points: 80, form: [8, 7, 9, 8, 8] },
  { id: '11', name: 'Peter Shalulile', position: 'FWD', team: 'Mamelodi Sundowns', price: 1.2, points: 79, form: [8, 7, 8, 9, 7] },
  { id: '12', name: 'Khuliso Mudau', position: 'DEF', team: 'Mamelodi Sundowns', price: 1.2, points: 78, form: [8, 8, 7, 7, 8] },
  { id: '13', name: 'Arthur Sales', position: 'FWD', team: 'Mamelodi Sundowns', price: 1.0, points: 76, form: [7, 8, 8, 7, 8] },
  { id: '14', name: 'Ronwen Williams', position: 'GK', team: 'Mamelodi Sundowns', price: 0.9, points: 75, form: [8, 7, 7, 8, 7] },
  { id: '15', name: 'Thapelo Morena', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.9, points: 74, form: [7, 8, 7, 7, 8] },
  { id: '16', name: 'Matías Esquivel', position: 'MID', team: 'Mamelodi Sundowns', price: 0.9, points: 73, form: [7, 7, 8, 8, 7] },
  { id: '17', name: 'Lebo Mothiba', position: 'FWD', team: 'Mamelodi Sundowns', price: 0.9, points: 72, form: [7, 8, 7, 7, 7] },
  { id: '18', name: 'Khulumani Ndamane', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.8, points: 71, form: [7, 7, 8, 7, 7] },
  { id: '19', name: 'Tsiki Ntsabeleng', position: 'MID', team: 'Mamelodi Sundowns', price: 0.8, points: 70, form: [7, 7, 7, 8, 7] },
  { id: '20', name: 'Keanu Cupido', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.8, points: 69, form: [7, 7, 7, 7, 7] },
  { id: '21', name: 'Sphelele Mkhulise', position: 'MID', team: 'Mamelodi Sundowns', price: 0.8, points: 68, form: [7, 7, 6, 8, 7] },
  { id: '22', name: 'Mothobi Mvala', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.75, points: 67, form: [7, 6, 7, 8, 7] },
  { id: '23', name: 'Malibongwe Khoza', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.75, points: 66, form: [7, 7, 6, 7, 7] },
  { id: '24', name: 'Divine Lunga', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.65, points: 63, form: [6, 7, 7, 6, 7] },
  { id: '25', name: 'Kegan Johannes', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.6, points: 62, form: [6, 7, 6, 7, 7] },
  { id: '26', name: 'Zuko Mdunyelwa', position: 'DEF', team: 'Mamelodi Sundowns', price: 0.55, points: 60, form: [6, 6, 7, 6, 7] },

  // === Orlando Pirates (14 players) ===
  { id: '27', name: 'Oswin Appollis', position: 'FWD', team: 'Orlando Pirates', price: 2.0, points: 95, form: [10, 9, 8, 9, 10] },
  { id: '28', name: 'Relebohile Mofokeng', position: 'FWD', team: 'Orlando Pirates', price: 2.0, points: 92, form: [9, 8, 10, 7, 9] },
  { id: '29', name: 'Nkosinathi Sibisi', position: 'DEF', team: 'Orlando Pirates', price: 1.6, points: 85, form: [8, 8, 9, 7, 8] },
  { id: '30', name: 'Thalente Mbatha', position: 'MID', team: 'Orlando Pirates', price: 1.6, points: 84, form: [8, 9, 7, 8, 8] },
  { id: '31', name: 'Sipho Chaine', position: 'GK', team: 'Orlando Pirates', price: 1.4, points: 82, form: [8, 8, 7, 8, 9] },
  { id: '32', name: 'Deano Van Rooyen', position: 'DEF', team: 'Orlando Pirates', price: 1.4, points: 80, form: [8, 7, 8, 8, 7] },
  { id: '33', name: 'Patrick Maswanganyi', position: 'MID', team: 'Orlando Pirates', price: 1.2, points: 78, form: [8, 7, 8, 7, 8] },
  { id: '34', name: 'Evidence Makgopa', position: 'FWD', team: 'Orlando Pirates', price: 1.2, points: 77, form: [8, 7, 9, 8, 8] },
  { id: '35', name: 'Sipho Mbule', position: 'MID', team: 'Orlando Pirates', price: 1.2, points: 76, form: [7, 8, 8, 7, 7] },
  { id: '36', name: 'Tshepang Moremi', position: 'FWD', team: 'Orlando Pirates', price: 1.0, points: 74, form: [7, 8, 7, 7, 8] },
  { id: '37', name: 'Sihle Nduli', position: 'MID', team: 'Orlando Pirates', price: 0.85, points: 70, form: [7, 7, 7, 7, 7] },
  { id: '38', name: 'Kamogelo Sebelebele', position: 'FWD', team: 'Orlando Pirates', price: 0.85, points: 69, form: [7, 7, 6, 7, 8] },
  { id: '39', name: 'Andre de Jong', position: 'MID', team: 'Orlando Pirates', price: 0.8, points: 68, form: [7, 6, 7, 8, 7] },
  { id: '40', name: 'Tapelo Xoki', position: 'DEF', team: 'Orlando Pirates', price: 0.7, points: 65, form: [7, 6, 7, 6, 7] },
  { id: '41', name: 'Kabelo Dlamini', position: 'MID', team: 'Orlando Pirates', price: 0.7, points: 64, form: [6, 7, 7, 6, 7] },
  { id: '42', name: 'Yanela Mbuthuma', position: 'FWD', team: 'Orlando Pirates', price: 0.7, points: 63, form: [7, 6, 6, 7, 7] },
  { id: '43', name: 'Melusi Buthelezi', position: 'GK', team: 'Orlando Pirates', price: 0.5, points: 58, form: [6, 6, 7, 6, 6] },

  // === Kaizer Chiefs (11 players) ===
  { id: '44', name: 'Etiosa Ighodaro', position: 'FWD', team: 'Kaizer Chiefs', price: 1.0, points: 76, form: [7, 8, 8, 7, 8] },
  { id: '45', name: 'Khanyisa Mayo', position: 'FWD', team: 'Kaizer Chiefs', price: 0.9, points: 74, form: [8, 7, 8, 7, 7] },
  { id: '46', name: 'Thabiso Monyane', position: 'DEF', team: 'Kaizer Chiefs', price: 0.9, points: 72, form: [7, 7, 8, 7, 7] },
  { id: '47', name: 'Siphesihle Ndlovu', position: 'MID', team: 'Kaizer Chiefs', price: 0.85, points: 70, form: [7, 7, 7, 7, 7] },
  { id: '48', name: 'Sphiwe Msimango', position: 'DEF', team: 'Kaizer Chiefs', price: 0.85, points: 69, form: [7, 7, 6, 7, 8] },
  { id: '49', name: 'Mduduzi Shabalala', position: 'MID', team: 'Kaizer Chiefs', price: 0.85, points: 68, form: [7, 7, 8, 6, 7] },
  { id: '50', name: 'Reeve Frosler', position: 'DEF', team: 'Kaizer Chiefs', price: 0.8, points: 66, form: [7, 6, 7, 7, 7] },
  { id: '51', name: 'Ashley Du Preez', position: 'FWD', team: 'Kaizer Chiefs', price: 0.8, points: 65, form: [7, 6, 8, 7, 6] },
  { id: '52', name: 'Inácio Miguel', position: 'DEF', team: 'Kaizer Chiefs', price: 0.75, points: 64, form: [7, 7, 6, 7, 6] },
  { id: '53', name: 'Bradley Cross', position: 'DEF', team: 'Kaizer Chiefs', price: 0.65, points: 61, form: [6, 7, 6, 7, 6] },
  { id: '54', name: 'Rushwin Dortley', position: 'DEF', team: 'Kaizer Chiefs', price: 0.55, points: 59, form: [6, 6, 7, 6, 6] },
  { id: '55', name: 'Pule Mmodi', position: 'FWD', team: 'Kaizer Chiefs', price: 0.55, points: 58, form: [6, 6, 6, 7, 6] },
  { id: '56', name: 'Mfundo Vilakazi', position: 'MID', team: 'Kaizer Chiefs', price: 0.55, points: 57, form: [6, 7, 6, 6, 6] },

  // === Stellenbosch FC (7 players) ===
  { id: '57', name: 'Tshegofatso Mabasa', position: 'FWD', team: 'Stellenbosch FC', price: 1.4, points: 82, form: [8, 8, 9, 7, 8] },
  { id: '58', name: 'Devin Titus', position: 'FWD', team: 'Stellenbosch FC', price: 1.2, points: 78, form: [8, 7, 8, 8, 7] },
  { id: '59', name: 'Kobamelo Kodisang', position: 'FWD', team: 'Stellenbosch FC', price: 0.8, points: 68, form: [7, 7, 7, 6, 7] },
  { id: '60', name: 'Thabo Moloisane', position: 'DEF', team: 'Stellenbosch FC', price: 0.8, points: 67, form: [7, 6, 7, 7, 7] },
  { id: '61', name: 'Ashley Cupido', position: 'FWD', team: 'Stellenbosch FC', price: 0.7, points: 64, form: [7, 6, 7, 6, 7] },
  { id: '62', name: 'Genino Palace', position: 'MID', team: 'Stellenbosch FC', price: 0.7, points: 63, form: [6, 7, 7, 6, 7] },
  { id: '63', name: 'Langelihle Phili', position: 'FWD', team: 'Stellenbosch FC', price: 0.65, points: 61, form: [6, 7, 6, 7, 6] },
  { id: '64', name: 'Chumani Butsaka', position: 'MID', team: 'Stellenbosch FC', price: 0.65, points: 60, form: [6, 6, 7, 7, 6] },
  { id: '65', name: 'Wonderboy Makhubu', position: 'FWD', team: 'Stellenbosch FC', price: 0.55, points: 58, form: [6, 6, 7, 6, 6] },

  // === Sekhukhune United (3 players) ===
  { id: '66', name: 'Siphesihle Mkhize', position: 'MID', team: 'Sekhukhune United', price: 1.2, points: 78, form: [8, 7, 8, 7, 8] },
  { id: '67', name: 'Keletso Makgalwa', position: 'FWD', team: 'Sekhukhune United', price: 1.0, points: 74, form: [7, 8, 7, 7, 8] },
  { id: '68', name: 'Thato Khiba', position: 'MID', team: 'Sekhukhune United', price: 0.7, points: 65, form: [7, 6, 7, 6, 7] },
  { id: '69', name: 'Shaune Mogaila', position: 'DEF', team: 'Sekhukhune United', price: 0.6, points: 62, form: [6, 7, 6, 7, 6] },

  // === AmaZulu FC (5 players) ===
  { id: '70', name: 'Keegan Allan', position: 'DEF', team: 'AmaZulu FC', price: 1.0, points: 74, form: [7, 8, 7, 8, 7] },
  { id: '71', name: 'Riaan Hanamub', position: 'DEF', team: 'AmaZulu FC', price: 0.85, points: 70, form: [7, 7, 7, 7, 7] },
  { id: '72', name: 'Nkosikhona Radebe', position: 'DEF', team: 'AmaZulu FC', price: 0.7, points: 65, form: [7, 6, 7, 6, 7] },
  { id: '73', name: 'Mlondi Mbanjwa', position: 'FWD', team: 'AmaZulu FC', price: 0.6, points: 62, form: [6, 7, 6, 7, 6] },
  { id: '74', name: 'Ryan Moon', position: 'FWD', team: 'AmaZulu FC', price: 0.55, points: 59, form: [6, 6, 7, 6, 6] },
  { id: '75', name: 'Sandile Mthethwa', position: 'DEF', team: 'AmaZulu FC', price: 0.5, points: 57, form: [6, 6, 6, 6, 7] },

  // === Chippa United (3 players) ===
  { id: '76', name: 'Stanley Nwabali', position: 'GK', team: 'Chippa United', price: 1.0, points: 80, form: [8, 8, 9, 7, 8] },
  { id: '77', name: 'Goodman Mosele', position: 'MID', team: 'Chippa United', price: 0.55, points: 59, form: [6, 6, 7, 6, 6] },
  { id: '78', name: 'Abbubaker Mobara', position: 'DEF', team: 'Chippa United', price: 0.5, points: 57, form: [6, 6, 6, 6, 6] },

  // === Richards Bay FC (3 players) ===
  { id: '79', name: 'Simphiwe Mcineka', position: 'DEF', team: 'Richards Bay FC', price: 0.85, points: 70, form: [7, 7, 7, 7, 7] },
  { id: '80', name: 'Salim Magoola', position: 'GK', team: 'Richards Bay FC', price: 0.8, points: 68, form: [7, 7, 6, 7, 7] },
  { id: '81', name: 'Sanele Barns', position: 'FWD', team: 'Richards Bay FC', price: 0.65, points: 63, form: [6, 7, 7, 6, 7] },
  { id: '82', name: 'Moses Mthembu', position: 'MID', team: 'Richards Bay FC', price: 0.55, points: 59, form: [6, 6, 7, 6, 6] },

  // === Polokwane City FC (2 players) ===
  { id: '83', name: 'Thabang Matuludi', position: 'DEF', team: 'Polokwane City FC', price: 0.9, points: 72, form: [7, 7, 8, 7, 7] },
  { id: '84', name: 'Mokibelo Ramabu', position: 'FWD', team: 'Polokwane City FC', price: 0.7, points: 65, form: [7, 6, 7, 6, 7] },

  // === TS Galaxy FC (3 players) ===
  { id: '85', name: 'Macbeth Mahlangu', position: 'DEF', team: 'TS Galaxy FC', price: 0.9, points: 72, form: [7, 7, 8, 7, 7] },
  { id: '86', name: 'Nhlanhla Mgaga', position: 'MID', team: 'TS Galaxy FC', price: 0.75, points: 66, form: [7, 7, 6, 7, 7] },
  { id: '87', name: 'Kganyane Letsoenyo', position: 'DEF', team: 'TS Galaxy FC', price: 0.55, points: 59, form: [6, 6, 7, 6, 6] },

  // === Lamontville Golden Arrows (3 players) ===
  { id: '88', name: 'Siyanda Ndlovu', position: 'FWD', team: 'Lamontville Golden Arrows', price: 0.8, points: 68, form: [7, 7, 7, 6, 7] },
  { id: '89', name: 'Keenan Phillips', position: 'DEF', team: 'Lamontville Golden Arrows', price: 0.75, points: 66, form: [7, 7, 6, 7, 7] },
  { id: '90', name: 'Nduduzo Sibiya', position: 'FWD', team: 'Lamontville Golden Arrows', price: 0.6, points: 62, form: [6, 7, 6, 7, 6] },

  // === Marumo Gallants FC (1 player) ===
  { id: '91', name: 'Ndabayithethwa Ndlondlo', position: 'MID', team: 'Marumo Gallants FC', price: 0.6, points: 62, form: [6, 7, 6, 7, 6] },

  // === Siwelele Football Club (3 players) ===
  { id: '92', name: 'Ghampani Lungu', position: 'FWD', team: 'Siwelele Football Club', price: 1.0, points: 74, form: [7, 8, 7, 7, 8] },
  { id: '93', name: 'Chibuike Ohizu', position: 'FWD', team: 'Siwelele Football Club', price: 0.8, points: 68, form: [7, 7, 7, 6, 7] },
  { id: '94', name: 'Grant Margeman', position: 'MID', team: 'Siwelele Football Club', price: 0.8, points: 67, form: [7, 6, 7, 7, 7] },
  { id: '95', name: 'Nyiko Mobbie', position: 'DEF', team: 'Siwelele Football Club', price: 0.65, points: 63, form: [6, 7, 7, 6, 7] },

  // === Durban City Football Club (5 players) ===
  { id: '96', name: 'Thabo Nodada', position: 'MID', team: 'Durban City Football Club', price: 0.7, points: 65, form: [7, 6, 7, 6, 7] },
  { id: '97', name: 'Taahir Goedeman', position: 'MID', team: 'Durban City Football Club', price: 0.7, points: 64, form: [6, 7, 7, 6, 7] },
  { id: '98', name: 'Sphiwe Mahlangu', position: 'FWD', team: 'Durban City Football Club', price: 0.6, points: 62, form: [6, 7, 6, 7, 6] },
  { id: '99', name: 'Ronaldo Maarman', position: 'MID', team: 'Durban City Football Club', price: 0.6, points: 61, form: [6, 6, 7, 6, 7] },
  { id: '100', name: 'Terrence Mashego', position: 'DEF', team: 'Durban City Football Club', price: 0.55, points: 59, form: [6, 6, 7, 6, 6] },
];
