import { PrismaClient } from "@/generated/prisma";

// `name` is the Spanish display name (unique, user-facing).
// `code` is the stable internal key used by the fixture seed and by the ESPN
// externalId linking script (prisma/seed/espn-countries.ts), which maps ESPN's
// 3-letter team abbreviation to this code.
export type CountrySeed = { name: string; code: string };

export const COUNTRIES: CountrySeed[] = [
  // Group A
  { name: "México", code: "MEX" },
  { name: "Corea del Sur", code: "KOR" },
  { name: "República Checa", code: "CZE" },
  { name: "Sudáfrica", code: "RSA" },
  // Group B
  { name: "Suiza", code: "SUI" },
  { name: "Canadá", code: "CAN" },
  { name: "Bosnia y Herzegovina", code: "BIH" },
  { name: "Catar", code: "QAT" },
  // Group C
  { name: "Brasil", code: "BRA" },
  { name: "Escocia", code: "SCO" },
  { name: "Marruecos", code: "MAR" },
  { name: "Haití", code: "HAI" },
  // Group D
  { name: "Estados Unidos", code: "USA" },
  { name: "Paraguay", code: "PAR" },
  { name: "Australia", code: "AUS" },
  { name: "Turquía", code: "TUR" },
  // Group E
  { name: "Alemania", code: "GER" },
  { name: "Costa de Marfil", code: "CIV" },
  { name: "Ecuador", code: "ECU" },
  { name: "Curazao", code: "CUW" },
  // Group F
  { name: "Países Bajos", code: "NED" },
  { name: "Japón", code: "JPN" },
  { name: "Túnez", code: "TUN" },
  { name: "Suecia", code: "SWE" },
  // Group G
  { name: "Bélgica", code: "BEL" },
  { name: "Egipto", code: "EGY" },
  { name: "Irán", code: "IRN" },
  { name: "Nueva Zelanda", code: "NZL" },
  // Group H
  { name: "España", code: "ESP" },
  { name: "Cabo Verde", code: "CPV" },
  { name: "Arabia Saudita", code: "KSA" },
  { name: "Uruguay", code: "URU" },
  // Group I
  { name: "Francia", code: "FRA" },
  { name: "Senegal", code: "SEN" },
  { name: "Noruega", code: "NOR" },
  { name: "Irak", code: "IRQ" },
  // Group J
  { name: "Argentina", code: "ARG" },
  { name: "Argelia", code: "ALG" },
  { name: "Austria", code: "AUT" },
  { name: "Jordania", code: "JOR" },
  // Group K
  { name: "Portugal", code: "POR" },
  { name: "Colombia", code: "COL" },
  { name: "Uzbekistán", code: "UZB" },
  { name: "República Democrática del Congo", code: "COD" },
  // Group L
  { name: "Inglaterra", code: "ENG" },
  { name: "Croacia", code: "CRO" },
  { name: "Ghana", code: "GHA" },
  { name: "Panamá", code: "PAN" },
];

export async function seedCountries(prisma: PrismaClient) {
  for (const country of COUNTRIES) {
    await prisma.country.upsert({
      where: { name: country.name },
      create: country,
      update: { code: country.code },
    });
  }
  console.log(`Upserted ${COUNTRIES.length} countries.`);
}
