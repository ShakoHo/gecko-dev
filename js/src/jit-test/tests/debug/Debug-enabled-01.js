var desc = Object.getOwnPropertyDescriptor(Debug.prototype, "enabled");
assertEq(typeof desc.get, 'function');
assertEq(typeof desc.set, 'function');

var g = newGlobal('new-compartment');
var hits;
var dbg = new Debug(g);
assertEq(dbg.enabled, true);
dbg.hooks = {debuggerHandler: function () { hits++; }};

var vals = [true, false, null, undefined, NaN, "blah", {}];
for (var i = 0; i < vals.length; i++) {
    dbg.enabled = vals[i];
    assertEq(dbg.enabled, !!vals[i]);
    hits = 0;
    g.eval("debugger;");
    assertEq(hits, vals[i] ? 1 : 0);
}
