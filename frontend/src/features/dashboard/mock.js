import { faker } from '@faker-js/faker'

export const generateMockArt = (count = 40) =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: faker.lorem.words(faker.number.int({ min: 1, max: 4 })),
    description: faker.lorem.sentence(),
    imageUrl: `https://picsum.photos/400/${faker.number.int({ min: 400, max: 800 })}?random=${i}`,
    author: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
    tags: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.lorem.word()),
  }))

export const mockArtData = generateMockArt()
