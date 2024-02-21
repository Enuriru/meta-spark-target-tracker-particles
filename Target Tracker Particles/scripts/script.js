/*----------------------------------------------------------------------------------------

	© Denis Rossiev
	http://instagram.com/enuriru/
  https://awesome-ar.com
	
----------------------------------------------------------------------------------------*/

const S = require('Scene');
const R = require('Reactive');
const M = require('Materials');
const P = require('Patches');


;(async function () {  // Enables async/await in JS [part 1]

  const [align, emitter_container, emitter_controller, emitter, particle_material] = await Promise.all([
    S.root.findFirst('align'),
    S.root.findFirst('emitter_container'),
    S.root.findFirst('emitter_controller'),
    S.root.findFirst('emitter'),
    M.findFirst('particle_material')
  ])

    let q = align.worldTransform.rotation.invert()
    emitter_container.transform.rotation = q

    let p = emitter_controller.worldTransform.position.sub( align.worldTransform.position ).rotate(q)
    emitter_container.worldTransform.position = R.point(p.x, p.y, p.z)

    let v = align.worldTransform.position
    v = R.point(v.x, v.y, v.z)

    particle_material.setParameter('targetPos',  v )
    particle_material.setParameter('targetRot', R.pack4(q.x, q.y, q.z, q.w))

})(); 
