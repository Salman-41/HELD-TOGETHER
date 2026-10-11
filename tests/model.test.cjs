const { test } = require('node:test');
const assert = require('node:assert/strict');
const { join } = require('node:path');
const { MODEL, solveSupported, solveSingleRest, boundedPosition } = require(join(process.env.HELD_MODEL_TEST_DIR, 'model/equilibrium.js'));
const { INITIAL, reduceExperiment } = require(join(process.env.HELD_MODEL_TEST_DIR, 'interaction/state.js'));
const { hoistPose, beamPoint } = require(join(process.env.HELD_MODEL_TEST_DIR, 'sculpture/hoist.js'));
const near = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
function forces(s) { const result = solveSupported(s); assert.equal(result.ok, true); return result.forces; }

test('declared end and middle loads, including beam self-weight', () => {
  for (const [s,a,b] of [[0,137.34,58.86],[1.5,98.10,98.10],[3,58.86,137.34]]) {
    const f = forces(s); near(f.a,a); near(f.b,b); near(f.beam,117.72); near(f.load,78.48);
  }
  const vertical = solveSingleRest(); assert.equal(vertical.ok,true); near(vertical.forces.a,196.20); near(vertical.forces.b,0);
});

test('force and moment balance, reflection, and strictly positive cable tensions throughout the range', () => {
  for(let i=0;i<=100;i++) {
    const s=MODEL.length*i/100, f=forces(s), mirror=forces(MODEL.length-s);
    near((f.a+f.b-f.total)/f.total,0); near((f.b*MODEL.length-f.beam*MODEL.length/2-f.load*s)/(f.total*MODEL.length),0);
    near(f.a,mirror.b); near(f.b,mirror.a); assert.ok(f.a >= f.beam/2 && f.b >= f.beam/2);
  }
});

test('invalid, out-of-range and numerically unsafe inputs are rejected, never fabricated or reaction-clamped', () => {
  for(const s of [NaN,Infinity,-Infinity,-0.01,3.01]) assert.equal(solveSupported(s).ok,false);
  for(const key of Object.keys(MODEL)) for(const value of [0,-1,NaN,Infinity]) assert.equal(solveSupported(1,{...MODEL,[key]:value}).ok,false);
  assert.equal(solveSupported(1,{...MODEL,beamMass:Number.MAX_VALUE}).ok,false);
  assert.equal(solveSupported(1,{...MODEL,length:Number.MAX_VALUE}).ok,false);
  assert.equal(solveSingleRest(1.5).reason,'unstable');
  assert.equal(solveSingleRest(NaN).ok,false);
});

test('only UI positions are bounded; nonfinite input remains invalid', () => {
  assert.equal(boundedPosition(-5),0); assert.equal(boundedPosition(5),3);
  near(boundedPosition(1.23456789),1.23456789); assert.ok(Number.isNaN(boundedPosition(NaN)));
});

test('state guards, cancellation and return cannot release support in a horizontal rest pose', () => {
  assert.deepEqual(reduceExperiment(INITIAL,{type:'position',value:1}),INITIAL);
  let state=reduceExperiment(INITIAL,{type:'engage'});
  assert.equal(reduceExperiment(state,{type:'engage'}),state);
  assert.equal(reduceExperiment(state,{type:'reset'}),state);
  state=reduceExperiment(state,{type:'complete'});
  state=reduceExperiment(state,{type:'begin'});
  state=reduceExperiment(state,{type:'position',value:0.6});
  assert.equal(reduceExperiment(state,{type:'return'}),state);
  state=reduceExperiment(state,{type:'cancel'}); near(state.position,3);
  state=reduceExperiment(state,{type:'step',delta:-1.5}); near(state.position,1.5);
  state=reduceExperiment(state,{type:'return'}); assert.equal(state.phase,'returning'); near(state.position,1.5);
  assert.deepEqual(reduceExperiment(state,{type:'complete'}),INITIAL);
  state=reduceExperiment(reduceExperiment(reduceExperiment(INITIAL,{type:'engage'}),{type:'complete'}),{type:'begin'});
  state=reduceExperiment(state,{type:'position',value:NaN}); assert.equal(state.phase,'unavailable');
  assert.deepEqual(reduceExperiment(state,{type:'reset'}),INITIAL);
});

test('illustrative hoist retains beam length, moves A, and preserves floor clearance at the approved sizes', () => {
  let sawSwing=false;
  for(let i=0;i<=100;i++) {
    const pose=hoistPose(i/100), b=beamPoint(pose,3);
    near(Math.hypot(b.x-pose.ax,b.y-pose.ay),3); sawSwing ||= pose.ax > 0.1;
    if(pose.angle < Math.PI/2 - 1e-9) assert.equal(pose.slack,0);
    for(const [restK,spanK,restY,spanY,floor] of [[120,210,302,420,824],[86,94,312,352,694],[188/3,212/3,312,352,694]]) {
      const k=restK+(spanK-restK)*pose.fit, y=restY+(spanY-restY)*pose.fit;
      assert.ok(y+(b.y+0.35+0.44)*k < floor, 'weight intersects floor');
    }
  }
  assert.ok(sawSwing); near(hoistPose(0).angle,Math.PI/2); near(hoistPose(1).angle,0);
  near(hoistPose(0).slack,1); near(hoistPose(1).slack,0);
});
