// Small dependency-free runner: compile only the pure modules to a disposable directory.
const { execFileSync } = require('node:child_process');
const { mkdtempSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const output = mkdtempSync(join(tmpdir(), 'held-model-'));
try {
  execFileSync(process.execPath, [require.resolve('typescript/bin/tsc'), '--outDir', output, '--module', 'commonjs', '--target', 'es2022', '--strict', '--skipLibCheck', 'src/model/equilibrium.ts', 'src/interaction/state.ts', 'src/sculpture/hoist.ts'], { stdio: 'inherit' });
  execFileSync(process.execPath, ['tests/model.test.cjs'], { stdio: 'inherit', env: { ...process.env, HELD_MODEL_TEST_DIR: output } });
} finally { rmSync(output, { recursive: true, force: true }); }
