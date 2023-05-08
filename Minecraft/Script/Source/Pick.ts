namespace Script {
  import ƒ = FudgeCore;

  export function pickByComponent(_event: PointerEvent): void {
    console.log("pickByComponent");
    Reflect.set(_event, "closestDistance", Infinity);
    Reflect.set(_event, "closestBlock", null);
    viewport.dispatchPointerEvent(_event);
    hitBlock(Reflect.get(_event, "closestBlock"));
  }

  export function hitComponent(_event: PointerEvent): void {
    let block: ƒ.Node = (<ƒ.Node>_event.target);
    let closestDistance: number = Reflect.get(_event, "closestDistance");
    let pick: ƒ.Pick = <ƒ.Pick>Reflect.get(_event, "pick");
    if (pick.zBuffer < closestDistance) {
      Reflect.set(_event, "closestDistance", pick.zBuffer);
      Reflect.set(_event, "closestBlock", block);
    }
  }

  export function pickByCamera(_event: PointerEvent): void {
    console.log("pickCamera");
    let picks: ƒ.Pick[] = ƒ.Picker.pickViewport(viewport, new ƒ.Vector2(_event.clientX, _event.clientY));
    picks.sort((_a, _b) => _a.zBuffer < _b.zBuffer ? -1 : 1);
    let pick: ƒ.Pick = picks[0];

    if (_event.button == 1)
      hitBlock(pick.node);
    else if (_event.button == 2) {
      let posNewBlock: ƒ.Vector3 = ƒ.Vector3.SUM(pick.node.mtxWorld.translation, pick.normal);
      addBlock(posNewBlock);
    }
  }

  export function pickByRadius(_event: PointerEvent): void {
    console.log("pickByRay");
    let ray: ƒ.Ray = viewport.getRayFromClient(new ƒ.Vector2(_event.clientX, _event.clientY));
    let shortest: number;
    let found: Block = null;
    let compare: number = Math.pow(0.7, 2);

    for (let block of blocks.getChildren()) {
      if (compare < ray.getDistance(block.mtxWorld.translation).magnitudeSquared)
        continue;
      let distance: number = ƒ.Vector3.DIFFERENCE(block.mtxWorld.translation, ray.origin).magnitudeSquared;
      if (shortest == undefined || distance < shortest) {
        shortest = distance;
        found = block;
      }
    }
    hitBlock(found);
  }

  export function pickByGrid(_event: PointerEvent): void {
    console.log("pickByGrid");
    let ray: ƒ.Ray = viewport.getRayFromClient(new ƒ.Vector2(_event.clientX, _event.clientY));
    let posCheck: ƒ.Vector3 = ray.origin.clone;
    let vctStep: ƒ.Vector3 = ray.direction.clone;

    // find largest component value
    let largest: number = vctStep.get().reduce((_p, _c) => Math.max(_p, Math.abs(_c)));
    // normalize to 1 in that direction
    vctStep.scale(1 / largest);

    for (let i: number = 0; i < 100; i++) {
      posCheck.add(vctStep);
      let posGrid: ƒ.Vector3 = posCheck.map(_value => Math.round(_value));
      console.log(posGrid.toString(), posCheck.toString());
      try {
        let block = grid3D[posGrid.y][posGrid.z][posGrid.x];
        // let block = gridAssoc[posGrid.toString()];
        if (block) {
          hitBlock(block);
          return;
        }
      } catch (_e) { }
    }
  }

  function hitBlock(_block: Block) {
    if (!_block)
      return;

    console.log(_block.name);
    _block.getParent().removeChild(_block);
    viewport.draw();
  }
  function addBlock(_pos: ƒ.Vector3) {
    if (gridAssoc[_pos.toString()]) // already a block there...
      return;

    createBlock(_pos, "white");
    viewport.draw();
  }
}

