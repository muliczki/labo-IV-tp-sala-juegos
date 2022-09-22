export class Carta {
   public id?:number;
   public nombre?:string;
   public valor:number=0;

}
// The value, one of A (for an ace), 2, 3, 4, 5, 6, 7, 8, 9, 0 (for a ten), J (jack), Q (queen), or K (king);
// The suit, one of S (Spades), D (Diamonds), C (Clubs), or H (Hearts).

export const cartas:Carta[] = [
    //AS
    {
        id: 1,
        nombre: 'AS',
        valor: 14
    },
    {
        id: 2,
        nombre: 'AH', //era AD pero no reconoce la imagen de la api
        valor: 14
    },
    {
        id: 3,
        nombre: 'AC',
        valor: 14
    },
    {
        id: 4,
        nombre: 'AH',
        valor: 14
    },
    //2
    {
        id: 5,
        nombre: '2S',
        valor: 2
    },
    {
        id: 6,
        nombre: '2D',
        valor: 2
    },
    {
        id: 7,
        nombre: '2C',
        valor: 2
    },
    {
        id: 8,
        nombre: '2H',
        valor: 2
    },
    //3
    {
        id: 9,
        nombre: '3S',
        valor: 3
    },
    {
        id: 10,
        nombre: '3D',
        valor: 3
    },
    {
        id: 11,
        nombre: '3C',
        valor: 3
    },
    {
        id: 12,
        nombre: '3H',
        valor: 3
    },
    //4
    {
        id: 13,
        nombre: '4S',
        valor: 4
    },
    {
        id: 14,
        nombre: '4D',
        valor: 4
    },
    {
        id: 15,
        nombre: '4C',
        valor: 4
    },
    {
        id: 16,
        nombre: '4H',
        valor: 4
    },
    //5
    {
        id: 17,
        nombre: '5S',
        valor: 5
    },
    {
        id: 18,
        nombre: '5D',
        valor: 5
    },
    {
        id: 19,
        nombre: '5C',
        valor: 5
    },
    {
        id: 20,
        nombre: '5H',
        valor: 5
    },
    //6
    {
        id: 21,
        nombre: '6S',
        valor: 6
    },
    {
        id: 22,
        nombre: '6D',
        valor: 6
    },
    {
        id: 23,
        nombre: '6C',
        valor: 6
    },
    {
        id: 24,
        nombre: '6H',
        valor: 6
    },
    //7
    {
        id: 25,
        nombre: '7S',
        valor: 7
    },
    {
        id: 26,
        nombre: '7D',
        valor: 7
    },
    {
        id: 27,
        nombre: '7C',
        valor: 7
    },
    {
        id: 28,
        nombre: '7H',
        valor: 7
    },
    //8
    {
        id: 29,
        nombre: '8S',
        valor: 8
    },
    {
        id: 30,
        nombre: '8D',
        valor: 8
    },
    {
        id: 31,
        nombre: '8C',
        valor: 8
    },
    {
        id: 32,
        nombre: '8H',
        valor: 8
    },
    //9
    {
        id: 33,
        nombre: '9S',
        valor: 9
    },
    {
        id: 34,
        nombre: '9D',
        valor: 9
    },
    {
        id: 35,
        nombre: '9C',
        valor: 9
    },
    {
        id: 36,
        nombre: '9H',
        valor: 9
    },
    //10
    {
        id: 37,
        nombre: '0S',
        valor: 10
    },
    {
        id: 38,
        nombre: '0D',
        valor: 10
    },
    {
        id: 39,
        nombre: '0C',
        valor: 10
    },
    {
        id: 40,
        nombre: '0H',
        valor: 10
    },
    //J
    {
        id: 41,
        nombre: 'JS',
        valor: 11
    },
    {
        id: 42,
        nombre: 'JD',
        valor: 11
    },
    {
        id: 43,
        nombre: 'JC',
        valor: 11
    },
    {
        id: 44,
        nombre: 'JH',
        valor: 11
    },
    //Q
    {
        id: 45,
        nombre: 'QS',
        valor: 12
    },
    {
        id: 46,
        nombre: 'QD',
        valor: 12
    },
    {
        id: 47,
        nombre: 'QC',
        valor: 12
    },
    {
        id: 48,
        nombre: 'QH',
        valor: 12
    },
    //K
    {
        id: 49,
        nombre: 'KS',
        valor: 13
    },
    {
        id: 50,
        nombre: 'KD',
        valor: 13
    },
    {
        id: 51,
        nombre: 'KC',
        valor: 13
    },
    {
        id: 52,
        nombre: 'KH',
        valor: 13
    }
]
