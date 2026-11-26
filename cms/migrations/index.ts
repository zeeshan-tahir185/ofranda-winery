import * as migration_20261124_130959_initial from "./20261124_130959_initial";
import * as migration_20261126_021411_biodynamic from "./20261126_021411_biodynamic";

export const migrations = [
  {
    up: migration_20261124_130959_initial.up,
    down: migration_20261124_130959_initial.down,
    name: "20261124_130959_initial",
  },
  {
    up: migration_20261126_021411_biodynamic.up,
    down: migration_20261126_021411_biodynamic.down,
    name: "20261126_021411_biodynamic",
  },
];
