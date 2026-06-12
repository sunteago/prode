import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Path aliases are defined explicitly here rather than via vite-tsconfig-paths
// because tsconfig.json excludes `tests` and `vitest.config.ts` from the Next.js
// build type-check (those files import devDependencies pruned in prod installs).
// The plugin only maps aliases for files inside the tsconfig project, so excluded
// test files would lose `@/` and `@test/` resolution. These explicit aliases keep
// resolution working regardless of tsconfig include/exclude. Keep them in sync
// with compilerOptions.paths in tsconfig.json.
export default defineConfig({
  resolve: {
    alias: [
      { find: /^@test\//, replacement: fileURLToPath(new URL('./tests/', import.meta.url)) },
      { find: /^@\//, replacement: fileURLToPath(new URL('./src/', import.meta.url)) },
    ],
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['tests/**/*.test.ts'],
    passWithNoTests: true,
    // DB tests share the same Postgres on :5433. Running test files in parallel
    // causes one file's cleanup to wipe another's seeded rows mid-test. Serial
    // file execution keeps things deterministic; cost is ~1s on the pure-TS tests.
    fileParallelism: false,
    // Ensure the Prisma singleton in lib/prisma.ts can resolve the test DB.
    // The divergence tests create their own PrismaClient with an explicit URL;
    // the queries-sync tests call syncronizeTemplate/syncronizeFinalsTemplate
    // which use the singleton, so DATABASE_URL must be set at process level.
    env: {
      DATABASE_URL:
        process.env.DATABASE_URL ??
        process.env.TEST_DATABASE_URL ??
        'postgresql://leniolabs:leniolabs@localhost:5433/prode_test',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: [
        'src/utils/points.ts',
        'src/utils/queries.ts',
        'src/utils/raw.ts',
        'src/lib/**/*.ts',
      ],
      exclude: ['**/*.d.ts', '**/*.test.ts'],
      thresholds: {
        // Per-file threshold only on the pure scoring module (fully testable without a DB).
        // utils/queries.ts and utils/raw.ts are excluded from enforcement because they
        // contain async Prisma and raw-SQL functions that require a live DB (Phase 1C scope).
        'src/utils/points.ts': {
          lines: 90,
          functions: 90,
          branches: 85,
          statements: 90,
        },
      },
    },
  },
});
