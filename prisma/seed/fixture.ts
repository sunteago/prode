import { PrismaClient, Stage } from "@/generated/prisma";

// Fixture rows reference countries by their stable `code` (see countries.ts),
// not by display name, so Spanish name edits never break the join.
type Fixture = [Stage, string, string, string];

// All times are UTC, converted from openfootball/worldcup.json local times + UTC offsets.
const MATCHES: Fixture[] = [
  // GROUP A
  ["GROUP_A", "MEX", "RSA", "2026-06-11T19:00:00.000Z"],  // 13:00 UTC-6
  ["GROUP_A", "KOR", "CZE", "2026-06-12T02:00:00.000Z"],  // 20:00 UTC-6
  ["GROUP_A", "CZE", "RSA", "2026-06-18T16:00:00.000Z"],  // 12:00 UTC-4
  ["GROUP_A", "MEX", "KOR", "2026-06-19T01:00:00.000Z"],  // 19:00 UTC-6
  ["GROUP_A", "CZE", "MEX", "2026-06-25T01:00:00.000Z"],  // 19:00 UTC-6
  ["GROUP_A", "RSA", "KOR", "2026-06-25T01:00:00.000Z"],  // 19:00 UTC-6
  // GROUP B
  ["GROUP_B", "CAN", "BIH", "2026-06-12T19:00:00.000Z"],  // 15:00 UTC-4
  ["GROUP_B", "QAT", "SUI", "2026-06-13T19:00:00.000Z"],  // 12:00 UTC-7
  ["GROUP_B", "SUI", "BIH", "2026-06-18T19:00:00.000Z"],  // 12:00 UTC-7
  ["GROUP_B", "CAN", "QAT", "2026-06-18T22:00:00.000Z"],  // 15:00 UTC-7
  ["GROUP_B", "SUI", "CAN", "2026-06-24T19:00:00.000Z"],  // 12:00 UTC-7
  ["GROUP_B", "BIH", "QAT", "2026-06-24T19:00:00.000Z"],  // 12:00 UTC-7
  // GROUP C
  ["GROUP_C", "BRA", "MAR", "2026-06-13T22:00:00.000Z"],  // 18:00 UTC-4
  ["GROUP_C", "HAI", "SCO", "2026-06-14T01:00:00.000Z"],  // 21:00 UTC-4
  ["GROUP_C", "SCO", "MAR", "2026-06-19T22:00:00.000Z"],  // 18:00 UTC-4
  ["GROUP_C", "BRA", "HAI", "2026-06-20T00:30:00.000Z"],  // 20:30 UTC-4
  ["GROUP_C", "SCO", "BRA", "2026-06-24T22:00:00.000Z"],  // 18:00 UTC-4
  ["GROUP_C", "MAR", "HAI", "2026-06-24T22:00:00.000Z"],  // 18:00 UTC-4
  // GROUP D
  ["GROUP_D", "USA", "PAR", "2026-06-13T01:00:00.000Z"],  // 18:00 UTC-7
  ["GROUP_D", "AUS", "TUR", "2026-06-14T04:00:00.000Z"],  // 21:00 UTC-7
  ["GROUP_D", "USA", "AUS", "2026-06-19T19:00:00.000Z"],  // 12:00 UTC-7
  ["GROUP_D", "TUR", "PAR", "2026-06-20T03:00:00.000Z"],  // 20:00 UTC-7
  ["GROUP_D", "TUR", "USA", "2026-06-26T02:00:00.000Z"],  // 19:00 UTC-7
  ["GROUP_D", "PAR", "AUS", "2026-06-26T02:00:00.000Z"],  // 19:00 UTC-7
  // GROUP E
  ["GROUP_E", "GER", "CUW", "2026-06-14T17:00:00.000Z"],  // 12:00 UTC-5
  ["GROUP_E", "CIV", "ECU", "2026-06-14T23:00:00.000Z"],  // 19:00 UTC-4
  ["GROUP_E", "GER", "CIV", "2026-06-20T20:00:00.000Z"],  // 16:00 UTC-4
  ["GROUP_E", "ECU", "CUW", "2026-06-21T00:00:00.000Z"],  // 19:00 UTC-5
  ["GROUP_E", "CUW", "CIV", "2026-06-25T20:00:00.000Z"],  // 16:00 UTC-4
  ["GROUP_E", "ECU", "GER", "2026-06-25T20:00:00.000Z"],  // 16:00 UTC-4
  // GROUP F
  ["GROUP_F", "NED", "JPN", "2026-06-14T20:00:00.000Z"],  // 15:00 UTC-5
  ["GROUP_F", "SWE", "TUN", "2026-06-15T02:00:00.000Z"],  // 20:00 UTC-6
  ["GROUP_F", "NED", "SWE", "2026-06-20T17:00:00.000Z"],  // 12:00 UTC-5
  ["GROUP_F", "TUN", "JPN", "2026-06-21T04:00:00.000Z"],  // 22:00 UTC-6
  ["GROUP_F", "JPN", "SWE", "2026-06-25T23:00:00.000Z"],  // 18:00 UTC-5
  ["GROUP_F", "TUN", "NED", "2026-06-25T23:00:00.000Z"],  // 18:00 UTC-5
  // GROUP G
  ["GROUP_G", "BEL", "EGY", "2026-06-15T19:00:00.000Z"],  // 12:00 UTC-7
  ["GROUP_G", "IRN", "NZL", "2026-06-16T01:00:00.000Z"],  // 18:00 UTC-7
  ["GROUP_G", "BEL", "IRN", "2026-06-21T19:00:00.000Z"],  // 12:00 UTC-7
  ["GROUP_G", "NZL", "EGY", "2026-06-22T01:00:00.000Z"],  // 18:00 UTC-7
  ["GROUP_G", "EGY", "IRN", "2026-06-27T03:00:00.000Z"],  // 20:00 UTC-7
  ["GROUP_G", "NZL", "BEL", "2026-06-27T03:00:00.000Z"],  // 20:00 UTC-7
  // GROUP H
  ["GROUP_H", "ESP", "CPV", "2026-06-15T16:00:00.000Z"],  // 12:00 UTC-4
  ["GROUP_H", "KSA", "URU", "2026-06-15T22:00:00.000Z"],  // 18:00 UTC-4
  ["GROUP_H", "ESP", "KSA", "2026-06-21T16:00:00.000Z"],  // 12:00 UTC-4
  ["GROUP_H", "URU", "CPV", "2026-06-21T22:00:00.000Z"],  // 18:00 UTC-4
  ["GROUP_H", "CPV", "KSA", "2026-06-27T00:00:00.000Z"],  // 19:00 UTC-5
  ["GROUP_H", "URU", "ESP", "2026-06-27T00:00:00.000Z"],  // 18:00 UTC-6
  // GROUP I
  ["GROUP_I", "FRA", "SEN", "2026-06-16T19:00:00.000Z"],  // 15:00 UTC-4
  ["GROUP_I", "IRQ", "NOR", "2026-06-16T22:00:00.000Z"],  // 18:00 UTC-4
  ["GROUP_I", "FRA", "IRQ", "2026-06-22T21:00:00.000Z"],  // 17:00 UTC-4
  ["GROUP_I", "NOR", "SEN", "2026-06-23T00:00:00.000Z"],  // 20:00 UTC-4
  ["GROUP_I", "NOR", "FRA", "2026-06-26T19:00:00.000Z"],  // 15:00 UTC-4
  ["GROUP_I", "SEN", "IRQ", "2026-06-26T19:00:00.000Z"],  // 15:00 UTC-4
  // GROUP J
  ["GROUP_J", "ARG", "ALG", "2026-06-17T01:00:00.000Z"],  // 20:00 UTC-5
  ["GROUP_J", "AUT", "JOR", "2026-06-17T04:00:00.000Z"],  // 21:00 UTC-7
  ["GROUP_J", "ARG", "AUT", "2026-06-22T17:00:00.000Z"],  // 12:00 UTC-5
  ["GROUP_J", "JOR", "ALG", "2026-06-23T03:00:00.000Z"],  // 20:00 UTC-7
  ["GROUP_J", "ALG", "AUT", "2026-06-28T02:00:00.000Z"],  // 21:00 UTC-5
  ["GROUP_J", "JOR", "ARG", "2026-06-28T02:00:00.000Z"],  // 21:00 UTC-5
  // GROUP K
  ["GROUP_K", "POR", "COD", "2026-06-17T17:00:00.000Z"],  // 12:00 UTC-5
  ["GROUP_K", "UZB", "COL", "2026-06-18T02:00:00.000Z"],  // 20:00 UTC-6
  ["GROUP_K", "POR", "UZB", "2026-06-23T17:00:00.000Z"],  // 12:00 UTC-5
  ["GROUP_K", "COL", "COD", "2026-06-24T02:00:00.000Z"],  // 20:00 UTC-6
  ["GROUP_K", "COL", "POR", "2026-06-27T23:30:00.000Z"],  // 19:30 UTC-4
  ["GROUP_K", "COD", "UZB", "2026-06-27T23:30:00.000Z"],  // 19:30 UTC-4
  // GROUP L
  ["GROUP_L", "ENG", "CRO", "2026-06-17T20:00:00.000Z"],  // 15:00 UTC-5
  ["GROUP_L", "GHA", "PAN", "2026-06-17T23:00:00.000Z"],  // 19:00 UTC-4
  ["GROUP_L", "ENG", "GHA", "2026-06-23T20:00:00.000Z"],  // 16:00 UTC-4
  ["GROUP_L", "PAN", "CRO", "2026-06-23T23:00:00.000Z"],  // 19:00 UTC-4
  ["GROUP_L", "PAN", "ENG", "2026-06-27T21:00:00.000Z"],  // 17:00 UTC-4
  ["GROUP_L", "CRO", "GHA", "2026-06-27T21:00:00.000Z"],  // 17:00 UTC-4
];

export async function seedFixture(prisma: PrismaClient, prodeId: string) {
  const countries = await prisma.country.findMany();
  const idByCode = new Map(countries.map((c) => [c.code, c.id]));

  const matchData = MATCHES.map(([stage, left, right, date]) => {
    const countryLeftId = idByCode.get(left);
    const countryRightId = idByCode.get(right);
    if (!countryLeftId || !countryRightId) {
      throw new Error(`Unknown country code in fixture: ${left} vs ${right}`);
    }
    return {
      prodeId,
      stage,
      goalsLeft: null as number | null,
      goalsRight: null as number | null,
      penaltisLeft: null as number | null,
      penaltisRight: null as number | null,
      filled: false,
      countryLeftId,
      countryRightId,
      date: new Date(date),
    };
  });

  // Delete existing group-stage matches for this prode before re-seeding
  await prisma.match.deleteMany({
    where: {
      prodeId,
      stage: {
        in: [
          "GROUP_A", "GROUP_B", "GROUP_C", "GROUP_D",
          "GROUP_E", "GROUP_F", "GROUP_G", "GROUP_H",
          "GROUP_I", "GROUP_J", "GROUP_K", "GROUP_L",
        ],
      },
    },
  });

  await prisma.match.createMany({ data: matchData });
  console.log(`Seeded ${matchData.length} group-stage matches.`);
}
