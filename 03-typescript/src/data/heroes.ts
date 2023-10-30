interface IHero {
  id: number
  name: string
  owner: string
}

export const heroes: IHero[] = [
  {
    id: 1,
    name: 'Ironman',
    owner: 'Marvel',
  },
  {
    id: 2,
    name: 'Spiderman',
    owner: 'Marvel',
  },
  {
    id: 3,
    name: 'Batman',
    owner: 'DC',
  },
]