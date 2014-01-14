///<reference path="../../_definitions.ts"/>

/**
 * @module away.partition
 */
module away.partition
{
	/**
	 * @class away.partition.LightProbeNode
	 */
	export class LightProbeNode extends EntityNode
	{
		private _light:away.lights.LightProbe;

		constructor(light:away.lights.LightProbe)
		{
			super(light);
			this._light = light;
		}

		public get light():away.lights.LightProbe
		{
			return this._light;
		}

		//@override
		public acceptTraverser(traverser:away.traverse.PartitionTraverser)
		{
			if (traverser.enterNode(this)) {
				super.acceptTraverser(traverser);
				traverser.applyLightProbe(this._light);
			}
		}
	}
}