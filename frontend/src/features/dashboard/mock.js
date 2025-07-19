import { faker } from '@faker-js/faker'

export const generateMockArt = (count = 40) =>
  Array.from({ length: count }, (_, index) => ({
    id: index,
    title: faker.lorem.words({ min: 1, max: 4 }),
    description: faker.lorem.sentence(),
    imageUrl: faker.image.url({
      width: 400,
      height: 600,
    }),
    author: { name: faker.person.fullName(), avatar: faker.image.avatar() },
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.word()),
  }))

export const mockArtData = generateMockArt()
